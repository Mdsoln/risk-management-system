package tz.go.psssf.risk.resource;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import tz.go.psssf.risk.dto.FundObjectiveDTO;
import tz.go.psssf.risk.pojo.FundObjectivePojo;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.service.FundObjectiveService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/fund-objective")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FundObjectiveResource {

    @Inject
    FundObjectiveService fundObjectiveService;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    @GET
    @Path("/list")
    public ResponseWrapper<PaginatedResponse<FundObjectivePojo>> listAll(
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

        return fundObjectiveService.findWithPaginationSortingFiltering(
                page, size, sort, sortDirection, searchKeyword, startDateTime, endDateTime, filterDateBy);
    }

    @GET
    @Path("/{id}")
    public ResponseWrapper<FundObjectivePojo> getFundObjectiveById(@ValidPathParam @PathParam("id") String id) {
        try {
            return fundObjectiveService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<FundObjectivePojo> create(@Valid FundObjectiveDTO fundObjectiveDTO) {
        try {
            return fundObjectiveService.create(fundObjectiveDTO);
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
    public ResponseWrapper<FundObjectivePojo> update(@ValidPathParam @PathParam("id") String id, @Valid FundObjectiveDTO fundObjectiveDTO) {
        try {
            return fundObjectiveService.update(id, fundObjectiveDTO);
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
            return fundObjectiveService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    @GET
    @Path("/by-business-process/{businessProcessId}")
    public ResponseWrapper<List<FundObjectivePojo>> listAllByBusinessProcess(@PathParam("businessProcessId") String businessProcessId) {
        try {
            return fundObjectiveService.listAllByBusinessProcess(businessProcessId);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
