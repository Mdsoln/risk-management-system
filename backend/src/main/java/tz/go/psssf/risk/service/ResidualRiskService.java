package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.ResidualRiskDTO;
import tz.go.psssf.risk.entity.ResidualRisk;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.ResidualRiskMapper;
import tz.go.psssf.risk.pojo.ResidualRiskPojo;
import tz.go.psssf.risk.repository.ResidualRiskRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class ResidualRiskService {

    @Inject
    Logger log;

    @Inject
    ResidualRiskRepository residualRiskRepository;

    @Inject
    ResidualRiskMapper residualRiskMapper;

    public ResponseWrapper<ResidualRiskPojo> findById(String id) {
        try {
            ResidualRisk residualRisk = residualRiskRepository.findById(id);
            if (residualRisk != null) {
                ResidualRiskPojo pojo = residualRiskMapper.toPojo(residualRisk);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding ResidualRisk by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ResidualRiskPojo> create(@Valid ResidualRiskDTO residualRiskDTO) {
        try {
            ResidualRisk entity = residualRiskMapper.toEntity(residualRiskDTO);
            residualRiskRepository.persist(entity);
            ResidualRiskPojo resultPojo = residualRiskMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating ResidualRisk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ResidualRiskPojo> update(String id, @Valid ResidualRiskDTO residualRiskDTO) {
        try {
            ResidualRisk entity = residualRiskRepository.findById(id);
            if (entity != null) {
                residualRiskMapper.updateEntityFromDTO(residualRiskDTO, entity);
                ResidualRiskPojo resultPojo = residualRiskMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating ResidualRisk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            ResidualRisk entity = residualRiskRepository.findById(id);
            if (entity != null) {
                residualRiskRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting ResidualRisk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<ResidualRiskPojo>> listAll() {
        try {
            List<ResidualRisk> entities = residualRiskRepository.listAll();
            List<ResidualRiskPojo> pojos = entities.stream()
                    .map(residualRiskMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all ResidualRisks", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
