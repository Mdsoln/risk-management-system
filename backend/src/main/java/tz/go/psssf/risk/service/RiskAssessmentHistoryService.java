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
import tz.go.psssf.risk.dto.RiskAssessmentHistoryDTO;
import tz.go.psssf.risk.entity.RiskAssessmentHistory;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskAssessmentHistoryMapper;
import tz.go.psssf.risk.pojo.RiskAssessmentHistoryPojo;
import tz.go.psssf.risk.repository.RiskAssessmentHistoryRepository;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskAssessmentHistoryService {

    @Inject
    Logger log;

    @Inject
    RiskAssessmentHistoryRepository riskAssessmentHistoryRepository;

    @Inject
    RiskAssessmentHistoryMapper riskAssessmentHistoryMapper;

    private static final List<String> SEARCHABLE_FIELDS = List.of("performedBy");
    private static final Set<String> VALID_SORT_FIELDS = Set.of("timestamp", "id", "createdAt");
    private static final Set<String> VALID_DATE_FIELDS = Set.of("createdAt", "updatedAt");

    private static final Map<String, String> SORT_FIELD_MAPPINGS = Map.of(
            "timestamp", "timestamp",
            "createdAt", "createdAt",
            "id", "id"
    );

    private void enableActiveFilter(Session session) {
        Filter filter = session.enableFilter("activeFilter");
        filter.setParameter("status", "ACTIVE");
    }

    public ResponseWrapper<PaginatedResponse<RiskAssessmentHistoryPojo>> findWithPaginationSortingFiltering(int page, int size,
                                                                                                             List<String> sort, String sortDirection, String searchKeyword, LocalDateTime startDate,
                                                                                                             LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<RiskAssessmentHistory> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<RiskAssessmentHistory> query = customQueryHelper.findWithPaginationSortingFiltering(
                    riskAssessmentHistoryRepository,
                    RiskAssessmentHistory.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<RiskAssessmentHistory> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<RiskAssessmentHistoryPojo> pojos = paginatedResponse.getItems().stream()
                    .map(riskAssessmentHistoryMapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<RiskAssessmentHistoryPojo> pojoPaginatedResponse = new PaginatedResponse<>(
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

    public ResponseWrapper<RiskAssessmentHistoryPojo> findById(String id) {
        try {
            Session session = riskAssessmentHistoryRepository.getEntityManager().unwrap(Session.class);
            enableActiveFilter(session);
            RiskAssessmentHistory riskAssessmentHistory = riskAssessmentHistoryRepository.findById(id);

            if (riskAssessmentHistory != null) {
                RiskAssessmentHistoryPojo pojo = riskAssessmentHistoryMapper.toPojo(riskAssessmentHistory);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskAssessmentHistory by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAssessmentHistoryPojo> create(@Valid RiskAssessmentHistoryDTO riskAssessmentHistoryDTO) {
        try {
            RiskAssessmentHistory entity = riskAssessmentHistoryMapper.toEntity(riskAssessmentHistoryDTO);
            riskAssessmentHistoryRepository.persist(entity);

            RiskAssessmentHistoryPojo resultPojo = riskAssessmentHistoryMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskAssessmentHistory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAssessmentHistoryPojo> update(String id, @Valid RiskAssessmentHistoryDTO riskAssessmentHistoryDTO) {
        try {
            RiskAssessmentHistory entity = riskAssessmentHistoryRepository.findById(id);
            if (entity != null) {
                riskAssessmentHistoryMapper.updateEntityFromDTO(riskAssessmentHistoryDTO, entity);
                riskAssessmentHistoryRepository.persist(entity);

                RiskAssessmentHistoryPojo resultPojo = riskAssessmentHistoryMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskAssessmentHistory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskAssessmentHistory entity = riskAssessmentHistoryRepository.findById(id);
            if (entity != null) {
                riskAssessmentHistoryRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskAssessmentHistory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskAssessmentHistoryPojo>> listAll() {
        try {
            List<RiskAssessmentHistory> entities = riskAssessmentHistoryRepository.listAll();
            List<RiskAssessmentHistoryPojo> pojos = entities.stream()
                    .map(riskAssessmentHistoryMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskAssessmentHistories", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskAssessmentHistoryPojo>> listAllByFlow(String flowId) {
        try {
            List<RiskAssessmentHistory> entities = riskAssessmentHistoryRepository.find("riskAssessmentFlow.id", flowId).list();
            List<RiskAssessmentHistoryPojo> pojos = entities.stream()
                    .map(riskAssessmentHistoryMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing RiskAssessmentHistories by Flow", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
