package tz.go.psssf.risk.bcm.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmDamageAssessmentDTO {

    @NotNull(message = "Supplier cannot be null")
    @NotBlank(message = "Supplier cannot be blank")
    @Size(min = 3, max = 255, message = "Supplier must be between 3 and 255 characters")
    private String supplier;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    private String name;

    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    private String phoneWork;

    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    private String phoneHome;

    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    private String phoneMobile;
}
