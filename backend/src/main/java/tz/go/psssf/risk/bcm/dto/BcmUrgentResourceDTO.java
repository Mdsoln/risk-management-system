package tz.go.psssf.risk.bcm.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmUrgentResourceDTO {

    @NotNull(message = "Resource Name cannot be null")
    @NotBlank(message = "Resource Name cannot be blank")
    @Size(min = 3, max = 255, message = "Resource Name must be between 3 and 255 characters")
    private String resourceName;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    @NotNull(message = "Category cannot be null")
    @NotBlank(message = "Category cannot be blank")
    @Size(max = 100, message = "Category cannot exceed 100 characters")
    private String category;

    @NotNull(message = "Location cannot be null")
    @NotBlank(message = "Location cannot be blank")
    @Size(max = 255, message = "Location cannot exceed 255 characters")
    private String location;

    @Size(max = 255, message = "Responsible Person cannot exceed 255 characters")
    private String responsiblePerson;

    @Size(max = 15, message = "Contact number cannot exceed 15 characters")
    private String contactNumber;
}
