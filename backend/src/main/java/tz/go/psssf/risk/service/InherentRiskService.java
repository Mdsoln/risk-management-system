package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.InherentRiskDTO;
import tz.go.psssf.risk.entity.InherentRisk;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.InherentRiskMapper;
import tz.go.psssf.risk.pojo.InherentRiskPojo;
import tz.go.psssf.risk.repository.InherentRiskRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class InherentRiskService {

    @Inject
    Logger log;

    @Inject
    InherentRiskRepository inherentRiskRepository;

    @Inject
    InherentRiskMapper inherentRiskMapper;

    public ResponseWrapper<InherentRiskPojo> findById(String id) {
        try {
            InherentRisk inherentRisk = inherentRiskRepository.findById(id);
            if (inherentRisk != null) {
                InherentRiskPojo pojo = inherentRiskMapper.toPojo(inherentRisk);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding InherentRisk by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<InherentRiskPojo> create(@Valid InherentRiskDTO inherentRiskDTO) {
        try {
            InherentRisk entity = inherentRiskMapper.toEntity(inherentRiskDTO);
            inherentRiskRepository.persist(entity);
            InherentRiskPojo resultPojo = inherentRiskMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating InherentRisk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<InherentRiskPojo> update(String id, @Valid InherentRiskDTO inherentRiskDTO) {
        try {
            InherentRisk entity = inherentRiskRepository.findById(id);
            if (entity != null) {
                inherentRiskMapper.updateEntityFromDTO(inherentRiskDTO, entity);
                InherentRiskPojo resultPojo = inherentRiskMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating InherentRisk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            InherentRisk entity = inherentRiskRepository.findById(id);
            if (entity != null) {
                inherentRiskRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting InherentRisk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<InherentRiskPojo>> listAll() {
        try {
            List<InherentRisk> entities = inherentRiskRepository.listAll();
            List<InherentRiskPojo> pojos = entities.stream()
                    .map(inherentRiskMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all InherentRisks", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
