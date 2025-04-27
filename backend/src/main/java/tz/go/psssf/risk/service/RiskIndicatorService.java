package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskIndicatorDTO;
import tz.go.psssf.risk.entity.RiskIndicator;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskIndicatorMapper;
import tz.go.psssf.risk.pojo.RiskIndicatorPojo;
import tz.go.psssf.risk.repository.RiskIndicatorRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskIndicatorService {

    @Inject
    Logger log;

    @Inject
    RiskIndicatorRepository riskIndicatorRepository;

    @Inject
    RiskIndicatorMapper riskIndicatorMapper;

    public ResponseWrapper<RiskIndicatorPojo> findById(String id) {
        try {
            RiskIndicator riskIndicator = riskIndicatorRepository.findById(id);
            if (riskIndicator != null) {
                RiskIndicatorPojo pojo = riskIndicatorMapper.toPojo(riskIndicator);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskIndicator by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskIndicatorPojo> create(@Valid RiskIndicatorDTO riskIndicatorDTO) {
        try {
            RiskIndicator entity = riskIndicatorMapper.toEntity(riskIndicatorDTO);
            riskIndicatorRepository.persist(entity);
            RiskIndicatorPojo resultPojo = riskIndicatorMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskIndicator", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskIndicatorPojo> update(String id, @Valid RiskIndicatorDTO riskIndicatorDTO) {
        try {
            RiskIndicator entity = riskIndicatorRepository.findById(id);
            if (entity != null) {
                riskIndicatorMapper.updateEntityFromDTO(riskIndicatorDTO, entity);
                RiskIndicatorPojo resultPojo = riskIndicatorMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskIndicator", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskIndicator entity = riskIndicatorRepository.findById(id);
            if (entity != null) {
                riskIndicatorRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskIndicator", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskIndicatorPojo>> listAll() {
        try {
            List<RiskIndicator> entities = riskIndicatorRepository.listAll();
            List<RiskIndicatorPojo> pojos = entities.stream()
                    .map(riskIndicatorMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskIndicators", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
