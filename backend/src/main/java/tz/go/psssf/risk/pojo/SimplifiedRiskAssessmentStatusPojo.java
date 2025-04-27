package tz.go.psssf.risk.pojo;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimplifiedRiskAssessmentStatusPojo {
    private String id;
    private SimplifiedRiskStatusPojo riskStatus;
//    private SimplifiedRiskAssessmentFlowPojo riskAssessmentFlow;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
