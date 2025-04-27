
package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Audited
@Entity
@Table(name = "control_indicator_comparison_condition")
public class ControlIndicatorComparisonCondition extends BaseEntity {

    
    @ManyToOne
    @JoinColumn(name = "control_indicator_threshold_id", nullable = false)
    private ControlIndicatorThreshold controlIndicatorThreshold;

    @ManyToOne
    @JoinColumn(name = "comparison_operator_id", nullable = false)
    private ComparisonOperator comparisonOperator;

    @NotNull(message = "Bound cannot be null")
    @NotBlank(message = "Bound cannot be blank")
    @Size(max = 255, message = "Bound cannot exceed 255 characters")
    @Column(name = "bound")
    private String bound;
}
