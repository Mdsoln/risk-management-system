package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiskAreaPojo {
    private String id;
    private String name;
    private String description;
    private String code;
    private SimplifiedRiskAreaCategoryPojo riskAreaCategory; // Simplified category
}
