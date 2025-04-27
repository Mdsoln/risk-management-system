package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.enums.RoleType;
import tz.go.psssf.risk.pojo.PermissionPojo;
import tz.go.psssf.risk.pojo.RolePojo;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
public class UserDTO {

	@NotNull(message = "NIN cannot be null")
    @NotBlank(message = "NIN cannot be blank")
    @Size(max = 20, message = "NIN cannot exceed 20 characters")
    private String nin;

    @NotNull(message = "Password cannot be null")
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Size(max = 255, message = "Password cannot exceed 255 characters")
    private String password;

    @NotNull(message = "Role type cannot be null")
    private RoleType roleType;

    private Set<RolePojo> roles; // Updated to store RolePojo
    private Set<PermissionPojo> permissions; // Updated to store PermissionPojo

    // ProfileDetails fields
    @NotNull(message = "First name cannot be null")
    @NotBlank(message = "First name cannot be blank")
    @Size(max = 50, message = "First name cannot exceed 50 characters")
    private String firstName;

    @Size(max = 50, message = "Middle name cannot exceed 50 characters")
    private String middleName;

    @NotNull(message = "Last name cannot be null")
    @NotBlank(message = "Last name cannot be blank")
    @Size(max = 50, message = "Last name cannot exceed 50 characters")
    private String lastName;

    @NotNull(message = "Email cannot be null")
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    private String email;

    @NotNull(message = "Mobile number cannot be null")
    @NotBlank(message = "Mobile number cannot be blank")
    @Size(max = 15, message = "Mobile number cannot exceed 15 characters")
    private String mobile;

    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    private String phone;

    @NotNull(message = "Job title cannot be null")
    @NotBlank(message = "Job title cannot be blank")
    @Size(max = 100, message = "Job title cannot exceed 100 characters")
    private String jobTitle;

    @NotNull(message = "Position cannot be null")
    @NotBlank(message = "Position cannot be blank")
    @Size(max = 100, message = "Position cannot exceed 100 characters")
    private String position;

    @NotNull(message = "Office cannot be null")
    @NotBlank(message = "Office cannot be blank")
    @Size(max = 100, message = "Office cannot exceed 100 characters")
    private String office;
}
