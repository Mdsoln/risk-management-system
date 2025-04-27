package tz.go.psssf.risk.resource;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.security.Principal;

import org.jboss.logging.Logger;

@Path("/secure")
public class SecureResource {

    @Inject
    Logger logger;

    
    @GET
    @Path("/user")
//    @PermitAll
    @RolesAllowed("user")
    public Response secureEndpoint(@Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        
        if (principal != null) {
            logger.info("Principal name: " + principal.getName());
            logger.info("Is user in role 'user': " + securityContext.isUserInRole("user"));
            return Response.ok("Is user in role 'user': " + securityContext.isUserInRole("user")).build();
        } else {
            logger.error("No principal found in security context!");
            return Response.ok("No principal found in security context!").build();
        }

        
    }

}
