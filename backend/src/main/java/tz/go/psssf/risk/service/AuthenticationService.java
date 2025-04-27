package tz.go.psssf.risk.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.dto.LoginDto;
import tz.go.psssf.risk.entity.User;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.repository.UserRepository;
import tz.go.psssf.risk.response.LoginResponse;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.security.TokenGenerator;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class AuthenticationService {

    @Inject
    UserRepository userRepository;

    @Inject
    TokenGenerator tokenGenerator;

    @Transactional
    public ResponseWrapper<LoginResponse> login(LoginDto loginRequest) {
        try {
            User user = userRepository.find("nin", loginRequest.getNin()).firstResult();

            if (user == null || !Objects.equals(user.getPassword(), loginRequest.getPassword())) {
                return ResponseHelper.createUnauthorizedResponse("Invalid NIN or password");
            }

            String firstName = Objects.toString(user.getFirstName(), "Unknown");
            String lastName = Objects.toString(user.getLastName(), "Unknown");

            Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName())
                .collect(Collectors.toSet());

            Set<String> permissions = user.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(permission -> permission.getCode())
                .collect(Collectors.toSet());

            Map<String, Object> claims = new HashMap<>();
            claims.put("upn", user.getNin());
            claims.put("name", firstName + " " + lastName);
            claims.put("groups", roles.toArray(new String[0]));  // No duplicate roles
            claims.put("permissions", permissions.toArray(new String[0]));  // No duplicate permissions

            String accessToken = tokenGenerator.generateToken(claims);
            String refreshToken = tokenGenerator.generateRefreshToken(user);

            LoginResponse response = new LoginResponse();
            response.setAccessToken(accessToken);
            response.setExpiresIn(3600);
            response.setTokenType("Bearer");
            response.setScope("read write");
            response.setRefreshToken(refreshToken);

            return ResponseHelper.createSuccessResponse(response);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<LoginResponse> refreshToken(String refreshToken) {
        try {
            String nin = tokenGenerator.validateRefreshToken(refreshToken);

            User user = userRepository.find("nin", nin).firstResult();
            if (user == null) {
                return ResponseHelper.createUnauthorizedResponse("Invalid refresh token");
            }

            String firstName = Objects.toString(user.getFirstName(), "Unknown");
            String lastName = Objects.toString(user.getLastName(), "Unknown");

            Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName())
                .collect(Collectors.toSet());

            Set<String> permissions = user.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(permission -> permission.getCode())
                .collect(Collectors.toSet());

            Map<String, Object> claims = new HashMap<>();
            claims.put("upn", user.getNin());
            claims.put("name", firstName + " " + lastName);
            claims.put("groups", roles.toArray(new String[0]));  // No duplicate roles
            claims.put("permissions", permissions.toArray(new String[0]));  // No duplicate permissions

            String newAccessToken = tokenGenerator.generateToken(claims);
            String newRefreshToken = tokenGenerator.generateRefreshToken(user);

            LoginResponse response = new LoginResponse();
            response.setAccessToken(newAccessToken);
            response.setExpiresIn(3600);
            response.setTokenType("Bearer");
            response.setScope("read write");
            response.setRefreshToken(newRefreshToken);

            return ResponseHelper.createSuccessResponse(response);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<User> getUserInfoByNin(String nin) {
        try {
            User user = userRepository.find("nin", nin).firstResult();
            if (user == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            return ResponseHelper.createSuccessResponse(user);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
