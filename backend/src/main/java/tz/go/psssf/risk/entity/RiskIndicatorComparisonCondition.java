package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Audited
@Entity
@Table(name = "risk_indicator_comparison_operator")
public class RiskIndicatorComparisonCondition extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "risk_indicator_threshold_id", nullable = false)
    private RiskIndicatorThreshold riskIndicatorThreshold;

    @ManyToOne
    @JoinColumn(name = "comparison_operator_id", nullable = false)
    private ComparisonOperator comparisonOperator;

    @NotNull(message = "Bound cannot be null")
    @NotBlank(message = "Bound cannot be blank")
    @Size(max = 255, message = "Bound cannot exceed 255 characters")
    @Column(name = "bound")
    private String bound;
}
