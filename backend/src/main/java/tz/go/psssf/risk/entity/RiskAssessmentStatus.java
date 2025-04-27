package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_assessment_status")
public class RiskAssessmentStatus extends BaseEntity {

    @NotNull(message = "Risk status cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_status_id", nullable = false)
    private RiskStatus riskStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id", nullable = true)
    private Risk risk;

    @NotNull(message = "Risk assessment flow cannot be null")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_assessment_flow_id", nullable = false)
    private RiskAssessmentFlow riskAssessmentFlow;

    public void setRisk(Risk risk) {
        setRisk(risk, true);
    }

    public void setRisk(Risk risk, boolean updateRelationship) {
        this.risk = risk;
        if (updateRelationship && risk != null && risk.getRiskAssessmentStatus() != this) {
            risk.setRiskAssessmentStatus(this);
        }
    }
}
