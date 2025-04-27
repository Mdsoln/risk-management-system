package tz.go.psssf.risk.bcm.dto;


import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmImpactAssessmentDTO {

    @NotNull(message = "Impact Type cannot be null")
    @NotBlank(message = "Impact Type cannot be blank")
    @Size(min = 3, max = 255, message = "Impact Type must be between 3 and 255 characters")
    private String impactType;

    @NotNull(message = "Severity Level cannot be null")
    private int severityLevel;

    @NotNull(message = "Time to Recover cannot be null")
    @NotBlank(message = "Time to Recover cannot be blank")
    private String timeToRecover;

    @NotNull(message = "Process cannot be null")
    @NotBlank(message = "Process cannot be blank")
    private String processId;

    private String subProcessId; // Optional field
}

