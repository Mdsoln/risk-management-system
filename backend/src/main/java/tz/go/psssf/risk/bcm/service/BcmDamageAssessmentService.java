package tz.go.psssf.risk.bcm.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.BcmDamageAssessmentDTO;
import tz.go.psssf.risk.bcm.entity.BcmDamageAssessment;
import tz.go.psssf.risk.bcm.mapper.BcmDamageAssessmentMapper;
import tz.go.psssf.risk.bcm.pojo.BcmDamageAssessmentPojo;
import tz.go.psssf.risk.bcm.repository.BcmDamageAssessmentRepository;
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
public class BcmDamageAssessmentService {

    @Inject
    Logger log;

    @Inject
    BcmDamageAssessmentRepository repository;

    @Inject
    BcmDamageAssessmentMapper mapper;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    // Searchable fields
    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("supplier", "name");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("supplier", "name", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();

    static {
        SORT_FIELD_MAPPINGS.put("supplier", "supplier");
        SORT_FIELD_MAPPINGS.put("name", "name");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
    }

    public ResponseWrapper<PaginatedResponse<BcmDamageAssessmentPojo>> findWithPaginationSortingFiltering(
            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<BcmDamageAssessment> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<BcmDamageAssessment> query = customQueryHelper.findWithPaginationSortingFiltering(
                    repository,
                    BcmDamageAssessment.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<BcmDamageAssessment> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<BcmDamageAssessmentPojo> pojos = paginatedResponse.getItems().stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<BcmDamageAssessmentPojo> pojoPaginatedResponse = new PaginatedResponse<>(
                    paginatedResponse.getCurrentPage(),
                    paginatedResponse.getTotalPages(),
                    paginatedResponse.getTotalItems(),
                    paginatedResponse.getPageSize(),
                    paginatedResponse.isHasPrevious(),
                    paginatedResponse.isHasNext(),
                    pojos
            );

            return ResponseHelper.createPaginatedResponse(pojoPaginatedResponse.getItems(),
                    pojoPaginatedResponse.getCurrentPage(), pojoPaginatedResponse.getTotalItems(),
                    pojoPaginatedResponse.getPageSize());

        } catch (IllegalArgumentException e) {
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during pagination and filtering", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<BcmDamageAssessmentPojo> findById(String id) {
        try {
            BcmDamageAssessment entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error finding BcmDamageAssessment by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BcmDamageAssessmentPojo> create(@Valid BcmDamageAssessmentDTO dto) {
        try {
            BcmDamageAssessment entity = mapper.toEntity(dto);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error creating BcmDamageAssessment", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BcmDamageAssessmentPojo> update(String id, @Valid BcmDamageAssessmentDTO dto) {
        try {
            BcmDamageAssessment entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            mapper.updateEntityFromDTO(dto, entity);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error updating BcmDamageAssessment", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            BcmDamageAssessment entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            repository.delete(entity);
            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error deleting BcmDamageAssessment", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
