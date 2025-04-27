package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_assessment_level")
public class RiskAssessmentLevel extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Level cannot be null")
    @Column(name = "level")
    private int level;

    @NotNull(message = "isCurrent cannot be null")
    @Column(name = "is_current")
    private boolean current;

    @NotNull(message = "isCompleted cannot be null")
    @Column(name = "is_completed")
    private boolean completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_assessment_flow_id", nullable = false)
    private RiskAssessmentFlow riskAssessmentFlow;

    @OneToMany(mappedBy = "riskAssessmentLevel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RiskAssessmentHistory> riskAssessmentHistories = new ArrayList<>();

    public void completeLevel() {
        this.current = false;
        this.completed = true;
    }

    public void activateLevel() {
        this.current = true;
        this.completed = false;
    }
}
