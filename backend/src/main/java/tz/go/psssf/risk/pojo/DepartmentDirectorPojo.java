package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DepartmentDirectorPojo {

    private String id;
    private String userId;
    private String departmentId;
    private List<DepartmentOwnerPojo> departmentOwners;
}
