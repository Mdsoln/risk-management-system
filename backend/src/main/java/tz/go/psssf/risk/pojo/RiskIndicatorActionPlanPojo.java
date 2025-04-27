package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RiskIndicatorActionPlanPojo {
    private String id;
    private String name;
    private String description;
    private String startDatetime;
    private String endDatetime;
    private DepartmentPojo department;
    private SimplifiedRiskIndicatorPojo riskIndicator;
    private List<RiskIndicatorActionPlanMonitoringPojo> riskIndicatorActionPlanMonitoring; // Add monitoring list
}
