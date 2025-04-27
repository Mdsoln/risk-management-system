package tz.go.psssf.risk.resource;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import tz.go.psssf.risk.dto.RiskActionPlanMonitoringDTO;
import tz.go.psssf.risk.dto.RiskAssessmentHistoryDTO;
import tz.go.psssf.risk.dto.RiskDTO;
import tz.go.psssf.risk.pojo.RiskPojo;
import tz.go.psssf.risk.pojo.RiskWithActionPlansPojo;
import tz.go.psssf.risk.pojo.SimplifiedListRiskPojo;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.service.RiskService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/risk")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskResource {

    @Inject
    RiskService riskService;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    @GET
    @Path("/list")
    public ResponseWrapper<PaginatedResponse<RiskPojo>> listAll(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("10") int size,
            @QueryParam("sort") @DefaultValue("createdAt") List<String> sort,
            @QueryParam("sortDirection") @DefaultValue("desc") String sortDirection,
            @QueryParam("searchKeyword") String searchKeyword,
            @QueryParam("startDate") String startDate,
            @QueryParam("endDate") String endDate,
            @QueryParam("filterDateBy") @DefaultValue("createdAt") String filterDateBy) {

        LocalDateTime startDateTime = startDate != null ? LocalDateTime.parse(startDate, DATE_TIME_FORMATTER) : null;
        LocalDateTime endDateTime = endDate != null ? LocalDateTime.parse(endDate, DATE_TIME_FORMATTER) : null;

        return riskService.findWithPaginationSortingFiltering(
                page, size, sort, sortDirection, searchKeyword, startDateTime, endDateTime, filterDateBy);
    }

    @GET
    @Path("/{id}")
    public ResponseWrapper<RiskPojo> getById(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<RiskPojo> create(@Valid RiskDTO riskDTO) {
        try {
            return riskService.create(riskDTO);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (IllegalArgumentException e) {
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @PUT
    @Path("/{id}")
    public ResponseWrapper<RiskPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskDTO riskDTO) {
        try {
            return riskService.update(id, riskDTO);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (IllegalArgumentException e) {
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @DELETE
    @Path("/{id}")
    public ResponseWrapper<Void> delete(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    @GET
    @Path("/by-business-process/{businessProcessId}")
    public ResponseWrapper<List<RiskPojo>> listAllByBusinessProcess(@PathParam("businessProcessId") String businessProcessId) {
        try {
            return riskService.listAllByBusinessProcess(businessProcessId);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    
    @PUT
    @Path("/submit-for-assessment/{id}")
    public ResponseWrapper<RiskPojo> submitForAssessment(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskService.submitForAssessment(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    
    @PUT
    @Path("/department-owner-risk-assessment/{id}")
    public ResponseWrapper<RiskPojo> DepartmentOwnerReviewRisk(@PathParam("id") String id, RiskAssessmentHistoryDTO riskAssessmentHistoryDTO) {
        return riskService.DepartmentOwnerReviewRisk(id, riskAssessmentHistoryDTO);
    }
    
    @GET
    @Path("/ready-for-monitoring")
    public ResponseWrapper<List<RiskWithActionPlansPojo>> allRiskReadyForRiskActionPlanMonitoring() {
        return riskService.allRiskReadyForRiskActionPlanMonitoring();
    }


    
    @POST
    @Path("/risk-action-plan-monitoring-reporting")
    public ResponseWrapper<Void> riskActionPlanMonitoringReporting(List<RiskActionPlanMonitoringDTO> monitoringData) {
    	
    	System.out.println("############################");
    	System.out.println("############################");
    	System.out.println("############################");
    	System.out.println("############################");
    	System.out.println("############################");
    	System.out.println("############################");
    	System.out.println("############################");
    	System.out.println("############################");
    	System.out.println("############################");
        return riskService.riskActionPlanMonitoringReporting(monitoringData);
    }



}
