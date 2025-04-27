package tz.go.psssf.risk.bcm.pojo;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.pojo.DepartmentPojo;

@Getter
@Setter
public class StatusReportPojo {
    private String id;
//    private String businessUnit;
    private DepartmentPojo department; // Updated from businessUnit

    private String reportDate;
    private String reportTime;
    private String staff;
    private String customers;
    private String workInProgress;
    private String financialImpact;
    private String operatingConditions;
}
