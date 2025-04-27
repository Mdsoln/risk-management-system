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

import tz.go.psssf.risk.dto.MonitoringFrequencyDTO;
import tz.go.psssf.risk.pojo.MonitoringFrequencyPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.MonitoringFrequencyService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/monitoring-frequency")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MonitoringFrequencyResource {

    @Inject
    MonitoringFrequencyService monitoringFrequencyService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<MonitoringFrequencyPojo> getMonitoringFrequencyById(@ValidPathParam @PathParam("id") String id) {
        try {
            return monitoringFrequencyService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<MonitoringFrequencyPojo> create(@Valid MonitoringFrequencyDTO monitoringFrequencyDTO) {
        try {
            return monitoringFrequencyService.create(monitoringFrequencyDTO);
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
    public ResponseWrapper<MonitoringFrequencyPojo> update(@ValidPathParam @PathParam("id") String id, @Valid MonitoringFrequencyDTO monitoringFrequencyDTO) {
        try {
            return monitoringFrequencyService.update(id, monitoringFrequencyDTO);
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
            return monitoringFrequencyService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<MonitoringFrequencyPojo>> listAll() {
        try {
            return monitoringFrequencyService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
	