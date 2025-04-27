package tz.go.psssf.risk.resource;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import tz.go.psssf.risk.dto.RiskIndicatorActionPlanMonitoringDTO;
import tz.go.psssf.risk.pojo.RiskIndicatorActionPlanMonitoringPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.RiskIndicatorActionPlanMonitoringService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/risk-indicator-action-plan-monitoring")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskIndicatorActionPlanMonitoringResource {

    @Inject
    RiskIndicatorActionPlanMonitoringService riskIndicatorActionPlanMonitoringService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<RiskIndicatorActionPlanMonitoringPojo> getRiskIndicatorActionPlanMonitoringById(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskIndicatorActionPlanMonitoringService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<RiskIndicatorActionPlanMonitoringPojo> create(@Valid RiskIndicatorActionPlanMonitoringDTO riskIndicatorActionPlanMonitoringDTO) {
        try {
            return riskIndicatorActionPlanMonitoringService.create(riskIndicatorActionPlanMonitoringDTO);
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
    public ResponseWrapper<RiskIndicatorActionPlanMonitoringPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskIndicatorActionPlanMonitoringDTO riskIndicatorActionPlanMonitoringDTO) {
        try {
            return riskIndicatorActionPlanMonitoringService.update(id, riskIndicatorActionPlanMonitoringDTO);
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
            return riskIndicatorActionPlanMonitoringService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<RiskIndicatorActionPlanMonitoringPojo>> listAll() {
        try {
            return riskIndicatorActionPlanMonitoringService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
