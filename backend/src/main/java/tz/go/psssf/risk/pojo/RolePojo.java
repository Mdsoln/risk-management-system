package tz.go.psssf.risk.pojo;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RolePojo {
    private String id;
    private String code;
    private String name;
    private String description;
    private Set<PermissionPojo> permissions;

}
