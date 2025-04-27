package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiskIndicatorActionPlanMonitoringPojo {
    private String id;
    private String startDatetime;
    private String endDatetime;
    private String value;  // String to accept any measurement value
    private MeasurementPojo measurement;  // Add measurement reference
}
