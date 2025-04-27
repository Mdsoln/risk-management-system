package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class RiskActionPlanPojo {
    private String id;
    private String name;
    private String description;
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
    private List<RiskActionPlanMonitoringPojo> riskActionPlanMonitoring;
    private SimplifiedRiskPojo risk; 
}
