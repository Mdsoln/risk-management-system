package tz.go.psssf.risk.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {

    @NotBlank(message = "NIN is required")
    @Size(max = 20, message = "NIN cannot exceed 20 characters")
    private String nin;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
}
