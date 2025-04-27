package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskActionPlanMonitoringDTO;
import tz.go.psssf.risk.entity.RiskActionPlanMonitoring;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskActionPlanMonitoringMapper;
import tz.go.psssf.risk.pojo.RiskActionPlanMonitoringPojo;
import tz.go.psssf.risk.repository.RiskActionPlanMonitoringRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskActionPlanMonitoringService {

    @Inject
    Logger log;

    @Inject
    RiskActionPlanMonitoringRepository riskActionPlanMonitoringRepository;

    @Inject
    RiskActionPlanMonitoringMapper riskActionPlanMonitoringMapper;

    public ResponseWrapper<RiskActionPlanMonitoringPojo> findById(String id) {
        try {
            RiskActionPlanMonitoring riskActionPlanMonitoring = riskActionPlanMonitoringRepository.findById(id);
            if (riskActionPlanMonitoring != null) {
                RiskActionPlanMonitoringPojo pojo = riskActionPlanMonitoringMapper.toPojo(riskActionPlanMonitoring);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskActionPlanMonitoring by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskActionPlanMonitoringPojo> create(@Valid RiskActionPlanMonitoringDTO riskActionPlanMonitoringDTO) {
        try {
            RiskActionPlanMonitoring entity = riskActionPlanMonitoringMapper.toEntity(riskActionPlanMonitoringDTO);
            riskActionPlanMonitoringRepository.persist(entity);
            RiskActionPlanMonitoringPojo resultPojo = riskActionPlanMonitoringMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskActionPlanMonitoring", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskActionPlanMonitoringPojo> update(String id, @Valid RiskActionPlanMonitoringDTO riskActionPlanMonitoringDTO) {
        try {
            RiskActionPlanMonitoring entity = riskActionPlanMonitoringRepository.findById(id);
            if (entity != null) {
                riskActionPlanMonitoringMapper.updateEntityFromDTO(riskActionPlanMonitoringDTO, entity);
                RiskActionPlanMonitoringPojo resultPojo = riskActionPlanMonitoringMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskActionPlanMonitoring", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskActionPlanMonitoring entity = riskActionPlanMonitoringRepository.findById(id);
            if (entity != null) {
                riskActionPlanMonitoringRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskActionPlanMonitoring", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskActionPlanMonitoringPojo>> listAll() {
        try {
            List<RiskActionPlanMonitoring> entities = riskActionPlanMonitoringRepository.listAll();
            List<RiskActionPlanMonitoringPojo> pojos = entities.stream()
                    .map(riskActionPlanMonitoringMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskActionPlanMonitorings", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
