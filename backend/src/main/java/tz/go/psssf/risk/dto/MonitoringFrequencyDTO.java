package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MonitoringFrequencyDTO {
    private String id;
    private String frequency;
    private String frequencyDescription;
    private String code;
    private Integer level;
}
