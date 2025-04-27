package tz.go.psssf.risk.resource;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import tz.go.psssf.risk.dto.DepartmentDTO;
import tz.go.psssf.risk.pojo.DepartmentPojo;
import tz.go.psssf.risk.pojo.DirectoratePojo;
import tz.go.psssf.risk.pojo.RiskOwnerPojo;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.service.DepartmentService;
import tz.go.psssf.risk.validation.ValidPathParam;

@Path("/api/v1/department")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DepartmentResource {

    @Inject
    DepartmentService departmentService;

    @GET
    @Path("/{id}")
    public ResponseWrapper<DepartmentPojo> getDepartmentById(@ValidPathParam @PathParam("id") String id) {
        try {
            return departmentService.findById(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @POST
    public ResponseWrapper<DepartmentPojo> create(@Valid DepartmentDTO departmentDTO) {
        try {
            return departmentService.create(departmentDTO);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (IllegalArgumentException e) {
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @PUT
    @Path("/{id}")
    public ResponseWrapper<DepartmentPojo> update(@ValidPathParam @PathParam("id") String id, @Valid DepartmentDTO departmentDTO) {
        try {
            return departmentService.update(id, departmentDTO);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (IllegalArgumentException e) {
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @DELETE
    @Path("/{id}")
    public ResponseWrapper<Void> delete(@ValidPathParam @PathParam("id") String id) {
        try {
            return departmentService.delete(id);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    public ResponseWrapper<List<DepartmentPojo>> listAll() {
        try {
            return departmentService.listAll();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @GET
    @Path("/risk-owners")
    public ResponseWrapper<List<DirectoratePojo>> listAllRiskOwners() {
        try {
            return departmentService.listAllDirectoratesWithDepartments();
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
