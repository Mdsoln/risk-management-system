package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RiskOwnerPojo {
    private String id; // Department id
    private String name;
    private String description;
    private String code;
    private List<RiskDepartmentOwnerPojo> riskDepartmentOwners;
}
