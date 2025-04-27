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

import tz.go.psssf.risk.dto.RiskAreaDTO;
import tz.go.psssf.risk.pojo.RiskAreaPojo;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.service.RiskAreaService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/risk-area")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskAreaResource {

    @Inject
    RiskAreaService riskAreaService;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    @GET
    @Path("/list")
    public ResponseWrapper<PaginatedResponse<RiskAreaPojo>> listAll(
        @QueryParam("page") @DefaultValue("0") int page,
        @QueryParam("size") @DefaultValue("10") int size,
        @QueryParam("sort") @DefaultValue("createdAt") List < String > sort,
        @QueryParam("sortDirection") @DefaultValue("desc") String sortDirection,
        @QueryParam("searchKeyword") String searchKeyword,
        @QueryParam("startDate") String startDate,
        @QueryParam("endDate") String endDate,
        @QueryParam("filterDateBy") @DefaultValue("createdAt") String filterDateBy) {

        LocalDateTime startDateTime = startDate != null ? LocalDateTime.parse(startDate, DATE_TIME_FORMATTER) : null;
        LocalDateTime endDateTime = endDate != null ? LocalDateTime.parse(endDate, DATE_TIME_FORMATTER) : null;

    return riskAreaService.findWithPaginationSortingFiltering(
        page, size, sort, sortDirection, searchKeyword, startDateTime, endDateTime, filterDateBy);
}

@GET
@Path("/{id}")
public ResponseWrapper < RiskAreaPojo > getRiskAreaById(@ValidPathParam @PathParam("id") String id) {
    try {
        return riskAreaService.findById(id);
    } catch (Exception e) {
        return ResponseHelper.createErrorResponse(e);
    }
}

@POST
public ResponseWrapper < RiskAreaPojo > create(@Valid RiskAreaDTO riskAreaDTO) {
    try {
        return riskAreaService.create(riskAreaDTO);
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
public ResponseWrapper < RiskAreaPojo > update(@ValidPathParam @PathParam("id") String id, @Valid RiskAreaDTO riskAreaDTO) {
    try {
        return riskAreaService.update(id, riskAreaDTO);
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
public ResponseWrapper < Void > delete (@ValidPathParam @PathParam("id") String id) {
    try {
        return riskAreaService.delete(id);
    } catch (Exception e) {
        return ResponseHelper.createErrorResponse(e);
    }
}

@GET
@Path("/by-risk-category/{riskAreaCategoryId}")
public ResponseWrapper < List < RiskAreaPojo >> listAllByRiskAreaCategory(@PathParam("riskAreaCategoryId") String riskAreaCategoryId) {
    try {
        return riskAreaService.listAllByRiskAreaCategory(riskAreaCategoryId);
    } catch (Exception e) {
        return ResponseHelper.createErrorResponse(e);
    }
}

@GET
public ResponseWrapper < List < RiskAreaPojo >> listAll() {
    try {
        return riskAreaService.listAll();
    } catch (Exception e) {
        return ResponseHelper.createErrorResponse(e);
    }
}
}
