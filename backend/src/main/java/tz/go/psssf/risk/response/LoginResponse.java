package tz.go.psssf.risk.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tz.go.psssf.risk.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String accessToken;
    private String tokenType = "Bearer"; // Typically "Bearer"
    private long expiresIn;
    private String refreshToken;
    private String scope; // Optional: To specify the scope of access

//    private User user; // Include the User entity directly in the response
}