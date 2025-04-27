package tz.go.psssf.risk.report.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportDashboardPojo {
    private String id;
    private String code;
    private String name;
    private Object payload;  // Change from String to Object to hold JSON data
}