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
public class RiskIndicatorThresholdId implements Serializable {
    private String thresholdCategoryId;
    private String riskIndicatorId;
}