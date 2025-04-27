package tz.go.psssf.risk.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_action_plan_monitoring")
public class RiskActionPlanMonitoring extends BaseEntity {

    @NotNull(message = "Risk Action Plan cannot be null")
    @ManyToOne
    @JoinColumn(name = "risk_action_plan_id", nullable = false)
    private RiskActionPlan riskActionPlan;

    @NotNull(message = "Comment cannot be null")
    @Size(max = 5000, message = "Comment cannot exceed 5000 characters")
    @Column(name = "comment", columnDefinition = "TEXT", nullable = false)
    private String comment;

    @NotNull(message = "Monitoring date and time cannot be null")
    @Column(name = "monitoring_datetime", nullable = false)
    private LocalDateTime monitoringDatetime;
}
