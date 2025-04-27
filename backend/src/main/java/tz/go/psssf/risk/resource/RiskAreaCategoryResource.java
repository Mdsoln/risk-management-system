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

import tz.go.psssf.risk.dto.RiskAreaCategoryDTO;
import tz.go.psssf.risk.pojo.RiskAreaCategoryPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.RiskAreaCategoryService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/risk-area-category")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskAreaCategoryResource {

    @Inject
    RiskAreaCategoryService riskAreaCategoryService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<RiskAreaCategoryPojo> getRiskAreaCategoryById(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskAreaCategoryService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<RiskAreaCategoryPojo> create(@Valid RiskAreaCategoryDTO riskAreaCategoryDTO) {
        try {
            return riskAreaCategoryService.create(riskAreaCategoryDTO);
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
    public ResponseWrapper<RiskAreaCategoryPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskAreaCategoryDTO riskAreaCategoryDTO) {
        try {
            return riskAreaCategoryService.update(id, riskAreaCategoryDTO);
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
            return riskAreaCategoryService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<RiskAreaCategoryPojo>> listAll() {
        try {
            return riskAreaCategoryService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
