package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class RiskAssessmentFlowDTO {
    private String id;
    private List<RiskAssessmentHistoryDTO> riskAssessmentHistories;
    private List<RiskAssessmentLevelDTO> riskAssessmentLevels;
    private RiskAssessmentStatusDTO riskAssessmentStatus;
}
