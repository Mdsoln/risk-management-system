package tz.go.psssf.risk.resource;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import tz.go.psssf.risk.dto.StatusTypeDTO;
import tz.go.psssf.risk.pojo.StatusTypePojo;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.service.StatusTypeService;

import java.util.List;

@Path("/api/v1/status-types")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StatusTypeResource {

    @Inject
    StatusTypeService statusTypeService;

    @GET
    @Path("/list")
    public ResponseWrapper<List<StatusTypePojo>> listAll() {
        try {
            return statusTypeService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    @Path("/{id}")
    public ResponseWrapper<StatusTypePojo> getById(@PathParam("id") String id) {
        try {
            return statusTypeService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    @Path("/type/{type}")
    public ResponseWrapper<List<StatusTypePojo>> listByType(@PathParam("type") String type) {
        try {
            return statusTypeService.listByType(type);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<StatusTypePojo> create(@Valid StatusTypeDTO statusTypeDTO) {
        try {
            return statusTypeService.create(statusTypeDTO);
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
    public ResponseWrapper<StatusTypePojo> update(@PathParam("id") String id, @Valid StatusTypeDTO statusTypeDTO) {
        try {
            return statusTypeService.update(id, statusTypeDTO);
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
    public ResponseWrapper<Void> delete(@PathParam("id") String id) {
        try {
            return statusTypeService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
