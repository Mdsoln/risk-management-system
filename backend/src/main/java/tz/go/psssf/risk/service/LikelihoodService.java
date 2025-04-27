package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.LikelihoodDTO;
import tz.go.psssf.risk.entity.Likelihood;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.LikelihoodMapper;
import tz.go.psssf.risk.pojo.LikelihoodPojo;
import tz.go.psssf.risk.repository.LikelihoodRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class LikelihoodService {

    @Inject
    Logger log;

    @Inject
    LikelihoodRepository likelihoodRepository;

    @Inject
    LikelihoodMapper likelihoodMapper;

    public ResponseWrapper<LikelihoodPojo> findById(String id) {
        try {
            Likelihood likelihood = likelihoodRepository.findById(id);
            if (likelihood != null) {
                LikelihoodPojo pojo = likelihoodMapper.toPojo(likelihood);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding Likelihood by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<LikelihoodPojo> create(@Valid LikelihoodDTO likelihoodDTO) {
        try {
            Likelihood entity = likelihoodMapper.toEntity(likelihoodDTO);
            likelihoodRepository.persist(entity);
            LikelihoodPojo resultPojo = likelihoodMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating Likelihood", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<LikelihoodPojo> update(String id, @Valid LikelihoodDTO likelihoodDTO) {
        try {
            Likelihood entity = likelihoodRepository.findById(id);
            if (entity != null) {
                likelihoodMapper.updateEntityFromDTO(likelihoodDTO, entity);
                LikelihoodPojo resultPojo = likelihoodMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating Likelihood", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            Likelihood entity = likelihoodRepository.findById(id);
            if (entity != null) {
                likelihoodRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting Likelihood", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<LikelihoodPojo>> listAll() {
        try {
            List<Likelihood> entities = likelihoodRepository.listAll();
            List<LikelihoodPojo> pojos = entities.stream()
                    .map(likelihoodMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all Likelihoods", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
