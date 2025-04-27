package tz.go.psssf.risk.bcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_supplier")
public class BcmSupplier extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    @Column(name = "name")
    private String name;

    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    @Column(name = "phone_work")
    private String phoneWork;

    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    @Column(name = "phone_home")
    private String phoneHome;

    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    @Column(name = "phone_mobile")
    private String phoneMobile;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(name = "description")
    private String description;
}

