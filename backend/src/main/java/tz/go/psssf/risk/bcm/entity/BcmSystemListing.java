package tz.go.psssf.risk.bcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_system_listing")
public class BcmSystemListing extends BaseEntity {

    @NotNull(message = "Business Area cannot be null")
    @NotBlank(message = "Business Area cannot be blank")
    @Size(max = 255, message = "Business Area cannot exceed 255 characters")
    @Column(name = "business_area")
    private String businessArea;

    @Size(max = 255, message = "Applications and Database cannot exceed 255 characters")
    @Column(name = "applications_and_database")
    private String applicationsAndDatabase;

    @Size(max = 255, message = "Telephones cannot exceed 255 characters")
    @Column(name = "telephones")
    private String telephones;

    @Size(max = 255, message = "Mobile Phones cannot exceed 255 characters")
    @Column(name = "mobile_phones")
    private String mobilePhones;

    @Size(max = 255, message = "Modem cannot exceed 255 characters")
    @Column(name = "modem")
    private String modem;

    @Size(max = 255, message = "Fax cannot exceed 255 characters")
    @Column(name = "fax")
    private String fax;

    @Size(max = 255, message = "Laser Printer cannot exceed 255 characters")
    @Column(name = "laser_printer")
    private String laserPrinter;

    @Size(max = 255, message = "Photocopier cannot exceed 255 characters")
    @Column(name = "photocopier")
    private String photocopier;

    @Size(max = 500, message = "Others cannot exceed 500 characters")
    @Column(name = "others")
    private String others;
}
