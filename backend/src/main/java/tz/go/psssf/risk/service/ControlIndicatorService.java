package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.ControlIndicatorDTO;
import tz.go.psssf.risk.entity.ControlIndicator;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.ControlIndicatorMapper;
import tz.go.psssf.risk.pojo.ControlIndicatorPojo;
import tz.go.psssf.risk.repository.ControlIndicatorRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class ControlIndicatorService {

    @Inject
    Logger log;

    @Inject
    ControlIndicatorRepository controlIndicatorRepository;

    @Inject
    ControlIndicatorMapper controlIndicatorMapper;

    public ResponseWrapper<ControlIndicatorPojo> findById(String id) {
        try {
            ControlIndicator controlIndicator = controlIndicatorRepository.findById(id);
            if (controlIndicator != null) {
                ControlIndicatorPojo pojo = controlIndicatorMapper.toPojo(controlIndicator);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding ControlIndicator by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ControlIndicatorPojo> create(@Valid ControlIndicatorDTO controlIndicatorDTO) {
        try {
            ControlIndicator entity = controlIndicatorMapper.toEntity(controlIndicatorDTO);
            controlIndicatorRepository.persist(entity);
            ControlIndicatorPojo resultPojo = controlIndicatorMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating ControlIndicator", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ControlIndicatorPojo> update(String id, @Valid ControlIndicatorDTO controlIndicatorDTO) {
        try {
            ControlIndicator entity = controlIndicatorRepository.findById(id);
            if (entity != null) {
                controlIndicatorMapper.updateEntityFromDTO(controlIndicatorDTO, entity);
                ControlIndicatorPojo resultPojo = controlIndicatorMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating ControlIndicator", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            ControlIndicator entity = controlIndicatorRepository.findById(id);
            if (entity != null) {
                controlIndicatorRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting ControlIndicator", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<ControlIndicatorPojo>> listAll() {
        try {
            List<ControlIndicator> entities = controlIndicatorRepository.listAll();
            List<ControlIndicatorPojo> pojos = entities.stream()
                    .map(controlIndicatorMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all ControlIndicators", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
