package tz.go.psssf.risk.compliance.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.compliance.dto.ComplianceStatusDTO;
import tz.go.psssf.risk.compliance.entity.ComplianceStatus;
import tz.go.psssf.risk.compliance.mapper.ComplianceStatusMapper;
import tz.go.psssf.risk.compliance.pojo.ComplianceStatusPojo;
import tz.go.psssf.risk.compliance.repository.ComplianceStatusRepository;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ComplianceStatusService {

    @Inject
    Logger log;

    @Inject
    ComplianceStatusRepository repository;

    @Inject
    ComplianceStatusMapper mapper;

    /**
     * Get all ComplianceStatus entries.
     */
    public ResponseWrapper<List<ComplianceStatusPojo>> findAll() {
        try {
            List<ComplianceStatus> statuses = repository.listAll();
            List<ComplianceStatusPojo> pojos = statuses.stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error fetching compliance statuses", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    /**
     * Find ComplianceStatus by ID.
     */
    public ResponseWrapper<ComplianceStatusPojo> findById(String id) {
        try {
            ComplianceStatus entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error finding compliance status by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    /**
     * Create new ComplianceStatus.
     */
    @Transactional
    public ResponseWrapper<ComplianceStatusPojo> create(@Valid ComplianceStatusDTO dto) {
        try {
            ComplianceStatus entity = mapper.toEntity(dto);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error creating compliance status", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    /**
     * Update ComplianceStatus.
     */
    @Transactional
    public ResponseWrapper<ComplianceStatusPojo> update(String id, @Valid ComplianceStatusDTO dto) {
        try {
            ComplianceStatus entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            mapper.updateEntityFromDTO(dto, entity);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error updating compliance status", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    /**
     * Delete ComplianceStatus.
     */
    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            ComplianceStatus entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            repository.delete(entity);
            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error deleting compliance status", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
