package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class DirectoratePojo {
    private String id;
    private String name;
    private String description;
    private String code;
    private String reference;
    private String type;
    private String shortName;
    private List<DepartmentPojo> departments;
}
