package tz.go.psssf.risk.bcm.resource;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.BcmResourceAcquisitionDTO;
import tz.go.psssf.risk.bcm.pojo.BcmResourceAcquisitionPojo;
import tz.go.psssf.risk.bcm.service.BcmResourceAcquisitionService;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Path("/api/v1/bcm/resource-acquisition")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BcmResourceAcquisitionResource {

    @Inject
    Logger log;

    @Inject
    BcmResourceAcquisitionService service;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    /**
     * List all resource acquisitions with pagination, sorting, and filtering.
     */
    @GET
    @Path("/list")
    public ResponseWrapper<PaginatedResponse<BcmResourceAcquisitionPojo>> listAll(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("10") int size,
            @QueryParam("sort") @DefaultValue("createdAt") List<String> sort,
            @QueryParam("sortDirection") @DefaultValue("desc") String sortDirection,
            @QueryParam("searchKeyword") String searchKeyword,
            @QueryParam("startDate") String startDate,
            @QueryParam("endDate") String endDate,
            @QueryParam("filterDateBy") @DefaultValue("createdAt") String filterDateBy) {

        // Parse start and end dates if provided
        LocalDateTime startDateTime = (startDate != null && !startDate.isBlank()) 
                                      ? LocalDateTime.parse(startDate, DATE_TIME_FORMATTER) : null;
        LocalDateTime endDateTime = (endDate != null && !endDate.isBlank())
                                    ? LocalDateTime.parse(endDate, DATE_TIME_FORMATTER) : null;

        // Fetch data with filtering
        return service.findWithPaginationSortingFiltering(
                page, size, sort, sortDirection, searchKeyword, startDateTime, endDateTime, filterDateBy);
    }

    /**
     * Get a single resource acquisition by ID.
     */
    @GET
    @Path("/{id}")
    public ResponseWrapper<BcmResourceAcquisitionPojo> getById(@PathParam("id") String id) {
        return service.findById(id);
    }

    /**
     * Create a new resource acquisition.
     */
    @POST
    public ResponseWrapper<BcmResourceAcquisitionPojo> create(@Valid BcmResourceAcquisitionDTO dto) {
        log.infof("Creating Resource Acquisition: %s", dto);
        return service.create(dto);
    }

    /**
     * Update an existing resource acquisition.
     */
    @PUT
    @Path("/{id}")
    public ResponseWrapper<BcmResourceAcquisitionPojo> update(
            @PathParam("id") String id, @Valid BcmResourceAcquisitionDTO dto) {
        log.infof("Updating Resource Acquisition with ID: %s", id);
        return service.update(id, dto);
    }

    /**
     * Delete a resource acquisition by ID.
     */
    @DELETE
    @Path("/{id}")
    public ResponseWrapper<Void> delete(@PathParam("id") String id) {
        log.infof("Deleting Resource Acquisition with ID: %s", id);
        return service.delete(id);
    }
}
