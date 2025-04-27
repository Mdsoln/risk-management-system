package tz.go.psssf.risk.compliance.pojo;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.pojo.DepartmentPojo;
import java.util.List;

@Getter
@Setter
public class ComplianceDocumentPojo {

    private String id;
    private String name;
    private int year;
    private String description;
    private ComplianceEntityPojo entity;
    private ComplianceDocumentCategoryPojo documentCategory;
    private DepartmentPojo department;
    private List<RegulatoryComplianceMatrixPojo> complianceMatrices;
}
