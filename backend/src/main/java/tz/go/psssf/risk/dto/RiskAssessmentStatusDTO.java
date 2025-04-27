package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiskAssessmentStatusDTO {
    private String id;
    private String riskStatusId;
    private String riskId;
    private String riskAssessmentFlowId;
    private String createdBy;
    private String createdAt;
}
