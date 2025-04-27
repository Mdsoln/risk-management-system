package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.ImpactDTO;
import tz.go.psssf.risk.entity.Impact;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.ImpactMapper;
import tz.go.psssf.risk.pojo.ImpactPojo;
import tz.go.psssf.risk.repository.ImpactRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class ImpactService {

    @Inject
    Logger log;

    @Inject
    ImpactRepository impactRepository;

    @Inject
    ImpactMapper impactMapper;

    public ResponseWrapper<ImpactPojo> findById(String id) {
        try {
            Impact impact = impactRepository.findById(id);
            if (impact != null) {
                ImpactPojo pojo = impactMapper.toPojo(impact);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding Impact by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ImpactPojo> create(@Valid ImpactDTO impactDTO) {
        try {
            Impact entity = impactMapper.toEntity(impactDTO);
            impactRepository.persist(entity);
            ImpactPojo resultPojo = impactMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating Impact", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ImpactPojo> update(String id, @Valid ImpactDTO impactDTO) {
        try {
            Impact entity = impactRepository.findById(id);
            if (entity != null) {
                impactMapper.updateEntityFromDTO(impactDTO, entity);
                ImpactPojo resultPojo = impactMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating Impact", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            Impact entity = impactRepository.findById(id);
            if (entity != null) {
                impactRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting Impact", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<ImpactPojo>> listAll() {
        try {
            List<Impact> entities = impactRepository.listAll();
            List<ImpactPojo> pojos = entities.stream()
                    .map(impactMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all Impacts", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
