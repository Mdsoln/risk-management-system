//package tz.go.psssf.risk.resource;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import io.quarkus.hibernate.orm.panache.PanacheQuery;
//import jakarta.inject.Inject;
//import jakarta.transaction.Transactional;
//import jakarta.ws.rs.Consumes;
//import jakarta.ws.rs.DELETE;
//import jakarta.ws.rs.DefaultValue;
//import jakarta.ws.rs.GET;
//import jakarta.ws.rs.POST;
//import jakarta.ws.rs.PUT;
//import jakarta.ws.rs.Path;
//import jakarta.ws.rs.PathParam;
//import jakarta.ws.rs.Produces;
//import jakarta.ws.rs.QueryParam;
//import jakarta.ws.rs.core.MediaType;
//import tz.go.psssf.risk.dto.SubCategoryDTO;
//import tz.go.psssf.risk.entity.SubCategory;
//import tz.go.psssf.risk.mapper.SubCategoryMapper;
//import tz.go.psssf.risk.response.ResponseWrapper;
//import tz.go.psssf.risk.service.SubCategoryService;
//
//@Path("/subcategories")
//@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_JSON)
//public class SubCategoryResource {
//
//    @Inject
//    SubCategoryService subCategoryService;
//
//    @GET
//    public ResponseWrapper<List<SubCategoryDTO>> listAll(@QueryParam("page") @DefaultValue("0") int page,
//                                                        @QueryParam("size") @DefaultValue("10") int size,
//                                                        @QueryParam("sort") @DefaultValue("name") String sort,
//                                                        @QueryParam("filter") String filter) {
//        PanacheQuery<SubCategory> query = subCategoryService.findWithPaginationSortingFiltering(page, size, sort, filter);
//        List<SubCategoryDTO> subCategories = query.list().stream().map(SubCategoryMapper.INSTANCE::toDTO).collect(Collectors.toList());
//        return new ResponseWrapper<>(200, "Success", subCategories);
//    }
//
//    @GET
//    @Path("{id}")
//    public ResponseWrapper<SubCategoryDTO> findById(@PathParam("id") Long id) {
//        return new ResponseWrapper<>(200, "Success", subCategoryService.findById(id));
//    }
//
//    @POST
//    @Transactional
//    public ResponseWrapper<SubCategoryDTO> create(SubCategoryDTO subCategoryDTO) {
//        return new ResponseWrapper<>(201, "Created", subCategoryService.create(subCategoryDTO));
//    }
//
//    @PUT
//    @Path("{id}")
//    @Transactional
//    public ResponseWrapper<SubCategoryDTO> update(@PathParam("id") Long id, SubCategoryDTO subCategoryDTO) {
//        return new ResponseWrapper<>(200, "Updated", subCategoryService.update(id, subCategoryDTO));
//    }
//
//    @DELETE
//    @Path("{id}")
//    @Transactional
//    public ResponseWrapper<Void> delete(@PathParam("id") Long id) {
//        subCategoryService.delete(id);
//        return new ResponseWrapper<>(204, "Deleted", null);
//    }
//}
