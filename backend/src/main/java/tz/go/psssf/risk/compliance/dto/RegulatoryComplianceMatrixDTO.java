package tz.go.psssf.risk.compliance.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
import java.util.List;

@Getter
@Setter
public class RegulatoryComplianceMatrixDTO {

    @NotNull(message = "Item number cannot be null")
    @NotBlank(message = "Item number cannot be blank")
    @Size(min = 1, max = 50, message = "Item number must be between 1 and 50 characters")
    private String itemNumber;

    @NotNull(message = "Details cannot be null")
    @NotBlank(message = "Details cannot be blank")
    @Size(min = 10, max = 5000, message = "Details must be between 10 and 5000 characters")
    private String details;

    @NotNull(message = "Department ID cannot be null")
    @NotBlank(message = "Department ID cannot be blank")
    private String departmentId;

    @NotNull(message = "Document ID cannot be null")
    @NotBlank(message = "Document ID cannot be blank")
    private String documentId;

    // One-to-Many relationship with sections
    private List<RegulatoryComplianceMatrixSectionDTO> sections;
}
