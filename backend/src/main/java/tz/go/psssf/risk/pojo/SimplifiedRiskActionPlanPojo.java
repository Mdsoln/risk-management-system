package tz.go.psssf.risk.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimplifiedRiskActionPlanPojo {
    private String id;
    private String name;
    private String description;
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
}
