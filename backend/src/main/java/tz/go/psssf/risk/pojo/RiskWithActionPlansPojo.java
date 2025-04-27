package tz.go.psssf.risk.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class RiskWithActionPlansPojo {
    private SimplifiedListRiskPojo risk;
    private List<SimplifiedRiskActionPlanPojo> actionPlans;
}
