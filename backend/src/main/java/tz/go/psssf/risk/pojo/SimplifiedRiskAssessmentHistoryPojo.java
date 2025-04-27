package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class SimplifiedRiskAssessmentHistoryPojo {
    private String id;
    private SimplifiedRiskStatusPojo riskStatus;
    private SimplifiedRiskChampionPojo riskChampion;
    private SimplifiedDepartmentOwnerPojo departmentOwner;
//    private SimplifiedRiskAssessmentFlowPojo riskAssessmentFlow;
    private SimplifiedRiskAssessmentLevelPojo riskAssessmentLevel;
    private LocalDateTime timestamp;
    private String performedBy;
    private String comment;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
