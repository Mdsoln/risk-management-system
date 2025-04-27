//package tz.go.psssf.risk.pojo;
//
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class BusinessProcessPojo {
//    private String id;
//    private String name;
//    private String description;
//    private FundObjectivePojo fundObjective;
//    private DepartmentPojo businessProcessOwnerDepartment;
//    private String startDateTime;
//    private String endDateTime;
//}

package tz.go.psssf.risk.pojo;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.enums.RecordStatus;

@Getter
@Setter
public class BusinessProcessPojo {
    private String id;
    private String name;
    private String description;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private FundObjectivePojo fundObjective;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private RecordStatus status;
    
    private SimplifiedDepartmentPojo businessProcessOwnerDepartment;

}
