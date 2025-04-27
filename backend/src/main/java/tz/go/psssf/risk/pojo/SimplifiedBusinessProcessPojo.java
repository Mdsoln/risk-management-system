package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimplifiedBusinessProcessPojo {
    private String id;
    private String name;
    private String description;
    private String startDateTime;
    private String endDateTime;
    private SimplifiedFundObjectivePojo fundObjective;
    private SimplifiedDepartmentPojo businessProcessOwnerDepartment; // Add this line
}
