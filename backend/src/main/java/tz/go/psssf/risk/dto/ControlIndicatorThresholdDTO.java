package tz.go.psssf.risk.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ControlIndicatorThresholdDTO {
	private String id;
    private String thresholdCategoryId;
    private List<ComparisonConditionDTO> comparisonConditions;
}
