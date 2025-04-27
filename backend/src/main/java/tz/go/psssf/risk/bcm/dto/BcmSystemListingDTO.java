package tz.go.psssf.risk.bcm.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmSystemListingDTO {

    @NotNull(message = "Business Area cannot be null")
    @NotBlank(message = "Business Area cannot be blank")
    @Size(max = 255, message = "Business Area cannot exceed 255 characters")
    private String businessArea;

    @Size(max = 255, message = "Applications and Database cannot exceed 255 characters")
    private String applicationsAndDatabase;

    @Size(max = 255, message = "Telephones cannot exceed 255 characters")
    private String telephones;

    @Size(max = 255, message = "Mobile Phones cannot exceed 255 characters")
    private String mobilePhones;

    @Size(max = 255, message = "Modem cannot exceed 255 characters")
    private String modem;

    @Size(max = 255, message = "Fax cannot exceed 255 characters")
    private String fax;

    @Size(max = 255, message = "Laser Printer cannot exceed 255 characters")
    private String laserPrinter;

    @Size(max = 255, message = "Photocopier cannot exceed 255 characters")
    private String photocopier;

    @Size(max = 500, message = "Others cannot exceed 500 characters")
    private String others;
}
