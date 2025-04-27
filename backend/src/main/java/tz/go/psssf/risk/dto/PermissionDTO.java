package tz.go.psssf.risk.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PermissionDTO {

    @NotNull(message = "Code cannot be null")
    @NotBlank(message = "Code cannot be blank")
    @Size(min = 3, message = "Code must be at least 3 characters long")
    @Size(max = 100, message = "Code cannot exceed 100 characters")
    private String code;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, message = "Name must be at least 3 characters long")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 20, message = "Description must be at least 20 characters long")
    @Size(max = 255, message = "Description cannot exceed 255 characters")
    private String description;

}
