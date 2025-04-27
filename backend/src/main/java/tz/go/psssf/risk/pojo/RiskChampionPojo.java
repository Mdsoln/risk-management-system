//package tz.go.psssf.risk.pojo;
//
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class RiskChampionPojo {
//    private String id;
//    private String championName;
//    private String championEmail;
//    private String championPhone;
//    private SimplifiedDepartmentOwnerPojo departmentOwner;
//    private String nin; // Add this line
//}
package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiskChampionPojo {

    private String id;
    private String userId;
    private String departmentOwnerId;
}
