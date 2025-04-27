package tz.go.psssf.risk.bcm.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class StatusReportDTO {

    private String id;

//    @NotNull(message = "Business Unit cannot be null")
//    @NotBlank(message = "Business Unit cannot be blank")
//    @Size(min = 3, max = 255, message = "Business Unit must be between 3 and 255 characters")
//    private String businessUnit;
    
    @NotNull(message = "Department cannot be null")
    @NotBlank(message = "Department cannot be blank")
    private String departmentId; // Changed from businessUnit to departmentId


    @NotNull(message = "Date cannot be null")
    @NotBlank(message = "Date cannot be blank")
    private String reportDate;

    @NotNull(message = "Time cannot be null")
    @NotBlank(message = "Time cannot be blank")
    private String reportTime;

    private String staff;
    private String customers;
    private String workInProgress;
    private String financialImpact;
    private String operatingConditions;
}
