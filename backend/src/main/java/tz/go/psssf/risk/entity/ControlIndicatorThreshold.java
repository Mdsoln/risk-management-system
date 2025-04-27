package tz.go.psssf.risk.entity;

import java.util.List;

import org.hibernate.envers.Audited;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Audited
@Entity
@Table(name = "control_indicator_threshold")
public class ControlIndicatorThreshold extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "threshold_category_id")
    private ThresholdCategory thresholdCategory;

    @OneToMany(mappedBy = "controlIndicatorThreshold")
    private List<ControlIndicatorComparisonCondition> comparisonConditions;

    @ManyToOne
    @JoinColumn(name = "control_indicator_id")
    private ControlIndicator controlIndicator;
}
