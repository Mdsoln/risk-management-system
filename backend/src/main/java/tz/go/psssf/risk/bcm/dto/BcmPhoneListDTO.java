package tz.go.psssf.risk.bcm.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmPhoneListDTO {

    @NotNull(message = "Role or Name cannot be null")
    @NotBlank(message = "Role or Name cannot be blank")
    @Size(min = 3, max = 255, message = "Role or Name must be between 3 and 255 characters")
    private String roleOrName;

    @NotNull(message = "Number of Phones Required cannot be null")
    @Min(value = 1, message = "At least 1 phone is required")
    private int phonesRequired;

    @NotNull(message = "ISD Access cannot be null")
    private boolean isdAccess;

    @NotNull(message = "Installation status cannot be null")
    private boolean installedOk;

    @NotNull(message = "Testing status cannot be null")
    private boolean testedOk;

    @Size(max = 500, message = "Comments cannot exceed 500 characters")
    private String comments;
}
