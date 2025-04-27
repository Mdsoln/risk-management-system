package tz.go.psssf.risk.service;

import java.time.LocalDateTime;
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
import tz.go.psssf.risk.dto.RiskRegistryDTO;
import tz.go.psssf.risk.entity.RiskRegistry;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskRegistryMapper;
import tz.go.psssf.risk.pojo.RiskRegistryPojo;
import tz.go.psssf.risk.repository.RiskRegistryRepository;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskRegistryService {

    @Inject
    Logger log;

    @Inject
    RiskRegistryRepository riskRegistryRepository;

    @Inject
    RiskRegistryMapper riskRegistryMapper;

    private static final List<String> SEARCHABLE_FIELDS = List.of("risk.name", "risk.description");
    private static final Set<String> VALID_SORT_FIELDS = Set.of("risk.name", "risk.id", "createdAt");
    private static final Set<String> VALID_DATE_FIELDS = Set.of("createdAt", "updatedAt");

    private static final Map<String, String> SORT_FIELD_MAPPINGS = Map.of(
        "risk.name", "risk.name",
        "createdAt", "createdAt",
        "id", "id"
    );

    public ResponseWrapper<PaginatedResponse<RiskRegistryPojo>> findWithPaginationSortingFiltering(int page, int size,
            List<String> sort, String sortDirection, String searchKeyword, LocalDateTime startDate,
            LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<RiskRegistry> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<RiskRegistry> query = customQueryHelper.findWithPaginationSortingFiltering(
                    riskRegistryRepository,
                    RiskRegistry.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<RiskRegistry> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<RiskRegistryPojo> pojos = paginatedResponse.getItems().stream()
                    .map(riskRegistryMapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<RiskRegistryPojo> pojoPaginatedResponse = new PaginatedResponse<>(
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

    public ResponseWrapper<RiskRegistryPojo> findById(String id) {
        try {
            RiskRegistry riskRegistry = riskRegistryRepository.find("id", id).singleResult();
            if (riskRegistry != null) {
                RiskRegistryPojo pojo = riskRegistryMapper.toPojo(riskRegistry);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (NoResultException e) {
            log.error("No RiskRegistry found for id: " + id, e);
            return ResponseHelper.createNotFoundResponse();
        } catch (Exception e) {
            log.error("Error finding RiskRegistry by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskRegistryPojo> create(@Valid RiskRegistryDTO riskRegistryDTO) {
        try {
            RiskRegistry entity = riskRegistryMapper.toEntity(riskRegistryDTO);
            riskRegistryRepository.persist(entity);
            RiskRegistryPojo resultPojo = riskRegistryMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (IllegalArgumentException e) {
            log.error("Error during mapping DTO to entity", e);
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during creating RiskRegistry", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskRegistryPojo> update(String id, @Valid RiskRegistryDTO riskRegistryDTO) {
        try {
            RiskRegistry entity = riskRegistryRepository.findById(id);
            if (entity != null) {
                riskRegistryMapper.updateEntityFromDTO(riskRegistryDTO, entity);
                RiskRegistryPojo resultPojo = riskRegistryMapper.toPojo(entity);
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
            log.error("Error during updating RiskRegistry", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskRegistry entity = riskRegistryRepository.findById(id);
            if (entity != null) {
                riskRegistryRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskRegistry", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskRegistryPojo>> listAll() {
        try {
            List<RiskRegistry> entities = riskRegistryRepository.listAll();
            List<RiskRegistryPojo> pojos = entities.stream()
                    .map(riskRegistryMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskRegistries", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
