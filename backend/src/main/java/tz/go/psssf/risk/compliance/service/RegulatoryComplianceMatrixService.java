package tz.go.psssf.risk.compliance.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.compliance.dto.RegulatoryComplianceMatrixDTO;
import tz.go.psssf.risk.compliance.entity.RegulatoryComplianceMatrix;
import tz.go.psssf.risk.compliance.mapper.RegulatoryComplianceMatrixMapper;
import tz.go.psssf.risk.compliance.pojo.RegulatoryComplianceMatrixPojo;
import tz.go.psssf.risk.compliance.repository.RegulatoryComplianceMatrixRepository;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.JsonConverter;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.report.entity.ReportDashboard;
import tz.go.psssf.risk.report.repository.ReportDashboardRepository;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class RegulatoryComplianceMatrixService {

    @Inject
    Logger log;

    @Inject
    RegulatoryComplianceMatrixRepository repository;

    @Inject
    RegulatoryComplianceMatrixMapper mapper;

    @Inject
    ReportDashboardRepository reportDashboardRepository;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    // Constants for report codes
    private static final String REGULATORY_COMPLIANCE_MATRIX_REPORT_CODE = "REGULATORY_COMPLIANCE_MATRIX_REPORT";
    private static final String REGULATORY_COMPLIANCE_MATRIX_REPORT_NAME = "Regulatory Compliance Matrix Report";

    // Searchable fields
    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("itemNumber", "details");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("itemNumber", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();

    static {
        SORT_FIELD_MAPPINGS.put("itemNumber", "itemNumber");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
    }

    private void enableActiveFilter(Session session) {
        Filter filter = session.enableFilter("activeFilter");
        filter.setParameter("status", "ACTIVE");
    }

    // Search, Filter, Sort, and Pagination
    public ResponseWrapper<PaginatedResponse<RegulatoryComplianceMatrixPojo>> findWithPaginationSortingFiltering(
            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<RegulatoryComplianceMatrix> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<RegulatoryComplianceMatrix> query = customQueryHelper.findWithPaginationSortingFiltering(
                    repository,
                    RegulatoryComplianceMatrix.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<RegulatoryComplianceMatrix> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<RegulatoryComplianceMatrixPojo> pojos = paginatedResponse.getItems().stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<RegulatoryComplianceMatrixPojo> pojoPaginatedResponse = new PaginatedResponse<>(
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

    // Find By ID
    public ResponseWrapper<RegulatoryComplianceMatrixPojo> findById(String id) {
        try {
            RegulatoryComplianceMatrix entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error finding RegulatoryComplianceMatrix by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // Create a New RegulatoryComplianceMatrix
    @Transactional
    public ResponseWrapper<RegulatoryComplianceMatrixPojo> create(@Valid RegulatoryComplianceMatrixDTO dto) {
        try {
            RegulatoryComplianceMatrix entity = mapper.toEntity(dto);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error creating RegulatoryComplianceMatrix", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // Update an Existing RegulatoryComplianceMatrix
    @Transactional
    public ResponseWrapper<RegulatoryComplianceMatrixPojo> update(String id, @Valid RegulatoryComplianceMatrixDTO dto) {
        try {
            RegulatoryComplianceMatrix entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            mapper.updateEntityFromDTO(dto, entity);
            repository.persist(entity);
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error updating RegulatoryComplianceMatrix", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // Delete a RegulatoryComplianceMatrix
    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            RegulatoryComplianceMatrix entity = repository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            repository.delete(entity);
            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error deleting RegulatoryComplianceMatrix", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // Helper method to find or create a report
    private ReportDashboard findOrCreateReport(String code, String name, String payload) {
        ReportDashboard existingReport = reportDashboardRepository.find("code", code).firstResult();

        if (existingReport != null) {
            existingReport.setPayload(payload);
            reportDashboardRepository.persist(existingReport);
            return existingReport;
        } else {
            ReportDashboard newReport = new ReportDashboard();
            newReport.setCode(code);
            newReport.setName(name);
            newReport.setPayload(payload);
            reportDashboardRepository.persist(newReport);
            return newReport;
        }
    }

    // Generate Regulatory Compliance Matrix Report
    @Transactional
    public ResponseWrapper<Object> generateRegulatoryComplianceMatrixReport() {
        try {
            // Get all regulatory compliance matrices
            List<RegulatoryComplianceMatrix> matrices = repository.findAll().list();

            // Convert to POJOs
            List<RegulatoryComplianceMatrixPojo> matrixPojos = matrices.stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());

            // Convert to JSON payload
            String payload = JsonConverter.toJson(matrixPojos);

            // Save report
            findOrCreateReport(REGULATORY_COMPLIANCE_MATRIX_REPORT_CODE, REGULATORY_COMPLIANCE_MATRIX_REPORT_NAME, payload);

            return ResponseHelper.createSuccessResponse(matrixPojos);
        } catch (Exception e) {
            log.error("Error generating Regulatory Compliance Matrix Report", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // Get Regulatory Compliance Matrix Report
    public ResponseWrapper<Object> getRegulatoryComplianceMatrixReport() {
        try {
            ReportDashboard report = reportDashboardRepository.find("code", REGULATORY_COMPLIANCE_MATRIX_REPORT_CODE).firstResult();

            if (report == null) {
                // Generate report if it doesn't exist
                return generateRegulatoryComplianceMatrixReport();
            }

            // Convert payload to object
            Object reportData = JsonConverter.fromJson(report.getPayload(), Object.class);

            return ResponseHelper.createSuccessResponse(reportData);
        } catch (Exception e) {
            log.error("Error getting Regulatory Compliance Matrix Report", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
