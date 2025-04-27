package tz.go.psssf.risk.bcm.resource;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.BcmUrgentResourceDTO;
import tz.go.psssf.risk.bcm.pojo.BcmUrgentResourcePojo;
import tz.go.psssf.risk.bcm.service.BcmUrgentResourceService;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Path("/api/v1/bcm/urgent-resource")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BcmUrgentResourceResource {

    @Inject
    Logger log;

    @Inject
    BcmUrgentResourceService service;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    @GET
    @Path("/list")
    public ResponseWrapper<PaginatedResponse<BcmUrgentResourcePojo>> listAll(
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
    public ResponseWrapper<BcmUrgentResourcePojo> getById(@PathParam("id") String id) {
        return service.findById(id);
    }

    @POST
    public ResponseWrapper<BcmUrgentResourcePojo> create(@Valid BcmUrgentResourceDTO dto) {
        return service.create(dto);
    }

    @PUT
    @Path("/{id}")
    public ResponseWrapper<BcmUrgentResourcePojo> update(@PathParam("id") String id, @Valid BcmUrgentResourceDTO dto) {
        return service.update(id, dto);
    }

    @DELETE
    @Path("/{id}")
    public ResponseWrapper<Void> delete(@PathParam("id") String id) {
        return service.delete(id);
    }
}
