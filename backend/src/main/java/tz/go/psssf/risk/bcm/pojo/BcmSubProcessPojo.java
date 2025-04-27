package tz.go.psssf.risk.bcm.pojo;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BcmSubProcessPojo {
    private String id;
    private String name;
    private int priorityRanking;
    private String rto;
    private String rpo;
    private String dependencies;
    private String responsibleParties;
    private String quantitativeImpact;
    private BcmProcessPojo process; // Reference to parent process
}

