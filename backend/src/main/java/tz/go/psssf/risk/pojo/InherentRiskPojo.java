package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InherentRiskPojo {
    private LikelihoodPojo likelihood;
    private ImpactPojo impact;
    private Integer inherentRiskRating;
    private String riskLevel;
    private String riskColor;
    private String riskDescription;
}
