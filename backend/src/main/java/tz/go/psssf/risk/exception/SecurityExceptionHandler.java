package tz.go.psssf.risk.exception;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import io.quarkus.security.ForbiddenException;
import io.quarkus.security.UnauthorizedException;

@Provider
public class SecurityExceptionHandler implements ExceptionMapper<RuntimeException> {

    @Override
    public Response toResponse(RuntimeException exception) {
    	System.out.println("################################################");
    	System.out.println("######## SecurityExceptionHandler -> toResponse");
    	System.out.println("################################################");
    	
        if (exception instanceof ForbiddenException) {
            return Response.status(Response.Status.FORBIDDEN)
                           .entity("Access Denied: You don't have permission to access this resource.")
                           .build();
        } else if (exception instanceof UnauthorizedException) {
            return Response.status(Response.Status.UNAUTHORIZED)
                           .entity("Access Denied: You need to be authenticated to access this resource.")
                           .build();
        }
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                       .entity("An unexpected error occurred.")
                       .build();
    }
}
