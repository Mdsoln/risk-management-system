package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class ControlIndicatorDTO {
	private String id;
    private String keyControlIndicator;
    private String description;
    private String purpose;
    private String riskControlId;
    private String monitoringFrequencyId;
    private String measurementId;
    private List<ControlIndicatorThresholdDTO> controlIndicatorThresholds;
}
