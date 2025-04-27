package tz.go.psssf.risk.bcm.pojo;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BcmImpactAssessmentPojo {
    private String id;
    private String impactType;
    private int severityLevel;
    private String timeToRecover;
    private BcmProcessPojo process; // Reference to process
    private BcmSubProcessPojo subProcess; // Optional reference to sub-process
}

