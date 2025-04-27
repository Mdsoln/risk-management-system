package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InherentRiskDTO {
    private LikelihoodDTO likelihood;
    private ImpactDTO impact;
//    private Integer inherentRiskRating;
//    private String riskLevel;
//    private String riskColor;
//    private String riskDescription;
}
