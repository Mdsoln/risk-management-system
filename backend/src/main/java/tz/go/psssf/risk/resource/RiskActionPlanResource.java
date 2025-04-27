package tz.go.psssf.risk.resource;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import tz.go.psssf.risk.dto.RiskActionPlanDTO;
import tz.go.psssf.risk.pojo.RiskActionPlanPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.RiskActionPlanService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/risk-action-plan")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskActionPlanResource {

    @Inject
    RiskActionPlanService riskActionPlanService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<RiskActionPlanPojo> getRiskActionPlanById(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskActionPlanService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<RiskActionPlanPojo> create(@Valid RiskActionPlanDTO riskActionPlanDTO) {
        try {
            return riskActionPlanService.create(riskActionPlanDTO);
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
    public ResponseWrapper<RiskActionPlanPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskActionPlanDTO riskActionPlanDTO) {
        try {
            return riskActionPlanService.update(id, riskActionPlanDTO);
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
            return riskActionPlanService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<RiskActionPlanPojo>> listAll() {
        try {
            return riskActionPlanService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
