package tz.go.psssf.risk.resource;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import tz.go.psssf.risk.dto.ThresholdCategoryDTO;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.pojo.ThresholdCategoryPojo;
import tz.go.psssf.risk.service.ThresholdCategoryService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/threshold-category")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ThresholdCategoryResource {

    @Inject
    ThresholdCategoryService thresholdCategoryService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<ThresholdCategoryPojo> getThresholdCategoryById(@ValidPathParam @PathParam("id") String id) {
        try {
            return thresholdCategoryService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<ThresholdCategoryPojo> create(@Valid ThresholdCategoryDTO thresholdCategoryDTO) {
        try {
            return thresholdCategoryService.create(thresholdCategoryDTO);
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
    public ResponseWrapper<ThresholdCategoryPojo> update(@ValidPathParam @PathParam("id") String id, @Valid ThresholdCategoryDTO thresholdCategoryDTO) {
        try {
            return thresholdCategoryService.update(id, thresholdCategoryDTO);
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
            return thresholdCategoryService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<ThresholdCategoryPojo>> listAll() {
        try {
            return thresholdCategoryService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    @GET
    @Path("/high-and-low")
    public ResponseWrapper<List<ThresholdCategoryPojo>> listAllHighandLow() {
        try {
            return thresholdCategoryService.listAllHighandLow();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
}
