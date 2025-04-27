package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskIndicatorActionPlanMonitoringDTO;
import tz.go.psssf.risk.entity.RiskIndicatorActionPlanMonitoring;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskIndicatorActionPlanMonitoringMapper;
import tz.go.psssf.risk.pojo.RiskIndicatorActionPlanMonitoringPojo;
import tz.go.psssf.risk.repository.RiskIndicatorActionPlanMonitoringRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskIndicatorActionPlanMonitoringService {

    @Inject
    Logger log;

    @Inject
    RiskIndicatorActionPlanMonitoringRepository riskIndicatorActionPlanMonitoringRepository;

    @Inject
    RiskIndicatorActionPlanMonitoringMapper riskIndicatorActionPlanMonitoringMapper;

    public ResponseWrapper<RiskIndicatorActionPlanMonitoringPojo> findById(String id) {
        try {
            RiskIndicatorActionPlanMonitoring riskIndicatorActionPlanMonitoring = riskIndicatorActionPlanMonitoringRepository.findById(id);
            if (riskIndicatorActionPlanMonitoring != null) {
                RiskIndicatorActionPlanMonitoringPojo pojo = riskIndicatorActionPlanMonitoringMapper.toPojo(riskIndicatorActionPlanMonitoring);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskIndicatorActionPlanMonitoring by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskIndicatorActionPlanMonitoringPojo> create(@Valid RiskIndicatorActionPlanMonitoringDTO riskIndicatorActionPlanMonitoringDTO) {
        try {
            RiskIndicatorActionPlanMonitoring entity = riskIndicatorActionPlanMonitoringMapper.toEntity(riskIndicatorActionPlanMonitoringDTO);
            riskIndicatorActionPlanMonitoringRepository.persist(entity);
            RiskIndicatorActionPlanMonitoringPojo resultPojo = riskIndicatorActionPlanMonitoringMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskIndicatorActionPlanMonitoring", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskIndicatorActionPlanMonitoringPojo> update(String id, @Valid RiskIndicatorActionPlanMonitoringDTO riskIndicatorActionPlanMonitoringDTO) {
        try {
            RiskIndicatorActionPlanMonitoring entity = riskIndicatorActionPlanMonitoringRepository.findById(id);
            if (entity != null) {
                riskIndicatorActionPlanMonitoringMapper.updateEntityFromDTO(riskIndicatorActionPlanMonitoringDTO, entity);
                RiskIndicatorActionPlanMonitoringPojo resultPojo = riskIndicatorActionPlanMonitoringMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskIndicatorActionPlanMonitoring", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskIndicatorActionPlanMonitoring entity = riskIndicatorActionPlanMonitoringRepository.findById(id);
            if (entity != null) {
                riskIndicatorActionPlanMonitoringRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskIndicatorActionPlanMonitoring", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskIndicatorActionPlanMonitoringPojo>> listAll() {
        try {
            List<RiskIndicatorActionPlanMonitoring> entities = riskIndicatorActionPlanMonitoringRepository.listAll();
            List<RiskIndicatorActionPlanMonitoringPojo> pojos = entities.stream()
                    .map(riskIndicatorActionPlanMonitoringMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskIndicatorActionPlanMonitorings", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
