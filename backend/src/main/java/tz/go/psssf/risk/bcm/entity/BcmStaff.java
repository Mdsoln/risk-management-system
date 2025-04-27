package tz.go.psssf.risk.bcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;


@Getter
@Setter
@Entity
@Table(name = "bcm_staff")
public class BcmStaff extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Role cannot be null")
    @NotBlank(message = "Role cannot be blank")
    @Size(max = 255, message = "Role cannot exceed 255 characters")
    @Column(name = "role")
    private String role;

    @NotNull(message = "Mobile number cannot be null")
    @Size(max = 15, message = "Mobile number cannot exceed 15 characters")
    @Column(name = "mobile_number")
    private String mobileNumber;

    @NotNull(message = "Location cannot be null")
    @NotBlank(message = "Location cannot be blank")
    @Size(max = 255, message = "Location cannot exceed 255 characters")
    @Column(name = "location")
    private String location;

    @Size(max = 255, message = "Alternate contact person cannot exceed 255 characters")
    @Column(name = "alternate_contact_person")
    private String alternateContactPerson;

    @Size(max = 255, message = "Alternate location cannot exceed 255 characters")
    @Column(name = "alternate_location")
    private String alternateLocation;

    @Size(max = 255, message = "Next of kin cannot exceed 255 characters")
    @Column(name = "next_of_kin")
    private String nextOfKin;
}
