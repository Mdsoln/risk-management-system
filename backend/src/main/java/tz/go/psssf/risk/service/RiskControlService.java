package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskControlDTO;
import tz.go.psssf.risk.entity.RiskControl;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskControlMapper;
import tz.go.psssf.risk.pojo.RiskControlPojo;
import tz.go.psssf.risk.repository.RiskControlRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskControlService {

    @Inject
    Logger log;

    @Inject
    RiskControlRepository riskControlRepository;

    @Inject
    RiskControlMapper riskControlMapper;

    public ResponseWrapper<RiskControlPojo> findById(String id) {
        try {
            RiskControl riskControl = riskControlRepository.findById(id);
            if (riskControl != null) {
                RiskControlPojo pojo = riskControlMapper.toPojo(riskControl);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskControl by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskControlPojo> create(@Valid RiskControlDTO riskControlDTO) {
        try {
            RiskControl entity = riskControlMapper.toEntity(riskControlDTO);
            riskControlRepository.persist(entity);
            RiskControlPojo resultPojo = riskControlMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskControl", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskControlPojo> update(String id, @Valid RiskControlDTO riskControlDTO) {
        try {
            RiskControl entity = riskControlRepository.findById(id);
            if (entity != null) {
                riskControlMapper.updateEntityFromDTO(riskControlDTO, entity);
                RiskControlPojo resultPojo = riskControlMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskControl", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskControl entity = riskControlRepository.findById(id);
            if (entity != null) {
                riskControlRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskControl", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskControlPojo>> listAll() {
        try {
            List<RiskControl> entities = riskControlRepository.listAll();
            List<RiskControlPojo> pojos = entities.stream()
                    .map(riskControlMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskControls", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
