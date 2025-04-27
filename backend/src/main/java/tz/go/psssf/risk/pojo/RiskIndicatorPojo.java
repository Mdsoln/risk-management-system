package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class RiskIndicatorPojo {
    private String id;
    private String indicator;
    private String description;
    private String purpose;
    private SimplifiedRiskPojo risk;
    private MonitoringFrequencyPojo monitoringFrequency;
    private MeasurementPojo measurement;
    private List<RiskIndicatorThresholdPojo> riskIndicatorThresholds;
    private List<RiskIndicatorActionPlanPojo> riskIndicatorActionPlans; 
}
