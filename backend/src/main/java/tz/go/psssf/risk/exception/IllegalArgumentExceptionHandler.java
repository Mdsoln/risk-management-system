package tz.go.psssf.risk.exception;


import tz.go.psssf.risk.constants.ResponseConstants;
import tz.go.psssf.risk.exception.IllegalArgumentExceptionHandler;
import tz.go.psssf.risk.response.FieldError;
import tz.go.psssf.risk.response.ResponseWrapper;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class IllegalArgumentExceptionHandler implements ExceptionMapper<IllegalArgumentException> {

    @Override
    public Response toResponse(IllegalArgumentException e) {
    	
    	System.err.println("################ IllegalArgumentExceptionHandler");

    	FieldError error = new FieldError("exception", e.getMessage());
        ResponseWrapper<Void> responseWrapper = ResponseWrapper.createWithErrors(
            ResponseConstants.VALIDATION_ERROR_CODE,
            ResponseConstants.VALIDATION_ERROR_MESSAGE,
            null,
            error
        );
        return Response.status(Response.Status.BAD_REQUEST).entity(responseWrapper).build();
    }
}
