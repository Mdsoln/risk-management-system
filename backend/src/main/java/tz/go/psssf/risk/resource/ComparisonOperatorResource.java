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

import tz.go.psssf.risk.dto.ComparisonOperatorDTO;
import tz.go.psssf.risk.pojo.ComparisonOperatorPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.ComparisonOperatorService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/comparison-operator")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ComparisonOperatorResource {

    @Inject
    ComparisonOperatorService comparisonOperatorService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<ComparisonOperatorPojo> getComparisonOperatorById(@ValidPathParam @PathParam("id") String id) {
        try {
            return comparisonOperatorService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<ComparisonOperatorPojo> create(@Valid ComparisonOperatorDTO comparisonOperatorDTO) {
        try {
            return comparisonOperatorService.create(comparisonOperatorDTO);
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
    public ResponseWrapper<ComparisonOperatorPojo> update(@ValidPathParam @PathParam("id") String id, @Valid ComparisonOperatorDTO comparisonOperatorDTO) {
        try {
            return comparisonOperatorService.update(id, comparisonOperatorDTO);
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
            return comparisonOperatorService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<ComparisonOperatorPojo>> listAll() {
        try {
            return comparisonOperatorService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}

