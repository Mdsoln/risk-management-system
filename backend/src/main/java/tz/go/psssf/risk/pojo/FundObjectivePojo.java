//package tz.go.psssf.risk.pojo;
//
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class FundObjectivePojo {
//    private String id;
//    private String name;
//    private String description;
//    private String startDateTime;
//    private String endDateTime;
//}


package tz.go.psssf.risk.pojo;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.enums.RecordStatus;

@Getter
@Setter
public class FundObjectivePojo {
    private String id;
    private String name;
    private String description;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private List<BusinessProcessPojo> businessProcesses;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private RecordStatus status;
}
