package tz.go.psssf.risk.bcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_battle_box_item")
public class BcmBattleBoxItem extends BaseEntity {

    @NotNull(message = "Item name cannot be null")
    @NotBlank(message = "Item name cannot be blank")
    @Size(min = 3, max = 255, message = "Item name must be between 3 and 255 characters")
    @Column(name = "item_name")
    private String itemName;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(name = "description")
    private String description;

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(name = "quantity")
    private int quantity;

    @Size(max = 255, message = "Location cannot exceed 255 characters")
    @Column(name = "location")
    private String location;

    @NotNull(message = "Last updated date cannot be null")
    @Column(name = "last_updated")
    private String lastUpdated;

    @NotNull(message = "Responsible person cannot be null")
    @NotBlank(message = "Responsible person cannot be blank")
    @Size(max = 255, message = "Responsible person name cannot exceed 255 characters")
    @Column(name = "responsible_person")
    private String responsiblePerson;
}
