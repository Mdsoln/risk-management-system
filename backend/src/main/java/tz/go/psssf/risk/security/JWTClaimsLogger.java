package tz.go.psssf.risk.security;

import io.smallrye.jwt.auth.principal.JWTParser;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.ext.Provider;

@Provider
public class JWTClaimsLogger implements ContainerRequestFilter {

    @Inject
    JWTParser jwtParser; // Injecting the JWTParser to parse the JWT token

    @Override
    public void filter(ContainerRequestContext requestContext) {
    	System.out.println("############################ JWTClaimsLogger START ###################################");
        try {
            // Extract the Authorization header from the request
            String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                // Remove "Bearer " prefix from the token
                String token = authHeader.substring(7);

                // Parse the JWT token
                var jwt = jwtParser.parse(token);

                // Log all claims in the JWT
                System.out.println("JWT Claims:");
                jwt.getClaimNames().forEach(name ->
                    System.out.println(name + ": " + jwt.getClaim(name))
                );
            }
        } catch (Exception e) {
            // Handle any exceptions that occur during parsing
            e.printStackTrace();
        }
    	System.out.println("############################ JWTClaimsLogger ENDS ###################################");

    }
}
