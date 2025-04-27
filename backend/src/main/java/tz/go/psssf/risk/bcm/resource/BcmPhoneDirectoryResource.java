package tz.go.psssf.risk.bcm.resource;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.BcmPhoneDirectoryDTO;
import tz.go.psssf.risk.bcm.pojo.BcmPhoneDirectoryPojo;
import tz.go.psssf.risk.bcm.service.BcmPhoneDirectoryService;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Path("/api/v1/bcm/phone-directory")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BcmPhoneDirectoryResource {

    @Inject
    Logger log;

    @Inject
    BcmPhoneDirectoryService service;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    @GET
    @Path("/list")
    public ResponseWrapper<PaginatedResponse<BcmPhoneDirectoryPojo>> listAll(
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
    public ResponseWrapper<BcmPhoneDirectoryPojo> getById(@PathParam("id") String id) {
        return service.findById(id);
    }

    @POST
    public ResponseWrapper<BcmPhoneDirectoryPojo> create(@Valid BcmPhoneDirectoryDTO dto) {
        return service.create(dto);
    }

    @PUT
    @Path("/{id}")
    public ResponseWrapper<BcmPhoneDirectoryPojo> update(@PathParam("id") String id, @Valid BcmPhoneDirectoryDTO dto) {
        return service.update(id, dto);
    }

    @DELETE
    @Path("/{id}")
    public ResponseWrapper<Void> delete(@PathParam("id") String id) {
        return service.delete(id);
    }
}
