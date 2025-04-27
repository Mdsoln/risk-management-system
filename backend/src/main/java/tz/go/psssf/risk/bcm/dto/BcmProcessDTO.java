package tz.go.psssf.risk.bcm.dto;


import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class BcmProcessDTO {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    private String name;

    @NotNull(message = "Priority Ranking cannot be null")
    private int priorityRanking;

    @NotNull(message = "RTO cannot be null")
    @NotBlank(message = "RTO cannot be blank")
    private String rto;

    @NotNull(message = "RPO cannot be null")
    @NotBlank(message = "RPO cannot be blank")
    private String rpo;

    @Size(max = 500, message = "Dependencies cannot exceed 500 characters")
    private String dependencies;

    @Size(max = 500, message = "Responsible Parties cannot exceed 500 characters")
    private String responsibleParties;

    @NotNull(message = "Department cannot be null")
    @NotBlank(message = "Department cannot be blank")
    private String departmentId;
}

