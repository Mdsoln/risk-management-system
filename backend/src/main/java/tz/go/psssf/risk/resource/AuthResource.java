//package tz.go.psssf.risk.resource;
//
//import io.smallrye.jwt.build.Jwt;
//import jakarta.inject.Inject;
//import jakarta.ws.rs.Consumes;
//import jakarta.ws.rs.POST;
//import jakarta.ws.rs.Path;
//import jakarta.ws.rs.Produces;
//import jakarta.ws.rs.core.MediaType;
//import jakarta.ws.rs.core.Response;
//import lombok.Data;
//import org.eclipse.microprofile.jwt.Claims;
//import tz.go.psssf.risk.auth.TokenStore;
//import tz.go.psssf.risk.entity.User;
//import tz.go.psssf.risk.repository.UserRepository;
//
//import java.time.Duration;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//@Path("/auth")
//public class AuthResource {
//
//    @Inject
//    TokenStore tokenStore;
//
//    @Inject
//    UserRepository userRepository;
//
//    @POST
//    @Path("/login")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response login(UserCredentials credentials) {
//        User user = userRepository.findByUsername(credentials.getUsername());
//        if (user != null && user.getPassword().equals(credentials.getPassword())) { // Replace with hash check in production
//            String token = Jwt.issuer("http://localhost:8080/auth")
//                    .upn(user.getNin())
//                    .groups(getRoleNames(user))
//                    .claim(Claims.birthdate.name(), "2000-01-01") // Example claim
//                    .expiresIn(Duration.ofHours(1))
//                    .sign();
//
//            tokenStore.storeToken(user.getNin(), token, user.getRoles().toString());
//
//            return Response.ok(new TokenResponse(token)).build();
//        } else {
//            return Response.status(Response.Status.UNAUTHORIZED)
//                    .entity("Invalid username or password")
//                    .build();
//        }
//    }
//
//    @POST
//    @Path("/logout")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.TEXT_PLAIN)
//    public Response logout(UserCredentials credentials) {
//        tokenStore.removeToken(credentials.getUsername());
//        return Response.ok("Logged out successfully").build();
//    }
//
//    private Set<String> getRoleNames(User user) {
//        return user.getRoles().stream().map(role -> role.getName()).collect(Collectors.toSet());
//    }
//
//    @Data
//    public static class UserCredentials {
//        private String username;
//        private String password;
//    }
//
//    @Data
//    public static class TokenResponse {
//        private final String token;
//
//        public TokenResponse(String token) {
//            this.token = token;
//        }
//    }
//}
