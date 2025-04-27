package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskAreaCategoryDTO;
import tz.go.psssf.risk.entity.RiskAreaCategory;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskAreaCategoryMapper;
import tz.go.psssf.risk.mapper.SimplifiedRiskAreaMapper;
import tz.go.psssf.risk.pojo.RiskAreaCategoryPojo;
import tz.go.psssf.risk.pojo.SimplifiedRiskAreaPojo;
import tz.go.psssf.risk.repository.RiskAreaCategoryRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskAreaCategoryService {

    @Inject
    Logger log;

    @Inject
    RiskAreaCategoryRepository riskAreaCategoryRepository;

    @Inject
    RiskAreaCategoryMapper riskAreaCategoryMapper;

    @Inject
    SimplifiedRiskAreaMapper simplifiedRiskAreaMapper;

    public ResponseWrapper<RiskAreaCategoryPojo> findById(String id) {
        try {
            RiskAreaCategory riskAreaCategory = riskAreaCategoryRepository.findById(id);
            if (riskAreaCategory != null) {
                RiskAreaCategoryPojo pojo = riskAreaCategoryMapper.toPojo(riskAreaCategory);
                List<SimplifiedRiskAreaPojo> riskAreas = riskAreaCategory.getRiskAreas().stream()
                        .map(simplifiedRiskAreaMapper::toPojo)
                        .collect(Collectors.toList());
                pojo.setRiskAreas(riskAreas);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskAreaCategory by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAreaCategoryPojo> create(@Valid RiskAreaCategoryDTO riskAreaCategoryDTO) {
        try {
            RiskAreaCategory entity = riskAreaCategoryMapper.toEntity(riskAreaCategoryDTO);
            riskAreaCategoryRepository.persist(entity);
            RiskAreaCategoryPojo resultPojo = riskAreaCategoryMapper.toPojo(entity);
            List<SimplifiedRiskAreaPojo> riskAreas = entity.getRiskAreas().stream()
                    .map(simplifiedRiskAreaMapper::toPojo)
                    .collect(Collectors.toList());
            resultPojo.setRiskAreas(riskAreas);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskAreaCategory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAreaCategoryPojo> update(String id, @Valid RiskAreaCategoryDTO riskAreaCategoryDTO) {
        try {
            RiskAreaCategory entity = riskAreaCategoryRepository.findById(id);
            if (entity != null) {
                riskAreaCategoryMapper.updateEntityFromDTO(riskAreaCategoryDTO, entity);
                RiskAreaCategoryPojo resultPojo = riskAreaCategoryMapper.toPojo(entity);
                List<SimplifiedRiskAreaPojo> riskAreas = entity.getRiskAreas().stream()
                        .map(simplifiedRiskAreaMapper::toPojo)
                        .collect(Collectors.toList());
                resultPojo.setRiskAreas(riskAreas);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskAreaCategory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskAreaCategory entity = riskAreaCategoryRepository.findById(id);
            if (entity != null) {
                riskAreaCategoryRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskAreaCategory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskAreaCategoryPojo>> listAll() {
        try {
            List<RiskAreaCategory> entities = riskAreaCategoryRepository.listAllWithRiskAreasOrdered();
            List<RiskAreaCategoryPojo> pojos = entities.stream()
                    .map(riskAreaCategory -> {
                        RiskAreaCategoryPojo pojo = riskAreaCategoryMapper.toPojo(riskAreaCategory);
                        List<SimplifiedRiskAreaPojo> riskAreas = riskAreaCategory.getRiskAreas().stream()
                                .map(simplifiedRiskAreaMapper::toPojo)
                                .collect(Collectors.toList());
                        pojo.setRiskAreas(riskAreas);
                        return pojo;
                    })
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskCategories", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
