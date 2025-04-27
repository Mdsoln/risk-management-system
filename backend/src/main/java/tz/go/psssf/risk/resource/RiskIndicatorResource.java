package tz.go.psssf.risk.resource;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import tz.go.psssf.risk.dto.RiskIndicatorDTO;
import tz.go.psssf.risk.pojo.RiskIndicatorPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.RiskIndicatorService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/risk-indicator")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskIndicatorResource {

    @Inject
    RiskIndicatorService riskIndicatorService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<RiskIndicatorPojo> getRiskIndicatorById(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskIndicatorService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<RiskIndicatorPojo> create(@Valid RiskIndicatorDTO riskIndicatorDTO) {
        try {
            return riskIndicatorService.create(riskIndicatorDTO);
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
    public ResponseWrapper<RiskIndicatorPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskIndicatorDTO riskIndicatorDTO) {
        try {
            return riskIndicatorService.update(id, riskIndicatorDTO);
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
            return riskIndicatorService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<RiskIndicatorPojo>> listAll() {
        try {
            return riskIndicatorService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
