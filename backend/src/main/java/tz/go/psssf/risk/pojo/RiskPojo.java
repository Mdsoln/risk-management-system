package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.enums.RecordStatus;
import tz.go.psssf.risk.helper.RiskCalculationHelper;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class RiskPojo {
    private String id;
    private String name;
    private String description;
    private RiskAreaPojo riskArea;
    private DepartmentPojo department;
    private BusinessProcessPojo businessProcess;
    private InherentRiskPojo inherentRisk;
    private ResidualRiskPojo residualRisk;
    private List<RiskIndicatorPojo> riskIndicators;
    private List<RiskCausePojo> riskCauses;
    private List<RiskOpportunityPojo> riskOpportunities;
    private List<RiskControlPojo> riskControls;
    
    private List<RiskActionPlanPojo> riskActionPlans;


    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private RecordStatus status;

    private RiskAssessmentStatusPojo riskAssessmentStatus; 

    private RiskCalculationHelper.RiskMatrixResult inherentRiskMatrixResult;
    private RiskCalculationHelper.RiskMatrixResult residualRiskMatrixResult;
}
