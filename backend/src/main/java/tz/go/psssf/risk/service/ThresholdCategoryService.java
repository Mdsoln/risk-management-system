package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.ThresholdCategoryDTO;
import tz.go.psssf.risk.entity.ThresholdCategory;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.ThresholdCategoryMapper;
import tz.go.psssf.risk.pojo.ThresholdCategoryPojo;
import tz.go.psssf.risk.repository.ThresholdCategoryRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class ThresholdCategoryService {

    @Inject
    Logger log;

    @Inject
    ThresholdCategoryRepository thresholdCategoryRepository;

    @Inject
    ThresholdCategoryMapper thresholdCategoryMapper;

    public ResponseWrapper<ThresholdCategoryPojo> findById(String id) {
        try {
            ThresholdCategory thresholdCategory = thresholdCategoryRepository.findById(id);
            if (thresholdCategory != null) {
                ThresholdCategoryPojo pojo = thresholdCategoryMapper.toPojo(thresholdCategory);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding ThresholdCategory by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ThresholdCategoryPojo> create(@Valid ThresholdCategoryDTO thresholdCategoryDTO) {
        try {
            ThresholdCategory entity = thresholdCategoryMapper.toEntity(thresholdCategoryDTO);
            thresholdCategoryRepository.persist(entity);
            ThresholdCategoryPojo resultPojo = thresholdCategoryMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating ThresholdCategory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ThresholdCategoryPojo> update(String id, @Valid ThresholdCategoryDTO thresholdCategoryDTO) {
        try {
            ThresholdCategory entity = thresholdCategoryRepository.findById(id);
            if (entity != null) {
                thresholdCategoryMapper.updateEntityFromDTO(thresholdCategoryDTO, entity);
                ThresholdCategoryPojo resultPojo = thresholdCategoryMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating ThresholdCategory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            ThresholdCategory entity = thresholdCategoryRepository.findById(id);
            if (entity != null) {
                thresholdCategoryRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting ThresholdCategory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<ThresholdCategoryPojo>> listAll() {
        try {
            List<ThresholdCategory> entities = thresholdCategoryRepository.listAll();
            List<ThresholdCategoryPojo> pojos = entities.stream()
                    .map(thresholdCategoryMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all ThresholdCategories", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    public ResponseWrapper<List<ThresholdCategoryPojo>> listAllHighandLow() {
        try {
            List<ThresholdCategory> entities = thresholdCategoryRepository.listAll();
            List<ThresholdCategoryPojo> pojos = entities.stream()
                    .filter(tc -> "H".equals(tc.getCode()) || "L".equals(tc.getCode()))
                    .map(thresholdCategoryMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all High and Low ThresholdCategories", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
