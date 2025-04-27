//package tz.go.psssf.risk.pojo;
//
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class DepartmentOwnerPojo {
//    private String id;
//    private String nin;
//    private String ownerName;
//    private String ownerEmail;
//    private String ownerPhone;
//    private SimplifiedDepartmentPojo department;
//}
package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DepartmentOwnerPojo {

    private String id;
    private String userId;
    private String departmentDirectorId;
    private List<RiskChampionPojo> riskChampions;
    private List<DepartmentMemberPojo> departmentMembers;
}
