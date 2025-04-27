package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class RiskAssessmentFlowPojo {
    private String id;
    private List<RiskAssessmentHistoryPojo> riskAssessmentHistories;
    private List<RiskAssessmentLevelPojo> riskAssessmentLevels;
    private SimplifiedRiskAssessmentStatusPojo riskAssessmentStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
