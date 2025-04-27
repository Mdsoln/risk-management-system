package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.enums.RecordStatus;

import java.time.LocalDateTime;

@Getter
@Setter
public class RiskActionPlanMonitoringPojo {
    private String id;
    private SimplifiedRiskActionPlanPojo riskActionPlan;
    private String comment;
    private LocalDateTime monitoringDatetime;
    
}
