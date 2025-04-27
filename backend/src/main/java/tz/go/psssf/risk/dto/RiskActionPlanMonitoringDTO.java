package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
public class RiskActionPlanMonitoringDTO {
	
	private String id;

    @NotNull(message = "Risk Action Plan ID cannot be null")
    private String riskActionPlanId;

    @NotNull(message = "Comment cannot be null")
    @Size(max = 5000, message = "Comment cannot exceed 5000 characters")
    private String comment;

    @NotNull(message = "Monitoring date and time cannot be null")
    private LocalDateTime monitoringDatetime;
}
