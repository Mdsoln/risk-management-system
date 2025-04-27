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
//
//import tz.go.psssf.risk.dto.RiskIndicatorThresholdDTO;
//import tz.go.psssf.risk.pojo.RiskIndicatorThresholdPojo;
//import tz.go.psssf.risk.response.PaginatedResponse;
//import tz.go.psssf.risk.helper.ResponseHelper;
//import tz.go.psssf.risk.response.ResponseWrapper;
//import tz.go.psssf.risk.service.ThresholdService;
//import tz.go.psssf.risk.validation.ValidPathParam;
//
//@Path("/api/v1/thresholds")
//@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_JSON)
//public class ThresholdResource {
//
//    @Inject
//    ThresholdService thresholdService;
//
//    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;
//
//    @GET
//    @Path("/list")
//    public ResponseWrapper<PaginatedResponse<RiskIndicatorThresholdPojo>> listAll(
//        @QueryParam("page") @DefaultValue("0") int page,
//        @QueryParam("size") @DefaultValue("10") int size,
//        @QueryParam("sort") @DefaultValue("createdAt") List<String> sort,
//        @QueryParam("sortDirection") @DefaultValue("desc") String sortDirection,
//        @QueryParam("searchKeyword") String searchKeyword,
//        @QueryParam("startDate") String startDate,
//        @QueryParam("endDate") String endDate,
//        @QueryParam("filterDateBy") @DefaultValue("createdAt") String filterDateBy) {
//
//        LocalDateTime startDateTime = startDate != null ? LocalDateTime.parse(startDate, DATE_TIME_FORMATTER) : null;
//        LocalDateTime endDateTime = endDate != null ? LocalDateTime.parse(endDate, DATE_TIME_FORMATTER) : null;
//
//        return thresholdService.findWithPaginationSortingFiltering(
//            page, size, sort, sortDirection, searchKeyword, startDateTime, endDateTime, filterDateBy);
//    }
//
//    @GET
//    @Path("/{id}")
//    public ResponseWrapper<RiskIndicatorThresholdPojo> getThresholdById(@ValidPathParam @PathParam("id") String id) {
//        try {
//            return thresholdService.findById(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @POST
//    public ResponseWrapper<RiskIndicatorThresholdPojo> create(@Valid RiskIndicatorThresholdDTO thresholdDTO) {
//        try {
//            return thresholdService.create(thresholdDTO);
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
//    public ResponseWrapper<RiskIndicatorThresholdPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskIndicatorThresholdDTO thresholdDTO) {
//        try {
//            return thresholdService.update(id, thresholdDTO);
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
//            return thresholdService.delete(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @GET
//    @Path("/by-category/{categoryId}")
//    public ResponseWrapper<List<RiskIndicatorThresholdPojo>> listAllByCategory(@PathParam("categoryId") String categoryId) {
//        try {
//            return thresholdService.listAllByCategory(categoryId);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @GET
//    public ResponseWrapper<List<RiskIndicatorThresholdPojo>> listAll() {
//        try {
//            return thresholdService.listAll();
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//}
