package tz.go.psssf.risk.bcm.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmResourceAcquisitionDTO {

    @NotNull(message = "Resource cannot be null")
    @NotBlank(message = "Resource cannot be blank")
    @Size(min = 3, max = 255, message = "Resource must be between 3 and 255 characters")
    private String resource;

    @NotNull(message = "Quantity needed cannot be null")
    @Min(value = 0, message = "Quantity needed cannot be negative")
    private int qtyNeeded;

    @NotNull(message = "Quantity available cannot be null")
    @Min(value = 0, message = "Quantity available cannot be negative")
    private int qtyAvailable;

    @NotNull(message = "Quantity to get cannot be null")
    @Min(value = 0, message = "Quantity to get cannot be negative")
    private int qtyToGet;

    @Size(max = 255, message = "Source cannot exceed 255 characters")
    private String source;

    @NotNull(message = "Completion status cannot be null")
    private boolean done;
}
