package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_indicator_threshold")
public class RiskIndicatorThreshold extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "threshold_category_id")
    private ThresholdCategory thresholdCategory;

    @OneToMany(mappedBy = "riskIndicatorThreshold")
    private List<RiskIndicatorComparisonCondition> comparisonConditions;
    
    @ManyToOne
    @JoinColumn(name = "risk_indicator_id")
    private RiskIndicator riskIndicator;
}
