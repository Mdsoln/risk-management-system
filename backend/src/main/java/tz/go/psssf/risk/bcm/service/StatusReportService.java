package tz.go.psssf.risk.bcm.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.StatusReportDTO;
import tz.go.psssf.risk.bcm.entity.StatusReport;
import tz.go.psssf.risk.bcm.mapper.StatusReportMapper;
import tz.go.psssf.risk.bcm.pojo.StatusReportPojo;
import tz.go.psssf.risk.bcm.repository.StatusReportRepository;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class StatusReportService {

    @Inject
    Logger log;

    @Inject
    StatusReportRepository repository;

    @Inject
    StatusReportMapper mapper;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("businessUnit", "reportDate", "reportTime");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("businessUnit", "reportDate", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();

    static {
        SORT_FIELD_MAPPINGS.put("businessUnit", "businessUnit");
        SORT_FIELD_MAPPINGS.put("reportDate", "reportDate");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
    }

    public ResponseWrapper<PaginatedResponse<StatusReportPojo>> findWithPaginationSortingFiltering(
            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<StatusReport> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<StatusReport> query = customQueryHelper.findWithPaginationSortingFiltering(
                    repository,
                    StatusReport.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<StatusReport> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<StatusReportPojo> pojos = paginatedResponse.getItems().stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());

            return ResponseHelper.createPaginatedResponse(pojos,
                    paginatedResponse.getCurrentPage(), paginatedResponse.getTotalItems(), paginatedResponse.getPageSize());

        } catch (IllegalArgumentException e) {
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during filtering", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<StatusReportPojo> findById(String id) {
        try {
            StatusReport entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error finding StatusReport by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<StatusReportPojo> create(@Valid StatusReportDTO dto) {
        try {
            StatusReport entity = mapper.toEntity(dto);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error creating StatusReport", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<StatusReportPojo> update(String id, @Valid StatusReportDTO dto) {
        try {
            StatusReport entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            mapper.updateEntityFromDTO(dto, entity);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error updating StatusReport", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            StatusReport entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            repository.delete(entity);
            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error deleting StatusReport", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
