package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComparisonConditionPojo {
    private String id;
    private ComparisonOperatorPojo comparisonOperator;
    private String bound;
}
