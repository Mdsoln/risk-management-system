package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class ControlIndicatorPojo {
    private String id;
    private String keyControlIndicator;
    private String description;
    private String purpose;
    private SimplifiedRiskControlPojo riskControl;
    private MonitoringFrequencyPojo monitoringFrequency;
    private MeasurementPojo measurement;
    private List<ControlIndicatorThresholdPojo> controlIndicatorThresholds;
}
