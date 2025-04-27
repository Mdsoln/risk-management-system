package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class RiskActionPlanDTO {
	
	private String id;

    @NotNull(message = "Risk ID cannot be null")
    @NotBlank(message = "Risk ID cannot be blank")
    private String riskId;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 20, max = 255, message = "Name must be between 20 and 255 characters long")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 100, max = 5000, message = "Description must be between 100 and 5000 characters long")
    private String description;

    @NotNull(message = "Start date and time cannot be null")
    private LocalDateTime startDatetime;

    @NotNull(message = "End date and time cannot be null")
    private LocalDateTime endDatetime;

    private List<RiskActionPlanMonitoringDTO> riskActionPlanMonitoring;
}
