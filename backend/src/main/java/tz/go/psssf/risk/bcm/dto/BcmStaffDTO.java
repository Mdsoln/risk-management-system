package tz.go.psssf.risk.bcm.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmStaffDTO {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    private String name;

    @NotNull(message = "Role cannot be null")
    @NotBlank(message = "Role cannot be blank")
    @Size(max = 255, message = "Role cannot exceed 255 characters")
    private String role;

    @NotNull(message = "Mobile number cannot be null")
    @Size(max = 15, message = "Mobile number cannot exceed 15 characters")
    private String mobileNumber;

    @NotNull(message = "Location cannot be null")
    @NotBlank(message = "Location cannot be blank")
    @Size(max = 255, message = "Location cannot exceed 255 characters")
    private String location;

    @Size(max = 255, message = "Alternate contact person cannot exceed 255 characters")
    private String alternateContactPerson;

    @Size(max = 255, message = "Alternate location cannot exceed 255 characters")
    private String alternateLocation;

    @Size(max = 255, message = "Next of kin cannot exceed 255 characters")
    private String nextOfKin;
}
