package tz.go.psssf.risk.security;

import java.util.Set;

import io.quarkus.security.PermissionsAllowed;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.annotation.Priority;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

@Provider
@Priority(Priorities.AUTHORIZATION) // Ensure the priority is set correctly
public class CustomSecurityInterceptor implements ContainerRequestFilter {

    @Context
    ResourceInfo resourceInfo;

    @Inject
    SecurityIdentity identity;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        System.out.println("CustomSecurityInterceptor is triggered."+resourceInfo.getResourceMethod().getAnnotation(PermissionsAllowed.class));
        PermissionsAllowed permissionsAllowed = resourceInfo.getResourceMethod().getAnnotation(PermissionsAllowed.class);

        if (permissionsAllowed != null) {
            System.out.println("PermissionsAllowed annotation found.");
            Set<String> permissions = identity.getAttribute("permissions");

            if (permissions == null) {
                System.out.println("Permissions not found in SecurityIdentity.");
                requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
                return;
            }

            for (String permission : permissionsAllowed.value()) {
                System.out.println("Checking permission: " + permission);
                if (!permissions.contains(permission)) {
                    System.out.println("Permission not found, aborting with 403.");
                    requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
                    return;
                }
            }
            System.out.println("All permissions validated successfully.");
        }
    }
}
