package tz.go.psssf.risk.bcm.pojo;


import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.pojo.DepartmentPojo;

@Getter
@Setter
public class BcmProcessPojo {
    private String id;
    private String name;
    private int priorityRanking;
    private String rto;
    private String rpo;
    private String dependencies;
    private String responsibleParties;
    private DepartmentPojo department;
}
