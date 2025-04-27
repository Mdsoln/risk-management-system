package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskChampionDTO;
import tz.go.psssf.risk.entity.RiskChampion;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskChampionMapper;
import tz.go.psssf.risk.pojo.RiskChampionPojo;
import tz.go.psssf.risk.repository.RiskChampionRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskChampionService {

    @Inject
    Logger log;

    @Inject
    RiskChampionRepository riskChampionRepository;

    @Inject
    RiskChampionMapper riskChampionMapper;

    public ResponseWrapper<RiskChampionPojo> findById(String id) {
        try {
            RiskChampion champion = riskChampionRepository.findById(id);
            if (champion != null) {
                RiskChampionPojo pojo = riskChampionMapper.toPojo(champion);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskChampion by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskChampionPojo> create(@Valid RiskChampionDTO championDTO) {
        try {
            RiskChampion entity = riskChampionMapper.toEntity(championDTO);
            riskChampionRepository.persist(entity);
            RiskChampionPojo resultPojo = riskChampionMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskChampion", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskChampionPojo> update(String id, @Valid RiskChampionDTO championDTO) {
        try {
            RiskChampion entity = riskChampionRepository.findById(id);
            if (entity != null) {
                riskChampionMapper.updateEntityFromDTO(championDTO, entity);
                RiskChampionPojo resultPojo = riskChampionMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskChampion", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskChampion entity = riskChampionRepository.findById(id);
            if (entity != null) {
                riskChampionRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskChampion", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskChampionPojo>> listAll() {
        try {
            List<RiskChampion> entities = riskChampionRepository.listAll();
            List<RiskChampionPojo> pojos = entities.stream()
                    .map(riskChampionMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskChampions", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
