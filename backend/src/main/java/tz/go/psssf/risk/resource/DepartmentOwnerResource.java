//package tz.go.psssf.risk.resource;
//
//import jakarta.inject.Inject;
//import jakarta.validation.ConstraintViolationException;
//import jakarta.validation.Valid;
//import jakarta.ws.rs.*;
//import jakarta.ws.rs.core.MediaType;
//
//import tz.go.psssf.risk.dto.DepartmentOwnerDTO;
//import tz.go.psssf.risk.pojo.DepartmentOwnerPojo;
//import tz.go.psssf.risk.response.ResponseWrapper;
//import tz.go.psssf.risk.helper.ResponseHelper;
//import tz.go.psssf.risk.service.DepartmentOwnerService;
//import tz.go.psssf.risk.validation.ValidPathParam;
//
//import java.util.List;
//
//@Path("/api/v1/department-owner")
//@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_JSON)
//public class DepartmentOwnerResource {
//
//    @Inject
//    DepartmentOwnerService departmentOwnerService;
//
//    @GET
//    @Path("/{id}")
//    public ResponseWrapper<DepartmentOwnerPojo> getDepartmentOwnerById(@ValidPathParam @PathParam("id") String id) {
//        try {
//            return departmentOwnerService.findById(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @POST
//    public ResponseWrapper<DepartmentOwnerPojo> create(@Valid DepartmentOwnerDTO departmentOwnerDTO) {
//        try {
//            return departmentOwnerService.create(departmentOwnerDTO);
//        } catch (ConstraintViolationException e) {
//            return ResponseHelper.createConstraintViolationErrorResponse(e);
//        } catch (IllegalArgumentException e) {
//            return ResponseHelper.createValidationErrorResponse(e);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//    
//    @PUT
//    @Path("/{id}")
//    public ResponseWrapper<DepartmentOwnerPojo> update(@ValidPathParam @PathParam("id") String id, @Valid DepartmentOwnerDTO departmentOwnerDTO) {
//        try {
//            return departmentOwnerService.update(id, departmentOwnerDTO);
//        } catch (ConstraintViolationException e) {
//            return ResponseHelper.createConstraintViolationErrorResponse(e);
//        } catch (IllegalArgumentException e) {
//            return ResponseHelper.createValidationErrorResponse(e);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//    
//    @DELETE
//    @Path("/{id}")
//    public ResponseWrapper<Void> delete(@ValidPathParam @PathParam("id") String id) {
//        try {
//            return departmentOwnerService.delete(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @GET
//    public ResponseWrapper<List<DepartmentOwnerPojo>> listAll() {
//        try {
//            return departmentOwnerService.listAll();
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//}
