//package tz.go.psssf.risk.service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import jakarta.enterprise.context.ApplicationScoped;
//import jakarta.inject.Inject;
//import jakarta.transaction.Transactional;
//import jakarta.validation.ConstraintViolationException;
//import jakarta.validation.Valid;
//
//import org.jboss.logging.Logger;
//
//import io.quarkus.hibernate.orm.panache.PanacheQuery;
//import tz.go.psssf.risk.dto.RiskIndicatorThresholdDTO;
//import tz.go.psssf.risk.entity.RiskIndicatorThreshold;
//import tz.go.psssf.risk.helper.CustomQueryHelper;
//import tz.go.psssf.risk.helper.PaginationHelper;
//import tz.go.psssf.risk.helper.ResponseHelper;
//import tz.go.psssf.risk.mapper.RiskIndicatorThresholdMapper;
//import tz.go.psssf.risk.pojo.RiskIndicatorThresholdPojo;
//import tz.go.psssf.risk.repository.ThresholdRepository;
//import tz.go.psssf.risk.response.PaginatedResponse;
//import tz.go.psssf.risk.response.ResponseWrapper;
//
//@ApplicationScoped
//public class ThresholdService {
//
//    @Inject
//    Logger log;
//
//    @Inject
//    ThresholdRepository thresholdRepository;
//
//    @Inject
//    RiskIndicatorThresholdMapper thresholdMapper;
//
//    public ResponseWrapper<PaginatedResponse<RiskIndicatorThresholdPojo>> findWithPaginationSortingFiltering(int page, int size,
//            List<String> sort, String sortDirection, String searchKeyword, LocalDateTime startDate,
//            LocalDateTime endDate, String filterDateBy) {
//
//        try {
//            CustomQueryHelper<RiskIndicatorThreshold> customQueryHelper = new CustomQueryHelper<>();
//            PanacheQuery<RiskIndicatorThreshold> query = customQueryHelper.findWithPaginationSortingFiltering(
//                    thresholdRepository,
//                    RiskIndicatorThreshold.class, page, size, sort, sortDirection, searchKeyword,
//                    List.of("name"), startDate, endDate, filterDateBy,
//                    Set.of("name", "id", "createdAt"), Set.of("createdAt", "updatedAt"),
//                    Map.of("name", "Threshold", "createdAt", "createdAt", "id", "id"));
//
//            PaginatedResponse<RiskIndicatorThreshold> paginatedResponse = PaginationHelper.toPageInfo(query);
//
//            List<RiskIndicatorThresholdPojo> pojos = paginatedResponse.getItems().stream()
//                    .map(thresholdMapper::toPojo)
//                    .collect(Collectors.toList());
//
//            PaginatedResponse<RiskIndicatorThresholdPojo> pojoPaginatedResponse = new PaginatedResponse<>(
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
//    public ResponseWrapper<RiskIndicatorThresholdPojo> findById(String id) {
//        try {
//            RiskIndicatorThreshold threshold = thresholdRepository.find("id", id).singleResult();
//            if (threshold != null) {
//                RiskIndicatorThresholdPojo pojo = thresholdMapper.toPojo(threshold);
//                return ResponseHelper.createSuccessResponse(pojo);
//            } else {
//                return ResponseHelper.createNotFoundResponse();
//            }
//        } catch (Exception e) {
//            log.error("Error finding Threshold by id", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @Transactional
//    public ResponseWrapper<RiskIndicatorThresholdPojo> create(@Valid RiskIndicatorThresholdDTO thresholdDTO) {
//        try {
//            RiskIndicatorThreshold entity = thresholdMapper.toEntity(thresholdDTO);
//            thresholdRepository.persist(entity);
//            RiskIndicatorThresholdPojo resultPojo = thresholdMapper.toPojo(entity);
//            return ResponseHelper.createSuccessResponse(resultPojo);
//        } catch (Exception e) {
//            log.error("Error during creating Threshold", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @Transactional
//    public ResponseWrapper<RiskIndicatorThresholdPojo> update(String id, @Valid RiskIndicatorThresholdDTO thresholdDTO) {
//        try {
//            RiskIndicatorThreshold entity = thresholdRepository.findById(id);
//            if (entity != null) {
//                thresholdMapper.updateEntityFromDTO(thresholdDTO, entity);
//                RiskIndicatorThresholdPojo resultPojo = thresholdMapper.toPojo(entity);
//                return ResponseHelper.createSuccessResponse(resultPojo);
//            } else {
//                return ResponseHelper.createNotFoundResponse();
//            }
//        } catch (Exception e) {
//            log.error("Error during updating Threshold", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @Transactional
//    public ResponseWrapper<Void> delete(String id) {
//        try {
//            RiskIndicatorThreshold entity = thresholdRepository.findById(id);
//            if (entity != null) {
//                thresholdRepository.delete(entity);
//                return ResponseHelper.createSuccessResponse(null);
//            } else {
//                return ResponseHelper.createNotFoundResponse();
//            }
//        } catch (Exception e) {
//            log.error("Error during deleting Threshold", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    public ResponseWrapper<List<RiskIndicatorThresholdPojo>> listAll() {
//        try {
//            List<RiskIndicatorThreshold> entities = thresholdRepository.listAll();
//            List<RiskIndicatorThresholdPojo> pojos = entities.stream()
//                    .map(thresholdMapper::toPojo)
//                    .collect(Collectors.toList());
//            return ResponseHelper.createSuccessResponse(pojos);
//        } catch (Exception e) {
//            log.error("Error during listing all Thresholds", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//    
//    public ResponseWrapper<List<RiskIndicatorThresholdPojo>> listAllByCategory(String categoryId) {
//        try {
//            List<RiskIndicatorThreshold> entities = thresholdRepository.find("thresholdCategory.id", categoryId).list();
//            List<RiskIndicatorThresholdPojo> pojos = entities.stream()
//                    .map(thresholdMapper::toPojo)
//                    .collect(Collectors.toList());
//            return ResponseHelper.createSuccessResponse(pojos);
//        } catch (Exception e) {
//            log.error("Error during listing Thresholds by Category", e);
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//}
