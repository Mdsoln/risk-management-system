package tz.go.psssf.risk.resource;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import tz.go.psssf.risk.dto.RiskIndicatorActionPlanDTO;
import tz.go.psssf.risk.pojo.RiskIndicatorActionPlanPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.RiskIndicatorActionPlanService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/risk-indicator-action-plan")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskIndicatorActionPlanResource {

    @Inject
    RiskIndicatorActionPlanService riskIndicatorActionPlanService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<RiskIndicatorActionPlanPojo> getRiskIndicatorActionPlanById(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskIndicatorActionPlanService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<RiskIndicatorActionPlanPojo> create(@Valid RiskIndicatorActionPlanDTO riskIndicatorActionPlanDTO) {
        try {
            return riskIndicatorActionPlanService.create(riskIndicatorActionPlanDTO);
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
    public ResponseWrapper<RiskIndicatorActionPlanPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskIndicatorActionPlanDTO riskIndicatorActionPlanDTO) {
        try {
            return riskIndicatorActionPlanService.update(id, riskIndicatorActionPlanDTO);
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
            return riskIndicatorActionPlanService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<RiskIndicatorActionPlanPojo>> listAll() {
        try {
            return riskIndicatorActionPlanService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
