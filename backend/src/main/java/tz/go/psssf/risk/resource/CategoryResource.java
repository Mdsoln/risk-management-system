//package tz.go.psssf.risk.resource;
//
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//
//import io.quarkus.hibernate.orm.panache.PanacheQuery;
//import jakarta.inject.Inject;
//import jakarta.validation.Valid;
//import jakarta.validation.Validator;
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
//import jakarta.ws.rs.core.Response;
//import tz.go.psssf.risk.dto.CategoryDTO;
//import tz.go.psssf.risk.entity.Category;
//import tz.go.psssf.risk.helper.PaginationHelper;
//import tz.go.psssf.risk.response.PaginatedResponse;
//import tz.go.psssf.risk.response.ResponseWrapper;
//import tz.go.psssf.risk.service.CategoryService;
//import tz.go.psssf.risk.validation.ValidPathParam;
//
//@Path("/api/v1/categories")
//@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_JSON)
//public class CategoryResource {
//
//	@Inject
//	CategoryService categoryService;
//
//	@Inject
//	Validator validator;
//
//	@GET
//	public Response listAll(@QueryParam("page") @DefaultValue("0") int page,
//			@QueryParam("size") @DefaultValue("10") int size, @QueryParam("sort") @DefaultValue("name") String sort,
//			@QueryParam("searchKeyword") String searchKeyword,
//			@QueryParam("sortDirection") @DefaultValue("asc") String sortDirection,
//			@QueryParam("startDate") String startDateStr, @QueryParam("endDate") String endDateStr,
//			@QueryParam("dateField") @DefaultValue("createdAt") String dateField) {
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//		LocalDateTime startDate = startDateStr != null ? LocalDateTime.parse(startDateStr, formatter) : null;
//		LocalDateTime endDate = endDateStr != null ? LocalDateTime.parse(endDateStr, formatter) : null;
//
//		PanacheQuery<Category> query = categoryService.findWithPaginationSortingFiltering(page, size, sort,
//				searchKeyword, sortDirection, startDate, endDate, dateField);
//		PaginatedResponse<Category> paginatedResponse = PaginationHelper.toPageInfo(query);
//		return Response.status(Response.Status.OK).entity(paginatedResponse).build();
//	}
//
////	@GET
////	@Path("/list")
////	public ResponseWrapper<List<Category>> getAllCategories() {
////		List<Category> categories = categoryService.findAll();
////		return new ResponseWrapper<>(200, "Success", categories);
////	}
//
////	@GET
////	@Path("/{id}")
////	public Response getCategoryById(@ValidPathParam @PathParam("id") String id) {
////		ResponseWrapper<Category> response = categoryService.findById(id);
////		return Response.status(Response.Status.OK).entity(response).build();
////	}
////
////	@POST
////	public Response createCategory(@Valid CategoryDTO categoryDTO) {
////		ResponseWrapper<Category> response = categoryService.create(categoryDTO);
////		return Response.status(Response.Status.OK).entity(response).build();
////
////	}
////
////	@PUT
////	@Path("/{id}")
////	public Response updateCategory(@ValidPathParam @PathParam("id") String id, @Valid CategoryDTO categoryDTO) {
////		ResponseWrapper<Category> response = categoryService.update(id, categoryDTO);
////		return Response.status(Response.Status.OK).entity(response).build();
////	}
////
////	@DELETE
////	@Path("/{id}")
////	public Response deleteCategory(@PathParam("id") String id) {
////		ResponseWrapper<Category> response = categoryService.delete(id);
////		return Response.status(Response.Status.OK).entity(response).build();
////	}
//
//}
