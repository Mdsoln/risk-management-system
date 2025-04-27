package tz.go.psssf.risk.bcm.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmPhoneDirectoryDTO {

    @NotNull(message = "Role/Name cannot be null")
    @NotBlank(message = "Role/Name cannot be blank")
    @Size(min = 3, max = 255, message = "Role/Name must be between 3 and 255 characters")
    private String roleName;

    @NotNull(message = "Phone number cannot be null")
    @NotBlank(message = "Phone number cannot be blank")
    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    private String phoneNumber;

    @Size(max = 255, message = "Room cannot exceed 255 characters")
    private String room;
}
