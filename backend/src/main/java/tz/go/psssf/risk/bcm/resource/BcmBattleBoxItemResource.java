package tz.go.psssf.risk.bcm.resource;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.BcmBattleBoxItemDTO;
import tz.go.psssf.risk.bcm.pojo.BcmBattleBoxItemPojo;
import tz.go.psssf.risk.bcm.service.BcmBattleBoxItemService;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Path("/api/v1/bcm/battle-box-item")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BcmBattleBoxItemResource {

    @Inject
    Logger log;

    @Inject
    BcmBattleBoxItemService service;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    /**
     * Get paginated list of Battle Box Items
     */
    @GET
    @Path("/list")
    public ResponseWrapper<PaginatedResponse<BcmBattleBoxItemPojo>> listAll(
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

    /**
     * Get Battle Box Item by ID
     */
    @GET
    @Path("/{id}")
    public ResponseWrapper<BcmBattleBoxItemPojo> getById(@PathParam("id") String id) {
        return service.findById(id);
    }

    /**
     * Create a new Battle Box Item
     */
    @POST
    public ResponseWrapper<BcmBattleBoxItemPojo> create(@Valid BcmBattleBoxItemDTO dto) {
        return service.create(dto);
    }

    /**
     * Update an existing Battle Box Item
     */
    @PUT
    @Path("/{id}")
    public ResponseWrapper<BcmBattleBoxItemPojo> update(@PathParam("id") String id, @Valid BcmBattleBoxItemDTO dto) {
        return service.update(id, dto);
    }

    /**
     * Delete a Battle Box Item by ID
     */
    @DELETE
    @Path("/{id}")
    public ResponseWrapper<Void> delete(@PathParam("id") String id) {
        return service.delete(id);
    }
}
