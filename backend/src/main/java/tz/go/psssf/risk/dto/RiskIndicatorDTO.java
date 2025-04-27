package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class RiskIndicatorDTO {
    private String id;
    private String indicator;
    private String description;
    private String purpose;
    private String riskId;
    private String monitoringFrequencyId;
    private String measurementId;
    private List<RiskIndicatorThresholdDTO> riskIndicatorThresholds;
    private List<RiskIndicatorActionPlanDTO> riskIndicatorActionPlans; // New field added
}
