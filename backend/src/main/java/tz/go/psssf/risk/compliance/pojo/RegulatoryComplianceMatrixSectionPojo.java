package tz.go.psssf.risk.compliance.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegulatoryComplianceMatrixSectionPojo {

    private String id;
    private String itemNumber;
    private String details;
    private String comment;
    private String recommendation;
    private ComplianceStatusPojo complianceStatus;
}
