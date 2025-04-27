package tz.go.psssf.risk.bcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_phone_list")
public class BcmPhoneList extends BaseEntity {

    @NotNull(message = "Role or Name cannot be null")
    @NotBlank(message = "Role or Name cannot be blank")
    @Size(min = 3, max = 255, message = "Role or Name must be between 3 and 255 characters")
    @Column(name = "role_or_name")
    private String roleOrName;

    @NotNull(message = "Number of Phones Required cannot be null")
    @Min(value = 1, message = "At least 1 phone is required")
    @Column(name = "phones_required")
    private int phonesRequired;

    @NotNull(message = "ISD Access cannot be null")
    @Column(name = "isd_access")
    private boolean isdAccess;

    @NotNull(message = "Installation status cannot be null")
    @Column(name = "installed_ok")
    private boolean installedOk;

    @NotNull(message = "Testing status cannot be null")
    @Column(name = "tested_ok")
    private boolean testedOk;

    @Size(max = 500, message = "Comments cannot exceed 500 characters")
    @Column(name = "comments")
    private String comments;
}
