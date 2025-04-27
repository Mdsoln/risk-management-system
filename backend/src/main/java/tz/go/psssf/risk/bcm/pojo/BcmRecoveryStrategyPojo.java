package tz.go.psssf.risk.bcm.pojo;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BcmRecoveryStrategyPojo {
    private String id;
    private String strategyType;
    private boolean availability;
    private String recoveryTime;
    private String comments;
    private BcmDependencyPojo dependency; // Reference to dependency
}
