package tz.go.psssf.risk.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import tz.go.psssf.risk.entity.RiskStatus;
import tz.go.psssf.risk.service.RiskStatusService;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.util.List;

@Path("/api/v1/risk-statuses")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskStatusResource {

    @Inject
    RiskStatusService riskStatusService;

    @GET
    public ResponseWrapper<List<RiskStatus>> getAllRiskStatuses() {
        return riskStatusService.listAll();
    }

    @GET
    @Path("/type/{type}")
    public ResponseWrapper<List<RiskStatus>> getRiskStatusesByType(@PathParam("type") String type) {
        return riskStatusService.listByType(type);
    }
}
