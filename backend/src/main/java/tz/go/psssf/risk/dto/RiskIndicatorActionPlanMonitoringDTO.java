package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiskIndicatorActionPlanMonitoringDTO {
    private String id;
    private String startDatetime;
    private String endDatetime;
    private String value;  
    private String measurementId; 
    private String riskIndicatorActionPlanId;  
}
