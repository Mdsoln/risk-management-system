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
import tz.go.psssf.risk.bcm.dto.BcmSubProcessDTO;
import tz.go.psssf.risk.bcm.entity.BcmSubProcess;
import tz.go.psssf.risk.bcm.mapper.BcmSubProcessMapper;
import tz.go.psssf.risk.bcm.pojo.BcmSubProcessPojo;
import tz.go.psssf.risk.bcm.repository.BcmSubProcessRepository;
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
public class BcmSubProcessService {

    @Inject
    Logger log;

    @Inject
    BcmSubProcessRepository repository;

    @Inject
    BcmSubProcessMapper mapper;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    // Searchable fields
    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("name", "priorityRanking");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("name", "priorityRanking", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();

    static {
        SORT_FIELD_MAPPINGS.put("name", "name");
        SORT_FIELD_MAPPINGS.put("priorityRanking", "priorityRanking");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
    }

    private void enableActiveFilter(Session session) {
        Filter filter = session.enableFilter("activeFilter");
        filter.setParameter("status", "ACTIVE");
    }

    public ResponseWrapper<PaginatedResponse<BcmSubProcessPojo>> findWithPaginationSortingFiltering(
            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<BcmSubProcess> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<BcmSubProcess> query = customQueryHelper.findWithPaginationSortingFiltering(
                    repository,
                    BcmSubProcess.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<BcmSubProcess> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<BcmSubProcessPojo> pojos = paginatedResponse.getItems().stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<BcmSubProcessPojo> pojoPaginatedResponse = new PaginatedResponse<>(
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

    public ResponseWrapper<BcmSubProcessPojo> findById(String id) {
        try {
            BcmSubProcess entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error finding BcmSubProcess by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BcmSubProcessPojo> create(@Valid BcmSubProcessDTO dto) {
        try {
            BcmSubProcess entity = mapper.toEntity(dto);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error creating BcmSubProcess", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BcmSubProcessPojo> update(String id, @Valid BcmSubProcessDTO dto) {
        try {
            BcmSubProcess entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            mapper.updateEntityFromDTO(dto, entity);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error updating BcmSubProcess", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            BcmSubProcess entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            repository.delete(entity);
            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error deleting BcmSubProcess", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}

