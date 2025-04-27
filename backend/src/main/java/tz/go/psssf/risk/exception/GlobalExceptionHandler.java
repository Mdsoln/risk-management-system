package tz.go.psssf.risk.exception;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class GlobalExceptionHandler implements ExceptionMapper<Throwable> {

    @Override
    public Response toResponse(Throwable exception) {
        // Create a custom error response object
        ErrorResponse errorResponse = new ErrorResponse(
            Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(),
            "An unexpected error occurred",
            exception.getMessage()
        );

        // Return the response as JSON
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(errorResponse)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }

    public static class ErrorResponse {
        private int status;
        private String error;
        private String message;

        public ErrorResponse(int status, String error, String message) {
            this.status = status;
            this.error = error;
            this.message = message;
        }

        // Getters and setters omitted for brevity
    }
}

