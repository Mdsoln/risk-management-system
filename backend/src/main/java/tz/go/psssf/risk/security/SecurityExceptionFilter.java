//package tz.go.psssf.risk.security;
//
//import io.quarkus.security.ForbiddenException;
//import io.quarkus.security.UnauthorizedException;
//import jakarta.annotation.Priority;
//import jakarta.ws.rs.Priorities;
//import jakarta.ws.rs.container.ContainerRequestContext;
//import jakarta.ws.rs.container.ContainerRequestFilter;
//import jakarta.ws.rs.core.Response;
//import jakarta.ws.rs.ext.Provider;
//import org.jboss.logging.Logger;
//import tz.go.psssf.risk.helper.ResponseHelper;
//import tz.go.psssf.risk.response.ResponseWrapper;
//
//import java.io.IOException;
//
//@Provider
////@Priority(Priorities.AUTHENTICATION)
//public class SecurityExceptionFilter implements ContainerRequestFilter {
//
//    private static final Logger log = Logger.getLogger(SecurityExceptionFilter.class);
//
//    @Override
//    public void filter(ContainerRequestContext requestContext) throws IOException {
//    	
//    	System.out.println("################### SecurityExceptionFilter -> filter #####################");
//    	
//        try {
//            // Normal request processing, let Quarkus security filters handle the request first
//            requestContext.setProperty("authorized", true); // Example property to track state
//        } catch (UnauthorizedException | ForbiddenException e) {
//            log.error("Security Exception intercepted", e);
//
//            // Custom response handling based on the type of exception
//            ResponseWrapper<Void> responseWrapper;
//            if (e instanceof UnauthorizedException) {
//                responseWrapper = ResponseHelper.createUnauthorizedResponse("Access Denied: Unauthorized");
//                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
//                                                  .entity(responseWrapper)
//                                                  .build());
//            } else if (e instanceof ForbiddenException) {
//                responseWrapper = ResponseHelper.createUnauthorizedResponse("Access Denied: Forbidden");
//                requestContext.abortWith(Response.status(Response.Status.FORBIDDEN)
//                                                  .entity(responseWrapper)
//                                                  .build());
//            } else {
//                responseWrapper = ResponseHelper.createErrorResponse(e);
//                requestContext.abortWith(Response.status(Response.Status.INTERNAL_SERVER_ERROR)
//                                                  .entity(responseWrapper)
//                                                  .build());
//            }
//        } catch (Exception e) {
//            log.error("General exception intercepted", e);
//            ResponseWrapper<Void> responseWrapper = ResponseHelper.createErrorResponse(e);
//            requestContext.abortWith(Response.status(Response.Status.INTERNAL_SERVER_ERROR)
//                                              .entity(responseWrapper)
//                                              .build());
//        }
//    }
//}
