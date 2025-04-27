package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskCauseDTO;
import tz.go.psssf.risk.entity.RiskCause;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskCauseMapper;
import tz.go.psssf.risk.pojo.RiskCausePojo;
import tz.go.psssf.risk.repository.RiskCauseRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskCauseService {

    @Inject
    Logger log;

    @Inject
    RiskCauseRepository riskCauseRepository;

    @Inject
    RiskCauseMapper riskCauseMapper;

    public ResponseWrapper<RiskCausePojo> findById(String id) {
        try {
            RiskCause riskCause = riskCauseRepository.findById(id);
            if (riskCause != null) {
                RiskCausePojo pojo = riskCauseMapper.toPojo(riskCause);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskCause by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskCausePojo> create(@Valid RiskCauseDTO riskCauseDTO) {
        try {
            RiskCause entity = riskCauseMapper.toEntity(riskCauseDTO);
            riskCauseRepository.persist(entity);
            RiskCausePojo resultPojo = riskCauseMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskCause", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskCausePojo> update(String id, @Valid RiskCauseDTO riskCauseDTO) {
        try {
            RiskCause entity = riskCauseRepository.findById(id);
            if (entity != null) {
                riskCauseMapper.updateEntityFromDTO(riskCauseDTO, entity);
                RiskCausePojo resultPojo = riskCauseMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskCause", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskCause entity = riskCauseRepository.findById(id);
            if (entity != null) {
                riskCauseRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskCause", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskCausePojo>> listAll() {
        try {
            List<RiskCause> entities = riskCauseRepository.listAll();
            List<RiskCausePojo> pojos = entities.stream()
                    .map(riskCauseMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskCauses", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
