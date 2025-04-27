package tz.go.psssf.risk.compliance.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class ComplianceStatusDTO {

    @NotNull(message = "Status name cannot be null")
    @NotBlank(message = "Status name cannot be blank")
    @Size(max = 100, message = "Status name cannot exceed 100 characters")
    private String statusName;

    @NotNull(message = "Score cannot be null")
    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "1.0", message = "Score cannot be more than 1")
    private Double score;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 10, max = 5000, message = "Description must be between 10 and 5000 characters")
    private String description;
}
