package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimplifiedDepartmentOwnerPojo {
    private String id;
    private String ownerName;
    private String ownerEmail;
    private String ownerPhone;
    private SimplifiedDepartmentPojo department;
    private String nin; 
}
