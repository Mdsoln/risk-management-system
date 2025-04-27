package tz.go.psssf.risk.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class ProfileDetails extends BaseEntity {

    @NotNull(message = "First name cannot be null")
    @NotBlank(message = "First name cannot be blank")
    @Size(max = 50, message = "First name cannot exceed 50 characters")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Size(max = 50, message = "Middle name cannot exceed 50 characters")
    @Column(name = "middle_name")
    private String middleName;

    @NotNull(message = "Last name cannot be null")
    @NotBlank(message = "Last name cannot be blank")
    @Size(max = 50, message = "Last name cannot exceed 50 characters")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull(message = "Email cannot be null")
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @NotNull(message = "Mobile number cannot be null")
    @NotBlank(message = "Mobile number cannot be blank")
    @Size(max = 15, message = "Mobile number cannot exceed 15 characters")
    @Column(name = "mobile", unique = true, nullable = false)
    private String mobile;

    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    @Column(name = "phone")
    private String phone;

    @NotNull(message = "Job title cannot be null")
    @NotBlank(message = "Job title cannot be blank")
    @Size(max = 100, message = "Job title cannot exceed 100 characters")
    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @NotNull(message = "Position cannot be null")
    @NotBlank(message = "Position cannot be blank")
    @Size(max = 100, message = "Position cannot exceed 100 characters")
    @Column(name = "position", nullable = false)
    private String position;

    @NotNull(message = "Office cannot be null")
    @NotBlank(message = "Office cannot be blank")
    @Size(max = 100, message = "Office cannot exceed 100 characters")
    @Column(name = "office", nullable = false)
    private String office;
}
