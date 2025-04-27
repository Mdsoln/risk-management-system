package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MonitoringFrequencyPojo {
    private String id;
    private String frequency;
    private String frequencyDescription;
    private String code;
    private Integer level;
}
