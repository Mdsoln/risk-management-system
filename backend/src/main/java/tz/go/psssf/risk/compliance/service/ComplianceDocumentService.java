package tz.go.psssf.risk.compliance.service;

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
import tz.go.psssf.risk.compliance.dto.ComplianceDocumentDTO;
import tz.go.psssf.risk.compliance.dto.RegulatoryComplianceMatrixDTO;
import tz.go.psssf.risk.compliance.entity.ComplianceDocument;
import tz.go.psssf.risk.compliance.entity.RegulatoryComplianceMatrix;
import tz.go.psssf.risk.compliance.entity.RegulatoryComplianceMatrixSection;
import tz.go.psssf.risk.compliance.mapper.ComplianceDocumentMapper;
import tz.go.psssf.risk.compliance.mapper.RegulatoryComplianceMatrixMapper;
import tz.go.psssf.risk.compliance.mapper.RegulatoryComplianceMatrixSectionMapper;
import tz.go.psssf.risk.compliance.pojo.ComplianceDocumentPojo;
import tz.go.psssf.risk.compliance.repository.ComplianceDocumentRepository;
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
public class ComplianceDocumentService {

    @Inject
    Logger log;

    @Inject
    ComplianceDocumentRepository repository;

    @Inject
    ComplianceDocumentMapper mapper;

    @Inject
    RegulatoryComplianceMatrixMapper regulatoryComplianceMatrixMapper;
    
    @Inject
    RegulatoryComplianceMatrixSectionMapper regulatoryComplianceMatrixSectionMapper;


    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("name");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("name", "year", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();

    static {
        SORT_FIELD_MAPPINGS.put("name", "name");
        SORT_FIELD_MAPPINGS.put("year", "year");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
    }

    private void enableActiveFilter(Session session) {
        Filter filter = session.enableFilter("activeFilter");
        filter.setParameter("status", "ACTIVE");
    }

    public ResponseWrapper<PaginatedResponse<ComplianceDocumentPojo>> findWithPaginationSortingFiltering(
            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<ComplianceDocument> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<ComplianceDocument> query = customQueryHelper.findWithPaginationSortingFiltering(
                    repository,
                    ComplianceDocument.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<ComplianceDocument> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<ComplianceDocumentPojo> pojos = paginatedResponse.getItems().stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<ComplianceDocumentPojo> pojoPaginatedResponse = new PaginatedResponse<>(
                    paginatedResponse.getCurrentPage(),
                    paginatedResponse.getTotalPages(),
                    paginatedResponse.getTotalItems(),
                    paginatedResponse.getPageSize(),
                    paginatedResponse.isHasPrevious(),
                    paginatedResponse.isHasNext(),
                    pojos
            );

            return ResponseHelper.createPaginatedResponse(
                    pojoPaginatedResponse.getItems(),
                    pojoPaginatedResponse.getCurrentPage(),
                    pojoPaginatedResponse.getTotalItems(),
                    pojoPaginatedResponse.getPageSize()
            );

        } catch (Exception e) {
            log.error("Error during pagination and filtering", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<ComplianceDocumentPojo> findById(String id) {
        try {
            ComplianceDocument entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            ComplianceDocumentPojo pojo = mapper.toPojo(entity);
            pojo.setComplianceMatrices(entity.getComplianceMatrices()
                    .stream()
                    .map(regulatoryComplianceMatrixMapper::toPojo)
                    .collect(Collectors.toList()));

            return ResponseHelper.createSuccessResponse(pojo);
        } catch (Exception e) {
            log.error("Error finding ComplianceDocument by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ComplianceDocumentPojo> create(@Valid ComplianceDocumentDTO dto) {
        try {
            ComplianceDocument entity = mapper.toEntity(dto);

            if (dto.getComplianceMatrices() != null) {
                List<RegulatoryComplianceMatrix> matrices = dto.getComplianceMatrices().stream()
                        .map(matrixDTO -> {
                            RegulatoryComplianceMatrix matrix = regulatoryComplianceMatrixMapper.toEntity(matrixDTO);
                            matrix.setComplianceDocument(entity);
                            matrix.setSections(matrixDTO.getSections().stream()
                                    .map(sectionDTO -> {
                                        RegulatoryComplianceMatrixSection section = regulatoryComplianceMatrixSectionMapper.toEntity(sectionDTO);
                                        section.setRegulatoryComplianceMatrix(matrix);
                                        return section;
                                    })
                                    .collect(Collectors.toList()));
                            return matrix;
                        })
                        .collect(Collectors.toList());
                entity.setComplianceMatrices(matrices);
            }

            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error creating ComplianceDocument", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ComplianceDocumentPojo> update(String id, @Valid ComplianceDocumentDTO dto) {
        try {
            ComplianceDocument entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            mapper.updateEntityFromDTO(dto, entity);

            if (dto.getComplianceMatrices() != null) {
                List<RegulatoryComplianceMatrix> matrices = dto.getComplianceMatrices().stream()
                        .map(matrixDTO -> {
                            RegulatoryComplianceMatrix matrix = regulatoryComplianceMatrixMapper.toEntity(matrixDTO);
                            matrix.setComplianceDocument(entity);
                            matrix.setSections(matrixDTO.getSections().stream()
                                    .map(sectionDTO -> {
                                        RegulatoryComplianceMatrixSection section = regulatoryComplianceMatrixSectionMapper.toEntity(sectionDTO);
                                        section.setRegulatoryComplianceMatrix(matrix);
                                        return section;
                                    })
                                    .collect(Collectors.toList()));
                            return matrix;
                        })
                        .collect(Collectors.toList());
                entity.getComplianceMatrices().clear();
                entity.getComplianceMatrices().addAll(matrices);
            }

            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error updating ComplianceDocument", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            ComplianceDocument entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            repository.delete(entity);
            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error deleting ComplianceDocument", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<ComplianceDocumentPojo> addMatrix(String documentId, List<RegulatoryComplianceMatrixDTO> matrixDTOs) {
        try {
            ComplianceDocument document = repository.findById(documentId);
            if (document == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            List<RegulatoryComplianceMatrix> matrices = matrixDTOs.stream()
                    .map(matrixDTO -> {
                        RegulatoryComplianceMatrix matrix = regulatoryComplianceMatrixMapper.toEntity(matrixDTO);
                        matrix.setComplianceDocument(document);
                        return matrix;
                    })
                    .collect(Collectors.toList());

            document.getComplianceMatrices().addAll(matrices);
            repository.persist(document);

            return ResponseHelper.createSuccessResponse(mapper.toPojo(document));
        } catch (Exception e) {
            log.error("Error adding RegulatoryComplianceMatrix", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
