package tz.go.psssf.risk.bcm.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_recovery_strategy")
public class BcmRecoveryStrategy extends BaseEntity {

    @NotNull(message = "Strategy Type cannot be null")
    @NotBlank(message = "Strategy Type cannot be blank")
    @Column(name = "strategy_type")
    private String strategyType;

    @NotNull(message = "Availability cannot be null")
    @Column(name = "availability")
    private boolean availability;

    @NotNull(message = "Recovery Time cannot be null")
    @Size(max = 255, message = "Recovery Time cannot exceed 255 characters")
    @Column(name = "recovery_time")
    private String recoveryTime;

    @Size(max = 500, message = "Comments cannot exceed 500 characters")
    @Column(name = "comments")
    private String comments;

    @ManyToOne
    @JoinColumn(name = "dependency_id", nullable = false)
    private BcmDependency dependency;
}
