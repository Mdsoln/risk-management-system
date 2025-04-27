package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiskStatusPojo {
    private String id;
    private String name;
    private String code;
    private String description;
    private String type;
    private String createdBy;
    private String createdAt;
}
