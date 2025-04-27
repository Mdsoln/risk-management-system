package tz.go.psssf.risk.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import tz.go.psssf.risk.dto.RiskAreaDTO;
import tz.go.psssf.risk.entity.RiskArea;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.RiskAreaMapper;
import tz.go.psssf.risk.pojo.RiskAreaPojo;
import tz.go.psssf.risk.repository.RiskAreaRepository;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskAreaService {

    @Inject
    Logger log;

    @Inject
    RiskAreaRepository riskAreaRepository;

    @Inject
    RiskAreaMapper riskAreaMapper;

    public ResponseWrapper<PaginatedResponse<RiskAreaPojo>> findWithPaginationSortingFiltering(int page, int size,
            List<String> sort, String sortDirection, String searchKeyword, LocalDateTime startDate,
            LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<RiskArea> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<RiskArea> query = customQueryHelper.findWithPaginationSortingFiltering(
                    riskAreaRepository,
                    RiskArea.class, page, size, sort, sortDirection, searchKeyword,
                    List.of("name"), startDate, endDate, filterDateBy,
                    Set.of("name", "id", "createdAt"), Set.of("createdAt", "updatedAt"),
                    Map.of("name", "RiskArea", "createdAt", "createdAt", "id", "id"));

            PaginatedResponse<RiskArea> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<RiskAreaPojo> pojos = paginatedResponse.getItems().stream()
                    .map(riskAreaMapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<RiskAreaPojo> pojoPaginatedResponse = new PaginatedResponse<>(
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

    public ResponseWrapper<RiskAreaPojo> findById(String id) {
        try {
            RiskArea riskArea = riskAreaRepository.find("id", id).singleResult();
            if (riskArea != null) {
                // Ensure lazy-loaded collection is initialized
                riskArea.getRiskAreaCategory().getName();

                RiskAreaPojo pojo = riskAreaMapper.toPojo(riskArea);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding RiskArea by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAreaPojo> create(@Valid RiskAreaDTO riskAreaDTO) {
        try {
            RiskArea entity = riskAreaMapper.toEntity(riskAreaDTO);
            riskAreaRepository.persist(entity);
            RiskAreaPojo resultPojo = riskAreaMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating RiskArea", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskAreaPojo> update(String id, @Valid RiskAreaDTO riskAreaDTO) {
        try {
            RiskArea entity = riskAreaRepository.findById(id);
            if (entity != null) {
                riskAreaMapper.updateEntityFromDTO(riskAreaDTO, entity);
                RiskAreaPojo resultPojo = riskAreaMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating RiskArea", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RiskArea entity = riskAreaRepository.findById(id);
            if (entity != null) {
                riskAreaRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting RiskArea", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskAreaPojo>> listAll() {
        try {
            List<RiskArea> entities = riskAreaRepository.listAll();
            List<RiskAreaPojo> pojos = entities.stream()
                    .map(riskAreaMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all RiskAreas", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    public ResponseWrapper<List<RiskAreaPojo>> listAllByRiskAreaCategory(String riskAreaCategoryId) {
        try {
            List<RiskArea> entities = riskAreaRepository.find("riskAreaCategory.id", riskAreaCategoryId).list();
            List<RiskAreaPojo> pojos = entities.stream()
                    .map(riskAreaMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing RiskAreas by RiskAreaCategory", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
