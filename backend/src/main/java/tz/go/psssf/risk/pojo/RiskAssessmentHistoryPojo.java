package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RiskAssessmentHistoryPojo {

    private String id;
    private LocalDateTime timestamp;
    private String performedBy;
    private RiskStatusPojo riskStatus;
    private RiskChampionPojo riskChampion;
    private DepartmentOwnerPojo departmentOwner;
    private RiskAssessmentFlowPojo riskAssessmentFlow;
    private RiskAssessmentLevelPojo riskAssessmentLevel;
    private String comment;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
