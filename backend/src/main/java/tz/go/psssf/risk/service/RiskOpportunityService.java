package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskOpportunityDTO;
import tz.go.psssf.risk.entity.RiskOpportunity;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskOpportunityMapper;
import tz.go.psssf.risk.pojo.RiskOpportunityPojo;
import tz.go.psssf.risk.repository.RiskOpportunityRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskOpportunityService {

    @Inject
    Logger log;

    @Inject
    RiskOpportunityRepository riskOpportunityRepository;

    @Inject
    RiskOpportunityMapper riskOpportunityMapper;

    public ResponseWrapper<RiskOpportunityPojo> findById(String id) {
        try {
            RiskOpportunity riskOpportunity = riskOpportunityRepository.findById(id);
            if (riskOpportunity != null) {
                RiskOpportunityPojo pojo = riskOpportunityMapper.toPojo(riskOpportunity);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskOpportunity by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskOpportunityPojo> create(@Valid RiskOpportunityDTO riskOpportunityDTO) {
        try {
            RiskOpportunity entity = riskOpportunityMapper.toEntity(riskOpportunityDTO);
            riskOpportunityRepository.persist(entity);
            RiskOpportunityPojo resultPojo = riskOpportunityMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskOpportunity", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskOpportunityPojo> update(String id, @Valid RiskOpportunityDTO riskOpportunityDTO) {
        try {
            RiskOpportunity entity = riskOpportunityRepository.findById(id);
            if (entity != null) {
                riskOpportunityMapper.updateEntityFromDTO(riskOpportunityDTO, entity);
                RiskOpportunityPojo resultPojo = riskOpportunityMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskOpportunity", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskOpportunity entity = riskOpportunityRepository.findById(id);
            if (entity != null) {
                riskOpportunityRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskOpportunity", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskOpportunityPojo>> listAll() {
        try {
            List<RiskOpportunity> entities = riskOpportunityRepository.listAll();
            List<RiskOpportunityPojo> pojos = entities.stream()
                    .map(riskOpportunityMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskOpportunities", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
