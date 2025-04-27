package tz.go.psssf.risk.pojo;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiskAssessmentLevelPojo {

    private String id;
    private String name;
    private String description;
    private int level;
    private SimplifiedRiskAssessmentFlowPojo riskAssessmentFlow;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
