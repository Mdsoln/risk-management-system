package tz.go.psssf.risk.report.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class RiskActionPlanCounterPojo {

    private long totalActionPlans;
    private List<ActionPlanStatusCount> statusCounts;

    @Data
    @AllArgsConstructor
    public static class ActionPlanStatusCount {
        private String statusName;
        private long count;
        private double percentage;
    }
}