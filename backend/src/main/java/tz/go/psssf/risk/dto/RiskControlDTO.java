// RiskControlDTO.java
package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class RiskControlDTO {
	private String id;
    private String name;
    private String description;
    private String purpose;
    private String riskId;
    private String departmentId;
    private List<ControlIndicatorDTO> controlIndicators;
}	