package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.MonitoringFrequencyDTO;
import tz.go.psssf.risk.entity.MonitoringFrequency;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.MonitoringFrequencyMapper;
import tz.go.psssf.risk.pojo.MonitoringFrequencyPojo;
import tz.go.psssf.risk.repository.MonitoringFrequencyRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class MonitoringFrequencyService {

    @Inject
    Logger log;

    @Inject
    MonitoringFrequencyRepository monitoringFrequencyRepository;

    @Inject
    MonitoringFrequencyMapper monitoringFrequencyMapper;

    public ResponseWrapper<MonitoringFrequencyPojo> findById(String id) {
        try {
            MonitoringFrequency monitoringFrequency = monitoringFrequencyRepository.findById(id);
            if (monitoringFrequency != null) {
                MonitoringFrequencyPojo pojo = monitoringFrequencyMapper.toPojo(monitoringFrequency);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding MonitoringFrequency by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<MonitoringFrequencyPojo> create(@Valid MonitoringFrequencyDTO monitoringFrequencyDTO) {
        try {
            MonitoringFrequency entity = monitoringFrequencyMapper.toEntity(monitoringFrequencyDTO);
            monitoringFrequencyRepository.persist(entity);
            MonitoringFrequencyPojo resultPojo = monitoringFrequencyMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating MonitoringFrequency", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<MonitoringFrequencyPojo> update(String id, @Valid MonitoringFrequencyDTO monitoringFrequencyDTO) {
        try {
            MonitoringFrequency entity = monitoringFrequencyRepository.findById(id);
            if (entity != null) {
                monitoringFrequencyMapper.updateEntityFromDTO(monitoringFrequencyDTO, entity);
                MonitoringFrequencyPojo resultPojo = monitoringFrequencyMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating MonitoringFrequency", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            MonitoringFrequency entity = monitoringFrequencyRepository.findById(id);
            if (entity != null) {
                monitoringFrequencyRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting MonitoringFrequency", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<MonitoringFrequencyPojo>> listAll() {
        try {
            List<MonitoringFrequency> entities = monitoringFrequencyRepository.listAll();
            List<MonitoringFrequencyPojo> pojos = entities.stream()
                    .map(monitoringFrequencyMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all MonitoringFrequencies", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
