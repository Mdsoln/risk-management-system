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
import tz.go.psssf.risk.dto.FundObjectiveDTO;
import tz.go.psssf.risk.entity.FundObjective;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.FundObjectiveMapper;
import tz.go.psssf.risk.pojo.FundObjectivePojo;
import tz.go.psssf.risk.repository.FundObjectiveRepository;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class FundObjectiveService {

    @Inject
    Logger log;

    @Inject
    FundObjectiveRepository fundObjectiveRepository;

    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("name");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("name", "id", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();
    static {
        SORT_FIELD_MAPPINGS.put("name", "FundObjective");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
        SORT_FIELD_MAPPINGS.put("id", "id");
    }

    public ResponseWrapper<PaginatedResponse<FundObjectivePojo>> findWithPaginationSortingFiltering(int page, int size,
            List<String> sort, String sortDirection, String searchKeyword, LocalDateTime startDate,
            LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<FundObjective> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<FundObjective> query = customQueryHelper.findWithPaginationSortingFiltering(
                    fundObjectiveRepository,
                    FundObjective.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<FundObjective> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<FundObjectivePojo> pojos = paginatedResponse.getItems().stream()
                    .map(FundObjectiveMapper.INSTANCE::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<FundObjectivePojo> pojoPaginatedResponse = new PaginatedResponse<>(
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

    public ResponseWrapper<FundObjectivePojo> findById(String id) {
        try {
            FundObjective fundObjective = fundObjectiveRepository.find("id", id).singleResult();
            if (fundObjective != null) {
                // Fetch the business processes eagerly
                fundObjective.getBusinessProcess().size();  // Ensure lazy-loaded collection is initialized

                FundObjectivePojo pojo = FundObjectiveMapper.INSTANCE.toPojo(fundObjective);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (NoResultException e) {
            log.error("No Fund Objective found for id: " + id, e);
            return ResponseHelper.createNotFoundResponse();
        } catch (Exception e) {
            log.error("Error finding FundObjective by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<FundObjectivePojo> create(@Valid FundObjectiveDTO fundObjectiveDTO) {
        try {
            FundObjective entity = FundObjectiveMapper.INSTANCE.toEntity(fundObjectiveDTO);
            fundObjectiveRepository.persist(entity);
            FundObjectivePojo resultPojo = FundObjectiveMapper.INSTANCE.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (IllegalArgumentException e) {
            log.error("Error during mapping DTO to entity", e);
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during creating FundObjective", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<FundObjectivePojo> update(String id, @Valid FundObjectiveDTO fundObjectiveDTO) {
        try {
            FundObjective entity = fundObjectiveRepository.findById(id);
            if (entity != null) {
                FundObjectiveMapper.INSTANCE.updateEntityFromDTO(fundObjectiveDTO, entity);
                FundObjectivePojo resultPojo = FundObjectiveMapper.INSTANCE.toPojo(entity);
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
            log.error("Error during updating FundObjective", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            FundObjective entity = fundObjectiveRepository.findById(id);
            if (entity != null) {
                fundObjectiveRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting FundObjective", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<FundObjectivePojo>> listAll() {
        try {
            List<FundObjective> entities = fundObjectiveRepository.listAll()
                    .stream().peek(fo -> fo.getBusinessProcess().size()).collect(Collectors.toList());
            List<FundObjectivePojo> pojos = entities.stream()
                    .map(FundObjectiveMapper.INSTANCE::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all FundObjectives", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    public ResponseWrapper<List<FundObjectivePojo>> listAllByBusinessProcess(String businessProcessId) {
        try {
            List<FundObjective> entities = fundObjectiveRepository.find("businessProcess.id", businessProcessId).list();
            List<FundObjectivePojo> pojos = entities.stream()
                    .map(FundObjectiveMapper.INSTANCE::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing FundObjectives by BusinessProcess", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
