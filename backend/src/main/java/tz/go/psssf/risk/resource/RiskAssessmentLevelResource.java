package tz.go.psssf.risk.resource;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import tz.go.psssf.risk.dto.RiskAssessmentLevelDTO;
import tz.go.psssf.risk.pojo.RiskAssessmentLevelPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.service.RiskAssessmentLevelService;

@Path("/api/v1/risk-assessment-level")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RiskAssessmentLevelResource {

    @Inject
    RiskAssessmentLevelService riskAssessmentLevelService;

    @GET
    public ResponseWrapper<List<RiskAssessmentLevelPojo>> listAll() {
        return riskAssessmentLevelService.listAll();
    }

    @GET
    @Path("/{id}")
    public ResponseWrapper<RiskAssessmentLevelPojo> getById(@PathParam("id") String id) {
        return riskAssessmentLevelService.findById(id);
    }

    @POST
    public ResponseWrapper<RiskAssessmentLevelPojo> create(@Valid RiskAssessmentLevelDTO dto) {
        return riskAssessmentLevelService.create(dto);
    }

    @PUT
    @Path("/{id}")
    public ResponseWrapper<RiskAssessmentLevelPojo> update(@PathParam("id") String id, @Valid RiskAssessmentLevelDTO dto) {
        return riskAssessmentLevelService.update(id, dto);
    }

    @DELETE
    @Path("/{id}")
    public ResponseWrapper<Void> delete(@PathParam("id") String id) {
        return riskAssessmentLevelService.delete(id);
    }
}
