package tz.go.psssf.risk.security;

import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import tz.go.psssf.risk.entity.User;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
public class TokenGenerator {

	@Inject
    JWTParser jwtParser; // Inject the JWTParser for parsing and validating tokens

    public static String generateJti() {
        return UUID.randomUUID().toString();
    }

    // Method to generate an access token with claims
    public String generateToken(Map<String, Object> claims) {
        Instant now = Instant.now();
        String jti = generateJti();

        String[] groupsArray = (String[]) claims.get("groups");
        String[] permissionsArray = (String[]) claims.get("permissions");

        // Convert arrays to Sets
        Set<String> groupsSet = groupsArray != null ? Arrays.stream(groupsArray).collect(Collectors.toSet()) : null;
        Set<String> permissionsSet = permissionsArray != null ? Arrays.stream(permissionsArray).collect(Collectors.toSet()) : null;

        return Jwt.issuer("http://localhost:8080/auth")
                .subject((String) claims.get("upn"))
                .audience("your-client-id")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .claim("nbf", now.getEpochSecond()) // Adding Not Before (nbf) claim manually
                .claim("jti", jti) // Generate a unique JWT ID (jti)
                .groups(groupsSet != null ? groupsSet : null) // Convert array to set
                .claim("permissions", permissionsSet != null ? permissionsSet : null) // Ensure permissions are correctly added
                .claim("name", claims.get("name"))
                .sign();
    }



    // Method to generate a refresh token
    public String generateRefreshToken(User user) {
        Instant now = Instant.now();
        String jti = generateJti();
        return Jwt.issuer("http://localhost:8080/auth")
                .subject(user.getNin())
                .issuedAt(now)
                .expiresAt(now.plus(30, ChronoUnit.DAYS))
                .claim("scope", "refresh")
                .claim("jti", jti) // Unique JWT ID for the refresh token
                .sign();
    }

    // Method to validate a refresh token
    public String validateRefreshToken(String refreshToken) throws Exception {
        try {
            var jwt = jwtParser.parse(refreshToken);
            if (jwt.getGroups().contains("refresh")) {
                return jwt.getSubject(); // Return the user NIN (or any identifier)
            } else {
                throw new Exception("Invalid refresh token scope");
            }
        } catch (Exception e) {
            throw new Exception("Invalid refresh token", e);
        }
    }
}
