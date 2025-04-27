package tz.go.psssf.risk.pojo;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimplifiedRiskAssessmentLevelPojo {
    private String id;
    private String name;
    private String description;
    private boolean current;
    private boolean compeleted;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
