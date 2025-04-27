package tz.go.psssf.risk.report.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RiskCounterPojo {

    private long totalRiskCount;  // Total number of risks

    // A list to hold risk counts for each risk status
    private List<RiskStatusCount> riskStatusCounts;

    // Inner class representing the risk status and its count
    @Getter
    @Setter
    @AllArgsConstructor
    public static class RiskStatusCount {
        private String statusName;
        private long count;
    }
}