package tz.go.psssf.risk.bcm.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmBattleBoxItemDTO {

    @NotNull(message = "Item name cannot be null")
    @NotBlank(message = "Item name cannot be blank")
    @Size(min = 3, max = 255, message = "Item name must be between 3 and 255 characters")
    private String itemName;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    @Size(max = 255, message = "Location cannot exceed 255 characters")
    private String location;

    @NotNull(message = "Last updated date cannot be null")
    private String lastUpdated;

    @NotNull(message = "Responsible person cannot be null")
    @NotBlank(message = "Responsible person cannot be blank")
    @Size(max = 255, message = "Responsible person name cannot exceed 255 characters")
    private String responsiblePerson;
}
