package tz.go.psssf.risk.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class RiskIndicatorComparisonConditionId implements Serializable {
    private String riskIndicatorThresholdId;
    private String comparisonOperatorId;
}