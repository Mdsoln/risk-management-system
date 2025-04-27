package tz.go.psssf.risk.bcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_urgent_resource")
public class BcmUrgentResource extends BaseEntity {

    @NotNull(message = "Resource Name cannot be null")
    @NotBlank(message = "Resource Name cannot be blank")
    @Size(min = 3, max = 255, message = "Resource Name must be between 3 and 255 characters")
    @Column(name = "resource_name")
    private String resourceName;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(name = "description")
    private String description;

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(name = "quantity")
    private int quantity;

    @NotNull(message = "Category cannot be null")
    @NotBlank(message = "Category cannot be blank")
    @Size(max = 100, message = "Category cannot exceed 100 characters")
    @Column(name = "category")
    private String category;

    @NotNull(message = "Location cannot be null")
    @NotBlank(message = "Location cannot be blank")
    @Size(max = 255, message = "Location cannot exceed 255 characters")
    @Column(name = "location")
    private String location;

    @Size(max = 255, message = "Responsible Person cannot exceed 255 characters")
    @Column(name = "responsible_person")
    private String responsiblePerson;

    @Size(max = 15, message = "Contact number cannot exceed 15 characters")
    @Column(name = "contact_number")
    private String contactNumber;
}
