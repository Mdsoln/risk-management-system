package tz.go.psssf.risk.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import tz.go.psssf.risk.constants.ResponseConstants;
import tz.go.psssf.risk.response.FieldError;
import tz.go.psssf.risk.response.ResponseWrapper;

@Provider
public class ValidationExceptionHandler implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException e) {
        System.err.println("################ ValidationExceptionHandler");
        FieldError[] errors = e.getConstraintViolations().stream()
            .map(violation -> new FieldError(extractPropertyName(violation.getPropertyPath().toString()), violation.getMessage()))
            .toArray(FieldError[]::new);
        ResponseWrapper<Void> responseWrapper = ResponseWrapper.createWithErrors(
            ResponseConstants.VALIDATION_ERROR_CODE,
            ResponseConstants.VALIDATION_ERROR_MESSAGE,
            null,
            errors
        );
        return Response.status(Response.Status.BAD_REQUEST).entity(responseWrapper).build();
    }

    private String extractPropertyName(String propertyPath) {
        String[] parts = propertyPath.split("\\.");
        return parts[parts.length - 1];
    }
}
