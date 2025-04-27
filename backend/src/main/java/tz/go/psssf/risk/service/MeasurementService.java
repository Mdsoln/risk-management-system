package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.MeasurementDTO;
import tz.go.psssf.risk.entity.Measurement;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.MeasurementMapper;
import tz.go.psssf.risk.pojo.MeasurementPojo;
import tz.go.psssf.risk.repository.MeasurementRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class MeasurementService {

    @Inject
    Logger log;

    @Inject
    MeasurementRepository measurementRepository;

    @Inject
    MeasurementMapper measurementMapper;

    public ResponseWrapper<MeasurementPojo> findById(String id) {
        try {
            Measurement measurement = measurementRepository.findById(id);
            if (measurement != null) {
                MeasurementPojo pojo = measurementMapper.toPojo(measurement);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding Measurement by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<MeasurementPojo> create(@Valid MeasurementDTO measurementDTO) {
        try {
            Measurement entity = measurementMapper.toEntity(measurementDTO);
            measurementRepository.persist(entity);
            MeasurementPojo resultPojo = measurementMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating Measurement", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<MeasurementPojo> update(String id, @Valid MeasurementDTO measurementDTO) {
        try {
            Measurement entity = measurementRepository.findById(id);
            if (entity != null) {
                measurementMapper.updateEntityFromDTO(measurementDTO, entity);
                MeasurementPojo resultPojo = measurementMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating Measurement", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            Measurement entity = measurementRepository.findById(id);
            if (entity != null) {
                measurementRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting Measurement", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<MeasurementPojo>> listAll() {
        try {
            List<Measurement> entities = measurementRepository.listAll();
            List<MeasurementPojo> pojos = entities.stream()
                    .map(measurementMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all Measurements", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
