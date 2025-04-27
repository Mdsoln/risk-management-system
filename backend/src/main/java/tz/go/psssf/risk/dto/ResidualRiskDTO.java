package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResidualRiskDTO {
    private LikelihoodDTO likelihood;
    private ImpactDTO impact;
    private Integer residualRiskRating;
//    private String riskLevel;
//    private String riskColor;
//    private String riskDescription;
}
