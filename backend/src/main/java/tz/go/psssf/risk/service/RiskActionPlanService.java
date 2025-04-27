package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskActionPlanDTO;
import tz.go.psssf.risk.entity.RiskActionPlan;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskActionPlanMapper;
import tz.go.psssf.risk.pojo.RiskActionPlanPojo;
import tz.go.psssf.risk.repository.RiskActionPlanRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskActionPlanService {

    @Inject
    Logger log;

    @Inject
    RiskActionPlanRepository riskActionPlanRepository;

    @Inject
    RiskActionPlanMapper riskActionPlanMapper;

    public ResponseWrapper<RiskActionPlanPojo> findById(String id) {
        try {
            RiskActionPlan riskActionPlan = riskActionPlanRepository.findById(id);
            if (riskActionPlan != null) {
                RiskActionPlanPojo pojo = riskActionPlanMapper.toPojo(riskActionPlan);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskActionPlan by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskActionPlanPojo> create(@Valid RiskActionPlanDTO riskActionPlanDTO) {
        try {
            RiskActionPlan entity = riskActionPlanMapper.toEntity(riskActionPlanDTO);
            riskActionPlanRepository.persist(entity);
            RiskActionPlanPojo resultPojo = riskActionPlanMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskActionPlan", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskActionPlanPojo> update(String id, @Valid RiskActionPlanDTO riskActionPlanDTO) {
        try {
            RiskActionPlan entity = riskActionPlanRepository.findById(id);
            if (entity != null) {
                riskActionPlanMapper.updateEntityFromDTO(riskActionPlanDTO, entity);
                RiskActionPlanPojo resultPojo = riskActionPlanMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskActionPlan", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskActionPlan entity = riskActionPlanRepository.findById(id);
            if (entity != null) {
                riskActionPlanRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskActionPlan", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskActionPlanPojo>> listAll() {
        try {
            List<RiskActionPlan> entities = riskActionPlanRepository.listAll();
            List<RiskActionPlanPojo> pojos = entities.stream()
                    .map(riskActionPlanMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskActionPlans", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
