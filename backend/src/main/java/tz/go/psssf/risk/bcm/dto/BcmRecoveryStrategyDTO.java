package tz.go.psssf.risk.bcm.dto;


import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmRecoveryStrategyDTO {

    @NotNull(message = "Strategy Type cannot be null")
    @NotBlank(message = "Strategy Type cannot be blank")
    @Size(min = 3, max = 255, message = "Strategy Type must be between 3 and 255 characters")
    private String strategyType;

    @NotNull(message = "Availability cannot be null")
    private boolean availability;

    @NotNull(message = "Recovery Time cannot be null")
    @NotBlank(message = "Recovery Time cannot be blank")
    private String recoveryTime;

    @Size(max = 500, message = "Comments cannot exceed 500 characters")
    private String comments;

    @NotNull(message = "Dependency cannot be null")
    @NotBlank(message = "Dependency cannot be blank")
    private String dependencyId;
}
