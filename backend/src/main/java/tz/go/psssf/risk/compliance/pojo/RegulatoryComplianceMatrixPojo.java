package tz.go.psssf.risk.compliance.pojo;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.pojo.DepartmentPojo;

import java.util.List;

@Getter
@Setter
public class RegulatoryComplianceMatrixPojo {

    private String id;
    private String itemNumber;
    private String details;
    private DepartmentPojo department;

    // One-to-Many relationship for sections
    private List<RegulatoryComplianceMatrixSectionPojo> sections;
}
