package tz.go.psssf.risk.compliance.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplianceStatusPojo {
    private String id;
    private String statusName;
    private Double score;
    private String description;
}
