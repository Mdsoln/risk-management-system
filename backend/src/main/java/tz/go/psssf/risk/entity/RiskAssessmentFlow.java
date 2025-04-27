package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_assessment_flow")
public class RiskAssessmentFlow extends BaseEntity {

    @OneToMany(mappedBy = "riskAssessmentFlow", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RiskAssessmentHistory> riskAssessmentHistories = new ArrayList<>();

    @OneToMany(mappedBy = "riskAssessmentFlow", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RiskAssessmentLevel> riskAssessmentLevels = new ArrayList<>();

    @OneToOne(mappedBy = "riskAssessmentFlow", cascade = CascadeType.ALL, orphanRemoval = true)
    private RiskAssessmentStatus riskAssessmentStatus;

    @PreUpdate
    private void preventUpdate() {
        throw new UnsupportedOperationException("Updates to RiskAssessmentFlow are not allowed.");
    }
}
