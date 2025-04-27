package tz.go.psssf.risk.service;

import org.jboss.logging.Logger;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;
import tz.go.psssf.risk.dto.RiskAssessmentLevelDTO;
import tz.go.psssf.risk.entity.RiskAssessmentLevel;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskAssessmentLevelMapper;
import tz.go.psssf.risk.pojo.RiskAssessmentLevelPojo;
import tz.go.psssf.risk.repository.RiskAssessmentLevelRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskAssessmentLevelService {

    @Inject
    Logger log;

    @Inject
    RiskAssessmentLevelRepository riskAssessmentLevelRepository;

    @Inject
    RiskAssessmentLevelMapper riskAssessmentLevelMapper;

    public ResponseWrapper<List<RiskAssessmentLevelPojo>> listAll() {
        try {
            List<RiskAssessmentLevel> entities = riskAssessmentLevelRepository.listAll();
            List<RiskAssessmentLevelPojo> pojos = entities.stream()
                    .map(riskAssessmentLevelMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskAssessmentLevels", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<RiskAssessmentLevelPojo> findById(String id) {
        try {
            RiskAssessmentLevel entity = riskAssessmentLevelRepository.findById(id);
            if (entity != null) {
                RiskAssessmentLevelPojo pojo = riskAssessmentLevelMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskAssessmentLevel by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAssessmentLevelPojo> create(@Valid RiskAssessmentLevelDTO dto) {
        try {
            RiskAssessmentLevel entity = riskAssessmentLevelMapper.toEntity(dto);
            riskAssessmentLevelRepository.persist(entity);
            RiskAssessmentLevelPojo pojo = riskAssessmentLevelMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(pojo);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during creating RiskAssessmentLevel", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAssessmentLevelPojo> update(String id, @Valid RiskAssessmentLevelDTO dto) {
        try {
            RiskAssessmentLevel entity = riskAssessmentLevelRepository.findById(id);
            if (entity != null) {
                riskAssessmentLevelMapper.updateEntityFromDTO(dto, entity);
                riskAssessmentLevelRepository.persist(entity);
                RiskAssessmentLevelPojo pojo = riskAssessmentLevelMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during updating RiskAssessmentLevel", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskAssessmentLevel entity = riskAssessmentLevelRepository.findById(id);
            if (entity != null) {
                riskAssessmentLevelRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskAssessmentLevel", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
