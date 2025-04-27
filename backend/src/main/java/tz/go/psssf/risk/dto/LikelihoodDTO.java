package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikelihoodDTO {
    private String likelihoodCategory;
    private String categoryDefinition;
    private Integer score;
    private String color;
    private String colorName;
}
