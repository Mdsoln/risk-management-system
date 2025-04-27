package tz.go.psssf.risk.compliance.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplianceEntityPojo {
    private String id;
    private String name;
    private String description;
    private ComplianceEntityCategoryPojo category;
}
