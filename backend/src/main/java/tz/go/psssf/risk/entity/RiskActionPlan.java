package tz.go.psssf.risk.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.report.event.listener.RiskActionPlanEntityListener;

import org.hibernate.envers.Audited;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_action_plan")
@EntityListeners(RiskActionPlanEntityListener.class) 
public class RiskActionPlan extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 20, max = 255, message = "Name must be between 20 and 255 characters long")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 100, max = 5000, message = "Description must be between 100 and 5000 characters long")
    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @NotNull(message = "Start date and time cannot be null")
    @Column(name = "start_datetime", nullable = false)
    private LocalDateTime startDatetime;

    @NotNull(message = "End date and time cannot be null")
    @Column(name = "end_datetime", nullable = false)
    private LocalDateTime endDatetime;
    
    @ManyToOne
    @JoinColumn(name = "risk_id", nullable = false)
    private Risk risk;

    @OneToMany(mappedBy = "riskActionPlan")
    private List<RiskActionPlanMonitoring> riskActionPlanMonitoring = new ArrayList<>();
}
