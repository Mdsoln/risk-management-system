package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskIndicatorActionPlanDTO;
import tz.go.psssf.risk.entity.RiskIndicatorActionPlan;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskIndicatorActionPlanMapper;
import tz.go.psssf.risk.pojo.RiskIndicatorActionPlanPojo;
import tz.go.psssf.risk.repository.RiskIndicatorActionPlanRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskIndicatorActionPlanService {

    @Inject
    Logger log;

    @Inject
    RiskIndicatorActionPlanRepository riskIndicatorActionPlanRepository;

    @Inject
    RiskIndicatorActionPlanMapper riskIndicatorActionPlanMapper;

    public ResponseWrapper<RiskIndicatorActionPlanPojo> findById(String id) {
        try {
            RiskIndicatorActionPlan riskIndicatorActionPlan = riskIndicatorActionPlanRepository.findById(id);
            if (riskIndicatorActionPlan != null) {
                RiskIndicatorActionPlanPojo pojo = riskIndicatorActionPlanMapper.toPojo(riskIndicatorActionPlan);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskIndicatorActionPlan by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskIndicatorActionPlanPojo> create(@Valid RiskIndicatorActionPlanDTO riskIndicatorActionPlanDTO) {
        try {
            RiskIndicatorActionPlan entity = riskIndicatorActionPlanMapper.toEntity(riskIndicatorActionPlanDTO);
            riskIndicatorActionPlanRepository.persist(entity);
            RiskIndicatorActionPlanPojo resultPojo = riskIndicatorActionPlanMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskIndicatorActionPlan", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskIndicatorActionPlanPojo> update(String id, @Valid RiskIndicatorActionPlanDTO riskIndicatorActionPlanDTO) {
        try {
            RiskIndicatorActionPlan entity = riskIndicatorActionPlanRepository.findById(id);
            if (entity != null) {
                riskIndicatorActionPlanMapper.updateEntityFromDTO(riskIndicatorActionPlanDTO, entity);
                RiskIndicatorActionPlanPojo resultPojo = riskIndicatorActionPlanMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskIndicatorActionPlan", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskIndicatorActionPlan entity = riskIndicatorActionPlanRepository.findById(id);
            if (entity != null) {
                riskIndicatorActionPlanRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskIndicatorActionPlan", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskIndicatorActionPlanPojo>> listAll() {
        try {
            List<RiskIndicatorActionPlan> entities = riskIndicatorActionPlanRepository.listAll();
            List<RiskIndicatorActionPlanPojo> pojos = entities.stream()
                    .map(riskIndicatorActionPlanMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskIndicatorActionPlans", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
