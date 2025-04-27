package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResidualRiskPojo {
    private LikelihoodPojo likelihood;
    private ImpactPojo impact;
    private Integer residualRiskRating;
    private String riskLevel;
    private String riskColor;
    private String riskDescription;
}
