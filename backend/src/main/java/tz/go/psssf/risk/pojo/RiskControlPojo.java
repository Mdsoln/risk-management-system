// RiskControlPojo.java
package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class RiskControlPojo {
    private String id;
    private String name;
    private String description;
    private String purpose;
    private SimplifiedRiskPojo risk;
    private DepartmentPojo department;
    private List<ControlIndicatorPojo> controlIndicators;
}