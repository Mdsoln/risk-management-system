package tz.go.psssf.risk.bcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_phone_directory")
public class BcmPhoneDirectory extends BaseEntity {

    @NotNull(message = "Role/Name cannot be null")
    @NotBlank(message = "Role/Name cannot be blank")
    @Size(min = 3, max = 255, message = "Role/Name must be between 3 and 255 characters")
    @Column(name = "role_name")
    private String roleName;

    @NotNull(message = "Phone number cannot be null")
    @NotBlank(message = "Phone number cannot be blank")
    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Size(max = 255, message = "Room cannot exceed 255 characters")
    @Column(name = "room")
    private String room;
}
