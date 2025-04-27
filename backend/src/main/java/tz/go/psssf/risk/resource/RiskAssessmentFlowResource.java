//package tz.go.psssf.risk.resource;
//
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//
//import jakarta.inject.Inject;
//import jakarta.validation.ConstraintViolationException;
//import jakarta.validation.Valid;
//import jakarta.ws.rs.*;
//import jakarta.ws.rs.core.MediaType;
//import tz.go.psssf.risk.dto.RiskAssessmentFlowDTO;
//import tz.go.psssf.risk.pojo.RiskAssessmentFlowPojo;
//import tz.go.psssf.risk.helper.ResponseHelper;
//import tz.go.psssf.risk.response.PaginatedResponse;
//import tz.go.psssf.risk.response.ResponseWrapper;
//import tz.go.psssf.risk.service.RiskAssessmentFlowService;
//import tz.go.psssf.risk.validation.ValidPathParam;
//
//@Path("/api/v1/risk-assessment-flow")
//@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_JSON)
//public class RiskAssessmentFlowResource {
//
//    @Inject
//    RiskAssessmentFlowService riskAssessmentFlowService;
//
//    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;
//
//    @GET
//    @Path("/list")
//    public ResponseWrapper<PaginatedResponse<RiskAssessmentFlowPojo>> listAll(
//            @QueryParam("page") @DefaultValue("0") int page,
//            @QueryParam("size") @DefaultValue("10") int size,
//            @QueryParam("sort") @DefaultValue("createdAt") List<String> sort,
//            @QueryParam("sortDirection") @DefaultValue("desc") String sortDirection,
//            @QueryParam("searchKeyword") String searchKeyword,
//            @QueryParam("startDate") String startDate,
//            @QueryParam("endDate") String endDate,
//            @QueryParam("filterDateBy") @DefaultValue("createdAt") String filterDateBy) {
//
//        LocalDateTime startDateTime = startDate != null ? LocalDateTime.parse(startDate, DATE_TIME_FORMATTER) : null;
//        LocalDateTime endDateTime = endDate != null ? LocalDateTime.parse(endDate, DATE_TIME_FORMATTER) : null;
//
//        return riskAssessmentFlowService.findWithPaginationSortingFiltering(
//                page, size, sort, sortDirection, searchKeyword, startDateTime, endDateTime, filterDateBy);
//    }
//
//    @GET
//    @Path("/{id}")
//    public ResponseWrapper<RiskAssessmentFlowPojo> getById(@ValidPathParam @PathParam("id") String id) {
//        try {
//            return riskAssessmentFlowService.findById(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @POST
//    public ResponseWrapper<RiskAssessmentFlowPojo> create(@Valid RiskAssessmentFlowDTO riskAssessmentFlowDTO) {
//        try {
//            return riskAssessmentFlowService.create(riskAssessmentFlowDTO);
//        } catch (ConstraintViolationException e) {
//            return ResponseHelper.createConstraintViolationErrorResponse(e);
//        } catch (IllegalArgumentException e) {
//            return ResponseHelper.createValidationErrorResponse(e);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @PUT
//    @Path("/{id}")
//    public ResponseWrapper<RiskAssessmentFlowPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskAssessmentFlowDTO riskAssessmentFlowDTO) {
//        try {
//            return riskAssessmentFlowService.update(id, riskAssessmentFlowDTO);
//        } catch (ConstraintViolationException e) {
//            return ResponseHelper.createConstraintViolationErrorResponse(e);
//        } catch (IllegalArgumentException e) {
//            return ResponseHelper.createValidationErrorResponse(e);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @DELETE
//    @Path("/{id}")
//    public ResponseWrapper<Void> delete(@ValidPathParam @PathParam("id") String id) {
//        try {
//            return riskAssessmentFlowService.delete(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//    
//    @GET
//    @Path("/list-all")
//    public ResponseWrapper<List<RiskAssessmentFlowPojo>> listAll() {
//        try {
//            return riskAssessmentFlowService.listAll();
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//}
