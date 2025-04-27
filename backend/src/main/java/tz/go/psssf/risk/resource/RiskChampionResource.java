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

import tz.go.psssf.risk.dto.RiskChampionDTO;
import tz.go.psssf.risk.pojo.RiskChampionPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.RiskChampionService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/risk-champion")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskChampionResource {

    @Inject
    RiskChampionService riskChampionService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<RiskChampionPojo> getChampionById(@ValidPathParam @PathParam("id") String id) {
        try {
            return riskChampionService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<RiskChampionPojo> create(@Valid RiskChampionDTO championDTO) {
        try {
            return riskChampionService.create(championDTO);
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
    public ResponseWrapper<RiskChampionPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskChampionDTO championDTO) {
        try {
            return riskChampionService.update(id, championDTO);
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
            return riskChampionService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<RiskChampionPojo>> listAll() {
        try {
            return riskChampionService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
