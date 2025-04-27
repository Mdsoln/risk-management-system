package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.helper.RiskCalculationHelper;

@Getter
@Setter
@Audited
@Entity
@Table(name = "inherent_risk")
public class InherentRisk extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "likelihood_id", nullable = false)
    private Likelihood likelihood;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "impact_id", nullable = false)
    private Impact impact;

    @Transient
    private Integer inherentRiskRating;

    @Transient
    private String riskLevel;

    @Transient
    private String riskColor;

    @Transient
    private String riskDescription; 

    @PostLoad
    public void calculateInherentRiskRating() {
        if (likelihood != null && impact != null) {
            this.inherentRiskRating = likelihood.getScore() * impact.getScore();
            calculateRiskLevel();
        }
    }

    private void calculateRiskLevel() {
        RiskCalculationHelper.RiskLevelAndColor result = RiskCalculationHelper.calculateRiskLevelAndColor(likelihood, impact);
        this.riskLevel = result.getRiskLevel();
        this.riskColor = result.getRiskColor();
        this.riskDescription = result.getRiskDescription();
    }
}
