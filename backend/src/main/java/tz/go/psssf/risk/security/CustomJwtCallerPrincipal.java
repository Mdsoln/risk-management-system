package tz.go.psssf.risk.security;
import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipal;
import io.smallrye.jwt.auth.principal.JWTParser;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class CustomJwtCallerPrincipal {

    @Inject
    JWTParser jwtParser;

    public List<String> getPermissions(String jwtString) throws Exception {
        // Parse the JWT string into a DefaultJWTCallerPrincipal object
        DefaultJWTCallerPrincipal callerPrincipal = (DefaultJWTCallerPrincipal) jwtParser.parse(jwtString);

        // Extract the permissions from the JWT claims
        Object permissionsObj = callerPrincipal.getClaim("permissions");
        if (permissionsObj instanceof List<?>) {
            return (List<String>) permissionsObj;
        } else {
            throw new Exception("Permissions claim is not a list or is missing.");
        }
    }
}
