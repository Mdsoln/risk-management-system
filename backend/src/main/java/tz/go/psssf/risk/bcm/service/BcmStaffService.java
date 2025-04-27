package tz.go.psssf.risk.bcm.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.BcmStaffDTO;
import tz.go.psssf.risk.bcm.entity.BcmStaff;
import tz.go.psssf.risk.bcm.mapper.BcmStaffMapper;
import tz.go.psssf.risk.bcm.pojo.BcmStaffPojo;
import tz.go.psssf.risk.bcm.repository.BcmStaffRepository;
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
public class BcmStaffService {

    @Inject
    Logger log;

    @Inject
    BcmStaffRepository repository;

    @Inject
    BcmStaffMapper mapper;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("name", "role", "location");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("name", "role", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();

    static {
        SORT_FIELD_MAPPINGS.put("name", "name");
        SORT_FIELD_MAPPINGS.put("role", "role");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
    }

    public ResponseWrapper<PaginatedResponse<BcmStaffPojo>> findWithPaginationSortingFiltering(
            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<BcmStaff> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<BcmStaff> query = customQueryHelper.findWithPaginationSortingFiltering(
                    repository,
                    BcmStaff.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<BcmStaff> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<BcmStaffPojo> pojos = paginatedResponse.getItems().stream()
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

    public ResponseWrapper<BcmStaffPojo> findById(String id) {
        try {
            BcmStaff entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error finding BcmStaff by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BcmStaffPojo> create(@Valid BcmStaffDTO dto) {
        try {
            BcmStaff entity = mapper.toEntity(dto);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error creating BcmStaff", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BcmStaffPojo> update(String id, @Valid BcmStaffDTO dto) {
        try {
            BcmStaff entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            mapper.updateEntityFromDTO(dto, entity);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error updating BcmStaff", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            BcmStaff entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            repository.delete(entity);
            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error deleting BcmStaff", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
