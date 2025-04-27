package tz.go.psssf.risk.compliance.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class RegulatoryComplianceMatrixSectionDTO {

    @NotNull(message = "Item number cannot be null")
    @NotBlank(message = "Item number cannot be blank")
    @Size(min = 1, max = 50, message = "Item number must be between 1 and 50 characters")
    private String itemNumber;

    @NotNull(message = "Details cannot be null")
    @NotBlank(message = "Details cannot be blank")
    @Size(min = 10, max = 5000, message = "Details must be between 10 and 5000 characters")
    private String details;

    @NotNull(message = "Compliance status ID cannot be null")
    @NotBlank(message = "Compliance status ID cannot be blank")
    private String complianceStatusId;

    @Size(max = 5000, message = "Comment cannot exceed 5000 characters")
    private String comment;

    @Size(max = 5000, message = "Recommendation cannot exceed 5000 characters")
    private String recommendation;

    @NotNull(message = "Matrix ID cannot be null")
    @NotBlank(message = "Matrix ID cannot be blank")
    private String matrixId;
}
