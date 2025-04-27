package tz.go.psssf.risk.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TokenStore {

    // In-memory stores for tokens and roles
    private Map<String, String> tokenStore = new ConcurrentHashMap<>();
    private Map<String, String> roleStore = new ConcurrentHashMap<>();

    // Store a token and role for a user
    public void storeToken(String username, String token, String role) {
        tokenStore.put(username, token);
        roleStore.put(username, role);
    }

    // Retrieve a token for a user
    public String getToken(String username) {
        return tokenStore.get(username);
    }

    // Retrieve a role for a user
    public String getRole(String username) {
        return roleStore.get(username);
    }

    // Remove a token and role when a user logs out
    public void removeToken(String username) {
        tokenStore.remove(username);
        roleStore.remove(username);
    }

    // Get all active users with their tokens and roles
    public Map<String, UserSession> getAllActiveUsersWithRolesAndTokens() {
        Map<String, UserSession> usersWithRolesAndTokens = new HashMap<>();
        for (String username : tokenStore.keySet()) {
            usersWithRolesAndTokens.put(username, new UserSession(roleStore.get(username), tokenStore.get(username)));
        }
        return usersWithRolesAndTokens;
    }

    // Inner class to represent a user's session information
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserSession {
        private String role;
        private String token;
    }
}
