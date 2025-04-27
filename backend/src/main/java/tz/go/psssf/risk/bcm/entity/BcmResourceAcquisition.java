package tz.go.psssf.risk.bcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_resource_acquisition")
public class BcmResourceAcquisition extends BaseEntity {

    @NotNull(message = "Resource cannot be null")
    @NotBlank(message = "Resource cannot be blank")
    @Size(min = 3, max = 255, message = "Resource must be between 3 and 255 characters")
    @Column(name = "resource")
    private String resource;

    @NotNull(message = "Quantity needed cannot be null")
    @Min(value = 0, message = "Quantity needed cannot be negative")
    @Column(name = "qty_needed")
    private int qtyNeeded;

    @NotNull(message = "Quantity available cannot be null")
    @Min(value = 0, message = "Quantity available cannot be negative")
    @Column(name = "qty_available")
    private int qtyAvailable;

    @NotNull(message = "Quantity to get cannot be null")
    @Min(value = 0, message = "Quantity to get cannot be negative")
    @Column(name = "qty_to_get")
    private int qtyToGet;

    @Size(max = 255, message = "Source cannot exceed 255 characters")
    @Column(name = "source")
    private String source;

    @NotNull(message = "Completion status cannot be null")
    @Column(name = "done")
    private boolean done;
}
