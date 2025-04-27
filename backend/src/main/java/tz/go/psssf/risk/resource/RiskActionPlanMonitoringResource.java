package tz.go.psssf.risk.resource;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import tz.go.psssf.risk.dto.RiskActionPlanMonitoringDTO;
import tz.go.psssf.risk.pojo.RiskActionPlanMonitoringPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.RiskActionPlanMonitoringService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/risk-action-plan-monitoring")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskActionPlanMonitoringResource {

    @Inject
    RiskActionPlanMonitoringService riskActionPlanMonitoringService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<RiskActionPlanMonitoringPojo> getRiskActionPlanMonitoringById(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskActionPlanMonitoringService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<RiskActionPlanMonitoringPojo> create(@Valid RiskActionPlanMonitoringDTO riskActionPlanMonitoringDTO) {
        try {
            return riskActionPlanMonitoringService.create(riskActionPlanMonitoringDTO);
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
    public ResponseWrapper<RiskActionPlanMonitoringPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskActionPlanMonitoringDTO riskActionPlanMonitoringDTO) {
        try {
            return riskActionPlanMonitoringService.update(id, riskActionPlanMonitoringDTO);
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
            return riskActionPlanMonitoringService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<RiskActionPlanMonitoringPojo>> listAll() {
        try {
            return riskActionPlanMonitoringService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
