package tz.go.psssf.risk.bcm.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_impact_assessment")
public class BcmImpactAssessment extends BaseEntity {

    @NotNull(message = "Impact Type cannot be null")
    @NotBlank(message = "Impact Type cannot be blank")
    @Column(name = "impact_type")
    private String impactType;

    @NotNull(message = "Severity Level cannot be null")
    @Column(name = "severity_level")
    private int severityLevel;

    @NotNull(message = "Time to Recover cannot be null")
    @Size(max = 255, message = "Time to Recover cannot exceed 255 characters")
    @Column(name = "time_to_recover")
    private String timeToRecover;

    @ManyToOne
    @JoinColumn(name = "process_id", nullable = true)
    private BcmProcess process;

    @ManyToOne
    @JoinColumn(name = "sub_process_id", nullable = true)
    private BcmSubProcess subProcess;
}

