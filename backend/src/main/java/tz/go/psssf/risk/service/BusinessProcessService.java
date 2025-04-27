package tz.go.psssf.risk.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.jboss.logging.Logger;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import tz.go.psssf.risk.dto.BusinessProcessDTO;
import tz.go.psssf.risk.entity.BusinessProcess;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.BusinessProcessMapper;
import tz.go.psssf.risk.mapper.SimplifiedBusinessProcessMapper;
import tz.go.psssf.risk.pojo.BusinessProcessPojo;
import tz.go.psssf.risk.pojo.SimplifiedBusinessProcessPojo;
import tz.go.psssf.risk.repository.BusinessProcessRepository;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class BusinessProcessService {

    @Inject
    Logger log;

    @Inject
    BusinessProcessRepository businessProcessRepository;
    
    @Inject
    BusinessProcessMapper businessProcessMapper;

    @Inject
    SimplifiedBusinessProcessMapper simplifiedBusinessProcessMapper;

    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("name");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("name", "id", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();
    static {
        SORT_FIELD_MAPPINGS.put("name", "BusinessProcess");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
        SORT_FIELD_MAPPINGS.put("id", "id");
    }

    public ResponseWrapper<PaginatedResponse<SimplifiedBusinessProcessPojo>> findWithPaginationSortingFiltering(int page, int size,
            List<String> sort, String sortDirection, String searchKeyword, LocalDateTime startDate,
            LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<BusinessProcess> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<BusinessProcess> query = customQueryHelper.findWithPaginationSortingFiltering(
                    businessProcessRepository,
                    BusinessProcess.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<BusinessProcess> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<SimplifiedBusinessProcessPojo> pojos = paginatedResponse.getItems().stream()
                    .map(simplifiedBusinessProcessMapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<SimplifiedBusinessProcessPojo> pojoPaginatedResponse = new PaginatedResponse<>(
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
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<SimplifiedBusinessProcessPojo> findById(String id) {
        try {
            BusinessProcess businessProcess = businessProcessRepository.find("id", id).singleResult();
            if (businessProcess != null) {
                SimplifiedBusinessProcessPojo pojo = simplifiedBusinessProcessMapper.toPojo(businessProcess);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (NoResultException e) {
            log.error("No BusinessProcess found for id: " + id, e);
            return ResponseHelper.createNotFoundResponse();
        } catch (Exception e) {
            log.error("Error finding BusinessProcess by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BusinessProcessPojo> create(@Valid BusinessProcessDTO businessProcessDTO) {
        try {
            BusinessProcess entity = businessProcessMapper.toEntity(businessProcessDTO);
            businessProcessRepository.persist(entity);
            BusinessProcessPojo resultPojo = businessProcessMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (IllegalArgumentException e) {
            log.error("Error during mapping DTO to entity", e);
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during creating BusinessProcess", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BusinessProcessPojo> update(String id, @Valid BusinessProcessDTO businessProcessDTO) {
        try {
            BusinessProcess entity = businessProcessRepository.findById(id);
            if (entity != null) {
                businessProcessMapper.updateEntityFromDTO(businessProcessDTO, entity);
                BusinessProcessPojo resultPojo = businessProcessMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (IllegalArgumentException e) {
            log.error("Error during mapping DTO to entity", e);
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (ConstraintViolationException e) {
            log.error("Constraint violation error", e);
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during updating BusinessProcess", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            BusinessProcess entity = businessProcessRepository.findById(id);
            if (entity != null) {
                businessProcessRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting BusinessProcess", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<SimplifiedBusinessProcessPojo>> listAll() {
        try {
            List<BusinessProcess> entities = businessProcessRepository.listAll()
                    .stream().peek(bp -> bp.getRisks().size()).collect(Collectors.toList());
            List<SimplifiedBusinessProcessPojo> pojos = entities.stream()
                    .map(simplifiedBusinessProcessMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all BusinessProcesses", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    public ResponseWrapper<List<SimplifiedBusinessProcessPojo>> listAllByFundObjective(String fundObjectiveId) {
        try {
            List<BusinessProcess> entities = businessProcessRepository.find("fundObjective.id", fundObjectiveId).list();
            List<SimplifiedBusinessProcessPojo> pojos = entities.stream()
                    .map(simplifiedBusinessProcessMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing BusinessProcesses by FundObjective", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<SimplifiedBusinessProcessPojo>> searchByName(String name) {
        try {
            String lowercaseName = name.toLowerCase();  // Convert the search keyword to lowercase
            List<BusinessProcess> entities = businessProcessRepository.find("LOWER(name) like ?1", "%" + lowercaseName + "%")
                    .page(0, 100)
                    .list();
            List<SimplifiedBusinessProcessPojo> pojos = entities.stream()
                    .map(simplifiedBusinessProcessMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during searching BusinessProcesses by name", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }


}
