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

import tz.go.psssf.risk.dto.ImpactDTO;
import tz.go.psssf.risk.pojo.ImpactPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.ImpactService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/impact")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ImpactResource {

    @Inject
    ImpactService impactService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<ImpactPojo> getImpactById(@ValidPathParam @PathParam("id") String id) {
        try {
            return impactService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<ImpactPojo> create(@Valid ImpactDTO impactDTO) {
        try {
            return impactService.create(impactDTO);
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
    public ResponseWrapper<ImpactPojo> update(@ValidPathParam @PathParam("id") String id, @Valid ImpactDTO impactDTO) {
        try {
            return impactService.update(id, impactDTO);
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
            return impactService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<ImpactPojo>> listAll() {
        try {
            return impactService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
