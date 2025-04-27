package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikelihoodPojo {
    private String id;
    private String likelihoodCategory;
    private String categoryDefinition;
    private Integer score;
    private String color;
    private String colorName;
}
