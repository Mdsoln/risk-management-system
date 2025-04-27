package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComparisonConditionDTO {
	private String id;
    private String comparisonOperatorId;
    private String bound;
}
