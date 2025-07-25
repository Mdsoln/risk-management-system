package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImpactDTO {
    private String severityRanking;
    private String assessment;
    private Integer score;
    private String color;
    private String colorName;
}
