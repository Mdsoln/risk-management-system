package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImpactPojo {
    private String id;
    private String severityRanking;
    private String assessment;
    private Integer score;
    private String color;
    private String colorName;
}
