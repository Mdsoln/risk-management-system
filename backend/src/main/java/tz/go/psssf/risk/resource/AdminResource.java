package tz.go.psssf.risk.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import tz.go.psssf.risk.auth.TokenStore;
import tz.go.psssf.risk.auth.TokenStore.UserSession;

import java.util.Map;

@Path("/admin")
public class AdminResource {

    @Inject
    TokenStore tokenStore;

    @GET
    @Path("/active-users-with-roles-tokens")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, UserSession> listActiveUsersWithRolesAndTokens() {
        return tokenStore.getAllActiveUsersWithRolesAndTokens();
    }
}
