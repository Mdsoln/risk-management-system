//package tz.go.psssf.risk.resource;
//
//import java.util.List;
//
//import jakarta.inject.Inject;
//import jakarta.validation.ConstraintViolationException;
//import jakarta.validation.Valid;
//import jakarta.ws.rs.Consumes;
//import jakarta.ws.rs.DELETE;
//import jakarta.ws.rs.GET;
//import jakarta.ws.rs.POST;
//import jakarta.ws.rs.PUT;
//import jakarta.ws.rs.Path;
//import jakarta.ws.rs.PathParam;
//import jakarta.ws.rs.Produces;
//import jakarta.ws.rs.core.MediaType;
//
//import tz.go.psssf.risk.dto.ControlIndicatorDTO;
//import tz.go.psssf.risk.pojo.ControlIndicatorPojo;
//import tz.go.psssf.risk.response.ResponseWrapper;
//import tz.go.psssf.risk.helper.ResponseHelper;
//import tz.go.psssf.risk.service.ControlIndicatorService;
//import tz.go.psssf.risk.validation.ValidPathParam;
//
//@Path("/api/v1/control-indicator")
//@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_JSON)
//public class ControlIndicatorResource {
//
//    @Inject
//    ControlIndicatorService controlIndicatorService;
//
//    @GET
//    @Path("/{id}")
//    public ResponseWrapper<ControlIndicatorPojo> getControlIndicatorById(@ValidPathParam @PathParam("id") String id) {
//        try {
//            return controlIndicatorService.findById(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @POST
//    public ResponseWrapper<ControlIndicatorPojo> create(@Valid ControlIndicatorDTO controlIndicatorDTO) {
//        try {
//            return controlIndicatorService.create(controlIndicatorDTO);
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
//    public ResponseWrapper<ControlIndicatorPojo> update(@ValidPathParam @PathParam("id") String id, @Valid ControlIndicatorDTO controlIndicatorDTO) {
//        try {
//            return controlIndicatorService.update(id, controlIndicatorDTO);
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
//            return controlIndicatorService.delete(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @GET
//    public ResponseWrapper<List<ControlIndicatorPojo>> listAll() {
//        try {
//            return controlIndicatorService.listAll();
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//}
