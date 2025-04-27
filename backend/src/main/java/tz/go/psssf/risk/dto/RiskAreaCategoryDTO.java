package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RiskAreaCategoryDTO {
    private String id;
    private String name;
    private String description;
    private String code;
    private List<RiskAreaDTO> riskAreas;
}
