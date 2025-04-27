//package tz.go.psssf.risk.service;
//
//import java.time.LocalDateTime;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import org.hibernate.Filter;
//import org.hibernate.Session;
//import org.jboss.logging.Logger;
//
//import io.quarkus.hibernate.orm.panache.PanacheQuery;
//import jakarta.enterprise.context.ApplicationScoped;
//import jakarta.inject.Inject;
//import jakarta.transaction.Transactional;
//import jakarta.validation.ConstraintViolationException;
//import jakarta.validation.Valid;
//import tz.go.psssf.risk.dto.RiskAssessmentFlowDTO;
//import tz.go.psssf.risk.entity.RiskAssessmentFlow;
//import tz.go.psssf.risk.helper.CustomQueryHelper;
//import tz.go.psssf.risk.helper.PaginationHelper;
//import tz.go.psssf.risk.helper.ResponseHelper;
//import tz.go.psssf.risk.mapper.RiskAssessmentFlowMapper;
//import tz.go.psssf.risk.pojo.RiskAssessmentFlowPojo;
//import tz.go.psssf.risk.repository.RiskAssessmentFlowRepository;
//import tz.go.psssf.risk.response.PaginatedResponse;
//import tz.go.psssf.risk.response.ResponseWrapper;
//
//@ApplicationScoped
//public class RiskAssessmentFlowService {
//
//    @Inject
//    Logger log;
//
//    @Inject
//    RiskAssessmentFlowRepository riskAssessmentFlowRepository;
//
//    @Inject
//    RiskAssessmentFlowMapper riskAssessmentFlowMapper;
//
//    private static final List<String> SEARCHABLE_FIELDS = List.of("id");
//    private static final Set<String> VALID_SORT_FIELDS = Set.of("id", "createdAt");
//    private static final Set<String> VALID_DATE_FIELDS = Set.of("createdAt", "updatedAt");
//
//    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();
//    static {
//        SORT_FIELD_MAPPINGS.put("id", "id");
//        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
//    }
//
//    private void enableActiveFilter(Session session) {
//        Filter filter = session.enableFilter("activeFilter");
//        filter.setParameter("status", "ACTIVE");
//    }
//
//    public ResponseWrapper<PaginatedResponse<RiskAssessmentFlowPojo>> findWithPaginationSortingFiltering(int page, int size,
//            List<String> sort, String sortDirection, String searchKeyword, LocalDateTime startDate,
//            LocalDateTime endDate, String filterDateBy) {
//
//        try {
//            CustomQueryHelper<RiskAssessmentFlow> customQueryHelper = new CustomQueryHelper<>();
//            PanacheQuery<RiskAssessmentFlow> query = customQueryHelper.findWithPaginationSortingFiltering(
//                    riskAssessmentFlowRepository,
//                    RiskAssessmentFlow.class, page, size, sort, sortDirection, searchKeyword,
//                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
//                    SORT_FIELD_MAPPINGS);
//
//            PaginatedResponse<RiskAssessmentFlow> paginatedResponse = PaginationHelper.toPageInfo(query);
//
//            List<RiskAssessmentFlowPojo> pojos = paginatedResponse.getItems().stream()
//                    .map(riskAssessmentFlowMapper::toPojo)
//                    .collect(Collectors.toList());
//
//            PaginatedResponse<RiskAssessmentFlowPojo> pojoPaginatedResponse = new PaginatedResponse<>(
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
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    public ResponseWrapper<RiskAssessmentFlowPojo> findById(String id) {
//        try {
//            Session session = riskAssessmentFlowRepository.getEntityManager().unwrap(Session.class);
//            enableActiveFilter(session);
//            RiskAssessmentFlow riskAssessmentFlow = riskAssessmentFlowRepository.findById(id);
//
//            if (riskAssessmentFlow != null) {
//                RiskAssessmentFlowPojo pojo = riskAssessmentFlowMapper.toPojo(riskAssessmentFlow);
//                return ResponseHelper.createSuccessResponse(pojo);
//            } else {
//                return ResponseHelper.createNotFoundResponse();
//            }
//        } catch (Exception e) {
//            log.error("Error finding RiskAssessmentFlow by id", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @Transactional
//    public ResponseWrapper<RiskAssessmentFlowPojo> create(@Valid RiskAssessmentFlowDTO riskAssessmentFlowDTO) {
//        try {
//            RiskAssessmentFlow entity = riskAssessmentFlowMapper.toEntity(riskAssessmentFlowDTO);
//            riskAssessmentFlowRepository.persist(entity);
//            RiskAssessmentFlowPojo resultPojo = riskAssessmentFlowMapper.toPojo(entity);
//            return ResponseHelper.createSuccessResponse(resultPojo);
//        } catch (Exception e) {
//            log.error("Error during creating RiskAssessmentFlow", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @Transactional
//    public ResponseWrapper<RiskAssessmentFlowPojo> update(String id, @Valid RiskAssessmentFlowDTO riskAssessmentFlowDTO) {
//        try {
//            RiskAssessmentFlow entity = riskAssessmentFlowRepository.findById(id);
//            if (entity != null) {
//                riskAssessmentFlowMapper.updateEntityFromDTO(riskAssessmentFlowDTO, entity);
//                riskAssessmentFlowRepository.persist(entity);
//                RiskAssessmentFlowPojo resultPojo = riskAssessmentFlowMapper.toPojo(entity);
//                return ResponseHelper.createSuccessResponse(resultPojo);
//            } else {
//                return ResponseHelper.createNotFoundResponse();
//            }
//        } catch (Exception e) {
//            log.error("Error during updating RiskAssessmentFlow", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @Transactional
//    public ResponseWrapper<Void> delete(String id) {
//        try {
//            RiskAssessmentFlow entity = riskAssessmentFlowRepository.findById(id);
//            if (entity != null) {
//                riskAssessmentFlowRepository.delete(entity);
//                return ResponseHelper.createSuccessResponse(null);
//            } else {
//                return ResponseHelper.createNotFoundResponse();
//            }
//        } catch (Exception e) {
//            log.error("Error during deleting RiskAssessmentFlow", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    public ResponseWrapper<List<RiskAssessmentFlowPojo>> listAll() {
//        try {
//            List<RiskAssessmentFlow> entities = riskAssessmentFlowRepository.listAll();
//            List<RiskAssessmentFlowPojo> pojos = entities.stream()
//                    .map(riskAssessmentFlowMapper::toPojo)
//                    .collect(Collectors.toList());
//            return ResponseHelper.createSuccessResponse(pojos);
//        } catch (Exception e) {
//            log.error("Error during listing all RiskAssessmentFlows", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//}
