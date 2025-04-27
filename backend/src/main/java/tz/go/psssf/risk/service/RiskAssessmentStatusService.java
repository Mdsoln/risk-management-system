package tz.go.psssf.risk.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.jboss.logging.Logger;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import tz.go.psssf.risk.dto.RiskAssessmentStatusDTO;
import tz.go.psssf.risk.entity.RiskAssessmentStatus;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskAssessmentStatusMapper;
import tz.go.psssf.risk.repository.RiskAssessmentStatusRepository;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskAssessmentStatusService {

    @Inject
    Logger log;

    @Inject
    RiskAssessmentStatusRepository riskAssessmentStatusRepository;

    @Inject
    RiskAssessmentStatusMapper riskAssessmentStatusMapper;

    private static final List<String> SEARCHABLE_FIELDS = List.of("currentStatus");
    private static final Set<String> VALID_SORT_FIELDS = Set.of("currentStatus", "id", "createdAt");
    private static final Set<String> VALID_DATE_FIELDS = Set.of("createdAt", "updatedAt");

    private static final Map<String, String> SORT_FIELD_MAPPINGS = Map.of(
        "currentStatus", "currentStatus",
        "createdAt", "createdAt",
        "id", "id"
    );

    private void enableActiveFilter(Session session) {
        Filter filter = session.enableFilter("activeFilter");
        filter.setParameter("status", "ACTIVE");
    }

    public ResponseWrapper<PaginatedResponse<RiskAssessmentStatusDTO>> findWithPaginationSortingFiltering(int page, int size,
            List<String> sort, String sortDirection, String searchKeyword, LocalDateTime startDate,
            LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<RiskAssessmentStatus> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<RiskAssessmentStatus> query = customQueryHelper.findWithPaginationSortingFiltering(
                    riskAssessmentStatusRepository,
                    RiskAssessmentStatus.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<RiskAssessmentStatus> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<RiskAssessmentStatusDTO> dtos = paginatedResponse.getItems().stream()
                    .map(riskAssessmentStatusMapper::toDTO)
                    .collect(Collectors.toList());

            PaginatedResponse<RiskAssessmentStatusDTO> dtoPaginatedResponse = new PaginatedResponse<>(
                    paginatedResponse.getCurrentPage(),
                    paginatedResponse.getTotalPages(),
                    paginatedResponse.getTotalItems(),
                    paginatedResponse.getPageSize(),
                    paginatedResponse.isHasPrevious(),
                    paginatedResponse.isHasNext(),
                    dtos
            );

            return ResponseHelper.createPaginatedResponse(dtoPaginatedResponse.getItems(),
                    dtoPaginatedResponse.getCurrentPage(), dtoPaginatedResponse.getTotalItems(),
                    dtoPaginatedResponse.getPageSize());

        } catch (IllegalArgumentException e) {
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<RiskAssessmentStatusDTO> findById(String id) {
        try {
            RiskAssessmentStatus status = riskAssessmentStatusRepository.findById(id);
            if (status != null) {
                RiskAssessmentStatusDTO dto = riskAssessmentStatusMapper.toDTO(status);
                return ResponseHelper.createSuccessResponse(dto);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding Risk Assessment Status by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAssessmentStatusDTO> create(@Valid RiskAssessmentStatusDTO statusDTO) {
        try {
            RiskAssessmentStatus status = riskAssessmentStatusMapper.toEntity(statusDTO);
            riskAssessmentStatusRepository.persist(status);
            RiskAssessmentStatusDTO resultDTO = riskAssessmentStatusMapper.toDTO(status);
            return ResponseHelper.createSuccessResponse(resultDTO);
        } catch (Exception e) {
            log.error("Error during creating Risk Assessment Status", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAssessmentStatusDTO> update(String id, @Valid RiskAssessmentStatusDTO statusDTO) {
        try {
            RiskAssessmentStatus status = riskAssessmentStatusRepository.findById(id);
            if (status != null) {
                riskAssessmentStatusMapper.updateEntityFromDTO(statusDTO, status);
                riskAssessmentStatusRepository.getEntityManager().merge(status);
                RiskAssessmentStatusDTO resultDTO = riskAssessmentStatusMapper.toDTO(status);
                return ResponseHelper.createSuccessResponse(resultDTO);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating Risk Assessment Status", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskAssessmentStatus status = riskAssessmentStatusRepository.findById(id);
            if (status != null) {
                riskAssessmentStatusRepository.delete(status);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting Risk Assessment Status", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskAssessmentStatusDTO>> listAll() {
        try {
            List<RiskAssessmentStatus> entities = riskAssessmentStatusRepository.listAll();
            List<RiskAssessmentStatusDTO> dtos = entities.stream()
                    .map(riskAssessmentStatusMapper::toDTO)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(dtos);
        } catch (Exception e) {
            log.error("Error during listing all Risk Assessment Statuses", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
