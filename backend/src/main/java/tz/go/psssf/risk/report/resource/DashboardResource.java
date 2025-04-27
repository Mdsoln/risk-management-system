package tz.go.psssf.risk.report.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.report.pojo.ReportDashboardPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.report.service.DashboardService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/dashboard")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DashboardResource {

    @Inject
    DashboardService dashboardService;

    @GET
    @Path("/report/{code}")
    public ResponseWrapper<ReportDashboardPojo> getReportByCode( @PathParam("code") String code) {
        try {
            return dashboardService.findByCode(code);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}