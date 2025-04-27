package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiskDepartmentOwnerPojo {
    private String id; // DepartmentOwner id
    private UserPojo user; // Reference to UserPojo
}
