package tz.go.psssf.risk.pojo;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ControlIndicatorThresholdPojo {
    private String id;
    private ThresholdCategoryPojo thresholdCategory;
    private List<ComparisonConditionPojo> comparisonConditions;
}
