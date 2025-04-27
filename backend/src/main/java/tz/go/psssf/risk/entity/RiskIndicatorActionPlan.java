package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_indicator_action_plan")
public class RiskIndicatorActionPlan extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Start date and time cannot be null")
    @Column(name = "start_datetime")
    private LocalDateTime startDatetime;

    @NotNull(message = "End date and time cannot be null")
    @Column(name = "end_datetime")
    private LocalDateTime endDatetime;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @ManyToOne
    @JoinColumn(name = "risk_indicator_id", nullable = false)
    private RiskIndicator riskIndicator;

    @OneToMany(mappedBy = "riskIndicatorActionPlan")
    private List<RiskIndicatorActionPlanMonitoring> riskIndicatorActionPlanMonitoring = new ArrayList<>();
}
