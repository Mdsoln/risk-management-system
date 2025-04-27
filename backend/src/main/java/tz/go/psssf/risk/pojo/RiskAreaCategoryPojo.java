package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class RiskAreaCategoryPojo {
    private String id;
    private String name;
    private String description;
    private String code;
    private List<SimplifiedRiskAreaPojo> riskAreas; // List of simplified RiskArea
}
