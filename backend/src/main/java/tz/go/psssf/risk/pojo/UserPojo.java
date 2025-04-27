package tz.go.psssf.risk.pojo;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPojo {
    
    private String id;
    private String nin;

    private ProfileDetailsPojo profileDetails; 

    private UserTypePojo userType;

    private Set<RolePojo> roles;

    private DepartmentPojo department;  // Add department reference here
}
