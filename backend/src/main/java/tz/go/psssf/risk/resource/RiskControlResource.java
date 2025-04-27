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
//import tz.go.psssf.risk.dto.RiskControlDTO;
//import tz.go.psssf.risk.pojo.RiskControlPojo;
//import tz.go.psssf.risk.response.ResponseWrapper;
//import tz.go.psssf.risk.helper.ResponseHelper;
//import tz.go.psssf.risk.service.RiskControlService;
//import tz.go.psssf.risk.validation.ValidPathParam;
//
//@Path("/api/v1/risk-control")
//@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_JSON)
//public class RiskControlResource {
//
//    @Inject
//    RiskControlService riskControlService;
//
//    @GET
//    @Path("/{id}")
//    public ResponseWrapper<RiskControlPojo> getRiskControlById(@ValidPathParam @PathParam("id") String id) {
//        try {
//            return riskControlService.findById(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @POST
//    public ResponseWrapper<RiskControlPojo> create(@Valid RiskControlDTO riskControlDTO) {
//        try {
//            return riskControlService.create(riskControlDTO);
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
//    public ResponseWrapper<RiskControlPojo> update(@ValidPathParam @PathParam("id") String id, @Valid RiskControlDTO riskControlDTO) {
//        try {
//            return riskControlService.update(id, riskControlDTO);
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
//            return riskControlService.delete(id);
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//
//    @GET
//    public ResponseWrapper<List<RiskControlPojo>> listAll() {
//        try {
//            return riskControlService.listAll();
//        } catch (Exception e) {
//            return ResponseHelper.createErrorResponse(e);
//        }
//    }
//}
