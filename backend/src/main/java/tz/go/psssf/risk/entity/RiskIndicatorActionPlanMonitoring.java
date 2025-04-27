package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_indicator_action_plan_monitoring")
public class RiskIndicatorActionPlanMonitoring extends BaseEntity {

    @NotNull(message = "Start date and time cannot be null")
    @Column(name = "start_datetime")
    private LocalDateTime startDatetime;

    @NotNull(message = "End date and time cannot be null")
    @Column(name = "end_datetime")
    private LocalDateTime endDatetime;

    @NotNull(message = "Value cannot be null")
    @Column(name = "value", columnDefinition = "TEXT")
    private String value;

    @ManyToOne
    @JoinColumn(name = "risk_indicator_action_plan_id", nullable = false)
    private RiskIndicatorActionPlan riskIndicatorActionPlan;

    @ManyToOne
    @JoinColumn(name = "measurement_id", nullable = false)
    private Measurement measurement;
}
