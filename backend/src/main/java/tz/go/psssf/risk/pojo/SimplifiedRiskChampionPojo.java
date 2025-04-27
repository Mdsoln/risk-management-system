package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimplifiedRiskChampionPojo {
    private String id;
    private String championName;
    private String championEmail;
    private String championPhone;
    private String nin;
    private SimplifiedDepartmentOwnerPojo departmentOwner;

}
