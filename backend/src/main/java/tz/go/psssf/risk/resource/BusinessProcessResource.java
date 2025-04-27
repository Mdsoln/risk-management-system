package tz.go.psssf.risk.resource;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import tz.go.psssf.risk.dto.BusinessProcessDTO;
import tz.go.psssf.risk.pojo.BusinessProcessPojo;
import tz.go.psssf.risk.pojo.SimplifiedBusinessProcessPojo;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.service.BusinessProcessService;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/business-process")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BusinessProcessResource {

    @Inject
    BusinessProcessService businessProcessService;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    @GET
    @Path("/list")
    public ResponseWrapper<PaginatedResponse<SimplifiedBusinessProcessPojo>> listAll(
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

        return businessProcessService.findWithPaginationSortingFiltering(
                page, size, sort, sortDirection, searchKeyword, startDateTime, endDateTime, filterDateBy);
    }

    @GET
    @Path("/{id}")
    public ResponseWrapper<SimplifiedBusinessProcessPojo> getById(@ValidPathParam @PathParam("id") String id) {
        try {
            return businessProcessService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<BusinessProcessPojo> create(@Valid BusinessProcessDTO businessProcessDTO) {
        try {
            return businessProcessService.create(businessProcessDTO);
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
    public ResponseWrapper<BusinessProcessPojo> update(@ValidPathParam @PathParam("id") String id, @Valid BusinessProcessDTO businessProcessDTO) {
        try {
            return businessProcessService.update(id, businessProcessDTO);
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
            return businessProcessService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    @Path("/by-fund-objective/{fundObjectiveId}")
    public ResponseWrapper<List<SimplifiedBusinessProcessPojo>> listAllByFundObjective(@PathParam("fundObjectiveId") String fundObjectiveId) {
        try {
            return businessProcessService.listAllByFundObjective(fundObjectiveId);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    @Path("/search")
    public ResponseWrapper<List<SimplifiedBusinessProcessPojo>> searchByName(@QueryParam("name") String name) {
        if (name == null || name.trim().isEmpty()) {
            IllegalArgumentException validationException = new IllegalArgumentException("The 'name' parameter is required and cannot be empty.");
            return ResponseHelper.createValidationErrorResponse(validationException);
        }

        try {
            return businessProcessService.searchByName(name);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
