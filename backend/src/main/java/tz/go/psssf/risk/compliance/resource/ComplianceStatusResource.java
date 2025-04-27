package tz.go.psssf.risk.compliance.resource;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.compliance.dto.ComplianceStatusDTO;
import tz.go.psssf.risk.compliance.pojo.ComplianceStatusPojo;
import tz.go.psssf.risk.compliance.service.ComplianceStatusService;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.util.List;

@Path("/api/v1/compliance/status")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ComplianceStatusResource {

    @Inject
    Logger log;

    @Inject
    ComplianceStatusService service;

    /**
     * Get all ComplianceStatuses.
     */
    @GET
    @Path("/list")
    public ResponseWrapper<List<ComplianceStatusPojo>> listAll() {
        return service.findAll();
    }

    /**
     * Get ComplianceStatus by ID.
     */
    @GET
    @Path("/{id}")
    public ResponseWrapper<ComplianceStatusPojo> getById(@PathParam("id") String id) {
        return service.findById(id);
    }

    /**
     * Create ComplianceStatus.
     */
    @POST
    public ResponseWrapper<ComplianceStatusPojo> create(@Valid ComplianceStatusDTO dto) {
        return service.create(dto);
    }

    /**
     * Update ComplianceStatus.
     */
    @PUT
    @Path("/{id}")
    public ResponseWrapper<ComplianceStatusPojo> update(@PathParam("id") String id, @Valid ComplianceStatusDTO dto) {
        return service.update(id, dto);
    }

    /**
     * Delete ComplianceStatus.
     */
    @DELETE
    @Path("/{id}")
    public ResponseWrapper<Void> delete(@PathParam("id") String id) {
        return service.delete(id);
    }
}
