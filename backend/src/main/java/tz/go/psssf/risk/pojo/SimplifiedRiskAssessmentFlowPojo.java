package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class SimplifiedRiskAssessmentFlowPojo {
    private String id;
    private List<SimplifiedRiskAssessmentHistoryPojo> riskAssessmentHistories;
    private List<SimplifiedRiskAssessmentLevelPojo> riskAssessmentLevels;
    private SimplifiedRiskAssessmentStatusPojo riskAssessmentStatus;
}
