package tz.go.psssf.risk.resource;

import java.util.Set;

import io.quarkus.security.Authenticated;
import io.quarkus.security.PermissionsAllowed;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import tz.go.psssf.risk.dto.LoginDto;
import tz.go.psssf.risk.entity.User;
import tz.go.psssf.risk.response.LoginResponse;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.service.AuthenticationService;

@Path("/api/v1/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
//@Authenticated
public class AuthenticationResource {

    @Inject
    AuthenticationService authenticationService;
    
    @Inject
    SecurityIdentity identity;

    @POST
    @Path("/login")
    public Response login(@Valid LoginDto loginRequest) {
        ResponseWrapper<LoginResponse> response = authenticationService.login(loginRequest);
        return Response.ok(response).build();
    }

    @POST
    @Path("/refresh-token")
    public Response refreshToken(@HeaderParam("Authorization") String refreshToken) {
        String token = refreshToken.replace("Bearer ", "");
        ResponseWrapper<LoginResponse> response = authenticationService.refreshToken(token);
        return Response.ok(response).build();
    }

    @GET
    @Path("/user-info/{nin}")
//    @PermissionsAllowed({"EDIT_TEAM_DATA", "VIEW_TEAM_DATA", "APPROVE_PROJECTS"})
    public Response getUserInfoByNin(@PathParam("nin") String nin) {
        System.out.println("Permissions: " + identity.getAttribute("permissions"));
//        System.out.println("Attributes: " + identity.getAttributes());

        ResponseWrapper<User> response = authenticationService.getUserInfoByNin(nin);
        return Response.ok(response).build();
    }
}
