package tz.go.psssf.risk.compliance.resource;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.compliance.dto.RegulatoryComplianceMatrixDTO;
import tz.go.psssf.risk.compliance.pojo.RegulatoryComplianceMatrixPojo;
import tz.go.psssf.risk.compliance.service.RegulatoryComplianceMatrixService;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Path("/api/v1/compliance/matrix")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RegulatoryComplianceMatrixResource {

    @Inject
    Logger log;

    @Inject
    RegulatoryComplianceMatrixService service;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    @GET
    @Path("/list")
    public ResponseWrapper<PaginatedResponse<RegulatoryComplianceMatrixPojo>> listAll(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("10") int size,
            @QueryParam("sort") @DefaultValue("createdAt") List<String> sort,
            @QueryParam("sortDirection") @DefaultValue("desc") String sortDirection,
            @QueryParam("searchKeyword") String searchKeyword,
            @QueryParam("startDate") String startDate,
            @QueryParam("endDate") String endDate,
            @QueryParam("filterDateBy") @DefaultValue("createdAt") String filterDateBy) {

        LocalDateTime startDateTime = startDate != null ? LocalDateTime.parse(startDate, DATE_TIME_FORMATTER) : null;
        LocalDateTime endDateTime = endDate != null ? LocalDateTime.parse(endDate, DATE_TIME_FORMATTER) : null;

        return service.findWithPaginationSortingFiltering(
                page, size, sort, sortDirection, searchKeyword, startDateTime, endDateTime, filterDateBy);
    }

    @GET
    @Path("/{id}")
    public ResponseWrapper<RegulatoryComplianceMatrixPojo> getById(@PathParam("id") String id) {
        return service.findById(id);
    }

    @POST
    public ResponseWrapper<RegulatoryComplianceMatrixPojo> create(@Valid RegulatoryComplianceMatrixDTO dto) {
        return service.create(dto);
    }

    @PUT
    @Path("/{id}")
    public ResponseWrapper<RegulatoryComplianceMatrixPojo> update(@PathParam("id") String id, @Valid RegulatoryComplianceMatrixDTO dto) {
        return service.update(id, dto);
    }

    @DELETE
    @Path("/{id}")
    public ResponseWrapper<Void> delete(@PathParam("id") String id) {
        return service.delete(id);
    }

    @GET
    @Path("/report")
    public ResponseWrapper<Object> getReport() {
        return service.getRegulatoryComplianceMatrixReport();
    }

    @POST
    @Path("/report/generate")
    public ResponseWrapper<Object> generateReport() {
        return service.generateRegulatoryComplianceMatrixReport();
    }
}
