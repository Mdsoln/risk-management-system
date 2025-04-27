//package tz.go.psssf.risk.bcm.service;
//
//
//import io.quarkus.hibernate.orm.panache.PanacheQuery;
//import jakarta.enterprise.context.ApplicationScoped;
//import jakarta.inject.Inject;
//import jakarta.persistence.EntityManager;
//import jakarta.transaction.Transactional;
//import jakarta.validation.ConstraintViolationException;
//import jakarta.validation.Valid;
//import org.hibernate.Filter;
//import org.hibernate.Session;
//import org.jboss.logging.Logger;
//import tz.go.psssf.risk.bcm.dto.BcmImpactAssessmentDTO;
//import tz.go.psssf.risk.bcm.entity.BcmImpactAssessment;
//import tz.go.psssf.risk.bcm.mapper.BcmImpactAssessmentMapper;
//import tz.go.psssf.risk.bcm.pojo.BcmImpactAssessmentPojo;
//import tz.go.psssf.risk.bcm.repository.BcmImpactAssessmentRepository;
//import tz.go.psssf.risk.helper.CustomQueryHelper;
//import tz.go.psssf.risk.helper.PaginationHelper;
//import tz.go.psssf.risk.helper.ResponseHelper;
//import tz.go.psssf.risk.response.PaginatedResponse;
//import tz.go.psssf.risk.response.ResponseWrapper;
//
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.*;
//import java.util.stream.Collectors;
//
//@ApplicationScoped
//public class BcmImpactAssessmentService {
//
//    @Inject
//    Logger log;
//
//    @Inject
//    BcmImpactAssessmentRepository repository;
//
//    @Inject
//    BcmImpactAssessmentMapper mapper;
//
//    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;
//
//    // Searchable fields
//    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("impactType", "severityLevel", "timeToRecover");
//    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("impactType", "severityLevel", "createdAt"));
//    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));
//
//    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();
//
//    static {
//        SORT_FIELD_MAPPINGS.put("impactType", "impactType");
//        SORT_FIELD_MAPPINGS.put("severityLevel", "severityLevel");
//        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
//    }
//
//    private void enableActiveFilter(Session session) {
//        Filter filter = session.enableFilter("activeFilter");
//        filter.setParameter("status", "ACTIVE");
//    }
//
//    public ResponseWrapper<PaginatedResponse<BcmImpactAssessmentPojo>> findWithPaginationSortingFiltering(
//            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
//            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {
//
//        try {
//            CustomQueryHelper<BcmImpactAssessment> customQueryHelper = new CustomQueryHelper<>();
//            PanacheQuery<BcmImpactAssessment> query = customQueryHelper.findWithPaginationSortingFiltering(
//                    repository,
//                    BcmImpactAssessment.class, page, size, sort, sortDirection, searchKeyword,
//                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
//                    SORT_FIELD_MAPPINGS);
//
//            PaginatedResponse<BcmImpactAssessment> paginatedResponse = PaginationHelper.toPageInfo(query);
//
//            List<BcmImpactAssessmentPojo> pojos = paginatedResponse.getItems().stream()
//                    .map(mapper::toPojo)
//                    .collect(Collectors.toList());
//
//            PaginatedResponse<BcmImpactAssessmentPojo> pojoPaginatedResponse = new PaginatedResponse<>(
//                    paginatedResponse.getCurrentPage(),
//                    paginatedResponse.getTotalPages(),
//                    paginatedResponse.getTotalItems(),
//                    paginatedResponse.getPageSize(),
//                    paginatedResponse.isHasPrevious(),
//                    paginatedResponse.isHasNext(),
//                    pojos
//            );
//
//            return ResponseHelper.createPaginatedResponse(pojoPaginatedResponse.getItems(),
//                    pojoPaginatedResponse.getCurrentPage(), pojoPaginatedResponse.getTotalItems(),
//                    pojoPaginatedResponse.getPageSize());
//
//        } catch (IllegalArgumentException e) {
//            return ResponseHelper.createValidationErrorResponse(e);
//        } catch (ConstraintViolationException e) {
//            return ResponseHelper.createConstraintViolationErrorResponse(e);
//        } catch (Exception e) {
//            log.error("Error during pagination and filtering", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    public ResponseWrapper<BcmImpactAssessmentPojo> findById(String id) {
//        try {
//            BcmImpactAssessment entity = repository.findById(id);
//            if (entity == null) {
//                return ResponseHelper.createNotFoundResponse();
//            }
//            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
//        } catch (Exception e) {
//            log.error("Error finding BcmImpactAssessment by ID", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @Transactional
//    public ResponseWrapper<BcmImpactAssessmentPojo> create(@Valid BcmImpactAssessmentDTO dto) {
//        try {
//            BcmImpactAssessment entity = mapper.toEntity(dto);
//            repository.persist(entity);
//            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
//        } catch (Exception e) {
//            log.error("Error creating BcmImpactAssessment", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @Transactional
//    public ResponseWrapper<BcmImpactAssessmentPojo> update(String id, @Valid BcmImpactAssessmentDTO dto) {
//        try {
//            BcmImpactAssessment entity = repository.findById(id);
//            if (entity == null) {
//                return ResponseHelper.createNotFoundResponse();
//            }
//
//            mapper.updateEntityFromDTO(dto, entity);
//            repository.persist(entity);
//            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
//        } catch (Exception e) {
//            log.error("Error updating BcmImpactAssessment", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @Transactional
//    public ResponseWrapper<Void> delete(String id) {
//        try {
//            BcmImpactAssessment entity = repository.findById(id);
//            if (entity == null) {
//                return ResponseHelper.createNotFoundResponse();
//            }
//            repository.delete(entity);
//            return ResponseHelper.createSuccessResponse(null);
//        } catch (Exception e) {
//            log.error("Error deleting BcmImpactAssessment", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//}
package tz.go.psssf.risk.bcm.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.BcmImpactAssessmentDTO;
import tz.go.psssf.risk.bcm.entity.BcmImpactAssessment;
import tz.go.psssf.risk.bcm.entity.BcmProcess;
import tz.go.psssf.risk.bcm.entity.BcmSubProcess;
import tz.go.psssf.risk.bcm.mapper.BcmImpactAssessmentMapper;
import tz.go.psssf.risk.bcm.pojo.BcmImpactAssessmentPojo;
import tz.go.psssf.risk.bcm.repository.BcmImpactAssessmentRepository;
import tz.go.psssf.risk.bcm.repository.BcmProcessRepository;
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
public class BcmImpactAssessmentService {

    @Inject
    Logger log;

    @Inject
    BcmImpactAssessmentRepository repository;
    
    @Inject
    BcmProcessRepository bcmProcessRepository;

    @Inject
    BcmSubProcessRepository bcmSubProcessRepository;

    @Inject
    BcmImpactAssessmentMapper mapper;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;
    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("impactType", "severityLevel", "timeToRecover");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("impactType", "severityLevel", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));
    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();
    static {
        SORT_FIELD_MAPPINGS.put("impactType", "impactType");
        SORT_FIELD_MAPPINGS.put("severityLevel", "severityLevel");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
    }

    public ResponseWrapper<PaginatedResponse<BcmImpactAssessmentPojo>> findWithPaginationSortingFiltering(
            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {
        try {
            CustomQueryHelper<BcmImpactAssessment> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<BcmImpactAssessment> query = customQueryHelper.findWithPaginationSortingFiltering(
                    repository, BcmImpactAssessment.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<BcmImpactAssessment> paginatedResponse = PaginationHelper.toPageInfo(query);
            List<BcmImpactAssessmentPojo> pojos = paginatedResponse.getItems()
                    .stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<BcmImpactAssessmentPojo> pojoPaginated = new PaginatedResponse<>(
                    paginatedResponse.getCurrentPage(),
                    paginatedResponse.getTotalPages(),
                    paginatedResponse.getTotalItems(),
                    paginatedResponse.getPageSize(),
                    paginatedResponse.isHasPrevious(),
                    paginatedResponse.isHasNext(),
                    pojos
            );
            return ResponseHelper.createPaginatedResponse(
                    pojoPaginated.getItems(),
                    pojoPaginated.getCurrentPage(),
                    pojoPaginated.getTotalItems(),
                    pojoPaginated.getPageSize());
        } catch (IllegalArgumentException e) {
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during pagination/filtering", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<BcmImpactAssessmentPojo> findById(String id) {
        try {
            BcmImpactAssessment entity = repository.findById(id);
            if (entity == null) return ResponseHelper.createNotFoundResponse();
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error finding BcmImpactAssessment by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BcmImpactAssessmentPojo> create(@Valid BcmImpactAssessmentDTO dto) {
        try {
            BcmImpactAssessment entity = mapper.toEntity(dto);
            if (dto.getProcessId() != null) {
                BcmProcess process = bcmProcessRepository.findById(dto.getProcessId());
                entity.setProcess(process);
            }
            if (dto.getSubProcessId() != null && !dto.getSubProcessId().isBlank()) {
                BcmSubProcess subProcess = bcmSubProcessRepository.findById(dto.getSubProcessId());
                entity.setSubProcess(subProcess);
            }
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error creating BcmImpactAssessment", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BcmImpactAssessmentPojo> update(String id, @Valid BcmImpactAssessmentDTO dto) {
        try {
            BcmImpactAssessment entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            mapper.updateEntityFromDTO(dto, entity);
            if (dto.getProcessId() != null) {
                BcmProcess process = bcmProcessRepository.findById(dto.getProcessId());
                entity.setProcess(process);
            } else {
                entity.setProcess(null);
            }
            if (dto.getSubProcessId() != null && !dto.getSubProcessId().isBlank()) {
                BcmSubProcess subProcess = bcmSubProcessRepository.findById(dto.getSubProcessId());
                entity.setSubProcess(subProcess);
            } else {
                entity.setSubProcess(null);
            }
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error updating BcmImpactAssessment", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            BcmImpactAssessment entity = repository.findById(id);
            if (entity == null) return ResponseHelper.createNotFoundResponse();
            repository.delete(entity);
            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error deleting BcmImpactAssessment", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
