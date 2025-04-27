package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.ComparisonOperatorDTO;
import tz.go.psssf.risk.entity.ComparisonOperator;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.ComparisonOperatorMapper;
import tz.go.psssf.risk.pojo.ComparisonOperatorPojo;
import tz.go.psssf.risk.repository.ComparisonOperatorRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class ComparisonOperatorService {

    @Inject
    Logger log;

    @Inject
    ComparisonOperatorRepository comparisonOperatorRepository;

    @Inject
    ComparisonOperatorMapper comparisonOperatorMapper;

    public ResponseWrapper<ComparisonOperatorPojo> findById(String id) {
        try {
            ComparisonOperator comparisonOperator = comparisonOperatorRepository.findById(id);
            if (comparisonOperator != null) {
                ComparisonOperatorPojo pojo = comparisonOperatorMapper.toPojo(comparisonOperator);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding ComparisonOperator by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ComparisonOperatorPojo> create(@Valid ComparisonOperatorDTO comparisonOperatorDTO) {
        try {
            ComparisonOperator entity = comparisonOperatorMapper.toEntity(comparisonOperatorDTO);
            comparisonOperatorRepository.persist(entity);
            ComparisonOperatorPojo resultPojo = comparisonOperatorMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating ComparisonOperator", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ComparisonOperatorPojo> update(String id, @Valid ComparisonOperatorDTO comparisonOperatorDTO) {
        try {
            ComparisonOperator entity = comparisonOperatorRepository.findById(id);
            if (entity != null) {
                comparisonOperatorMapper.updateEntityFromDTO(comparisonOperatorDTO, entity);
                ComparisonOperatorPojo resultPojo = comparisonOperatorMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating ComparisonOperator", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            ComparisonOperator entity = comparisonOperatorRepository.findById(id);
            if (entity != null) {
                comparisonOperatorRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting ComparisonOperator", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<ComparisonOperatorPojo>> listAll() {
        try {
            List<ComparisonOperator> entities = comparisonOperatorRepository.listAll();
            List<ComparisonOperatorPojo> pojos = entities.stream()
                    .map(comparisonOperatorMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all ComparisonOperators", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
