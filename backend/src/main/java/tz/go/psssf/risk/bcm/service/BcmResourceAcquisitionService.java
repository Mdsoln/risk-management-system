package tz.go.psssf.risk.bcm.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.BcmResourceAcquisitionDTO;
import tz.go.psssf.risk.bcm.entity.BcmResourceAcquisition;
import tz.go.psssf.risk.bcm.mapper.BcmResourceAcquisitionMapper;
import tz.go.psssf.risk.bcm.pojo.BcmResourceAcquisitionPojo;
import tz.go.psssf.risk.bcm.repository.BcmResourceAcquisitionRepository;
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
public class BcmResourceAcquisitionService {

    @Inject
    Logger log;

    @Inject
    BcmResourceAcquisitionRepository repository;

    @Inject
    BcmResourceAcquisitionMapper mapper;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    // Define searchable and sortable fields
    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("resource", "source");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("resource", "qtyNeeded", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();

    static {
        SORT_FIELD_MAPPINGS.put("resource", "resource");
        SORT_FIELD_MAPPINGS.put("qtyNeeded", "qtyNeeded");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
    }

    private void enableActiveFilter(Session session) {
        Filter filter = session.enableFilter("activeFilter");
        filter.setParameter("status", "ACTIVE");
    }

    // Pagination and filtering
    public ResponseWrapper<PaginatedResponse<BcmResourceAcquisitionPojo>> findWithPaginationSortingFiltering(
            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {

        try {
            // Validate page and size
            if (page < 0) {
                throw new IllegalArgumentException("Page must be greater than or equal to 0.");
            }
            if (size < 1 || size > 100) {
                throw new IllegalArgumentException("Size must be between 1 and 100.");
            }

            // Validate sort fields
            for (String sortField : sort) {
                if (!VALID_SORT_FIELDS.contains(sortField)) {
                    throw new IllegalArgumentException("Invalid sort field: " + sortField);
                }
            }

            // Validate filterDateBy
            if (!VALID_DATE_FIELDS.contains(filterDateBy)) {
                throw new IllegalArgumentException("Invalid date field: " + filterDateBy);
            }

            // Initialize query helper
            CustomQueryHelper<BcmResourceAcquisition> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<BcmResourceAcquisition> query = customQueryHelper.findWithPaginationSortingFiltering(
                    repository,
                    BcmResourceAcquisition.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            // Transform results
            PaginatedResponse<BcmResourceAcquisition> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<BcmResourceAcquisitionPojo> pojos = paginatedResponse.getItems().stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());

            return ResponseHelper.createPaginatedResponse(
                    pojos,
                    paginatedResponse.getCurrentPage(),
                    paginatedResponse.getTotalItems(),
                    paginatedResponse.getPageSize());

        } catch (IllegalArgumentException e) {
            log.error("Validation error: " + e.getMessage(), e);
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (ConstraintViolationException e) {
            log.error("Constraint violation: " + e.getMessage(), e);
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Unexpected error during pagination and filtering: ", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // Find by ID
    public ResponseWrapper<BcmResourceAcquisitionPojo> findById(String id) {
        try {
            BcmResourceAcquisition entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error finding BcmResourceAcquisition by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // Create resource acquisition
    @Transactional
    public ResponseWrapper<BcmResourceAcquisitionPojo> create(@Valid BcmResourceAcquisitionDTO dto) {
        try {
            BcmResourceAcquisition entity = mapper.toEntity(dto);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error creating BcmResourceAcquisition", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // Update resource acquisition
    @Transactional
    public ResponseWrapper<BcmResourceAcquisitionPojo> update(String id, @Valid BcmResourceAcquisitionDTO dto) {
        try {
            BcmResourceAcquisition entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            mapper.updateEntityFromDTO(dto, entity);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error updating BcmResourceAcquisition", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // Delete resource acquisition
    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            BcmResourceAcquisition entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            repository.delete(entity);
            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error deleting BcmResourceAcquisition", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
