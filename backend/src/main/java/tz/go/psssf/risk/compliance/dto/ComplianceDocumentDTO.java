package tz.go.psssf.risk.compliance.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
import java.util.List;

@Getter
@Setter
public class ComplianceDocumentDTO {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    private String name;

    @NotNull(message = "Year cannot be null")
    @Min(value = 1900, message = "Year cannot be before 1900")
    @Max(value = 2100, message = "Year cannot be after 2100")
    private int year;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 10, max = 5000, message = "Description must be between 10 and 5000 characters")
    private String description;

    @NotNull(message = "Entity ID cannot be null")
    @NotBlank(message = "Entity ID cannot be blank")
    private String entityId;

    @NotNull(message = "Document Category ID cannot be null")
    @NotBlank(message = "Document Category ID cannot be blank")
    private String documentCategoryId;

    @NotNull(message = "Department ID cannot be null")
    @NotBlank(message = "Department ID cannot be blank")
    private String departmentId;

    // List of RegulatoryComplianceMatrix DTOs for One-to-Many relationship
    private List<RegulatoryComplianceMatrixDTO> complianceMatrices;
}
