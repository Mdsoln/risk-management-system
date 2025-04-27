package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RiskIndicatorActionPlanDTO {
    private String id;
    private String name;
    private String description;
    private String startDatetime;
    private String endDatetime;
    private String departmentId;
    private String riskIndicatorId;
    private List<RiskIndicatorActionPlanMonitoringDTO> riskIndicatorActionPlanMonitoring; // Add monitoring list
}
