package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_assessment_history")
public class RiskAssessmentHistory extends BaseEntity {

    @NotNull(message = "Timestamp cannot be null")
    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @NotNull(message = "Performed by cannot be null")
    @NotBlank(message = "Performed by cannot be blank")
    @Size(max = 255, message = "Performed by cannot exceed 255 characters")
    @Column(name = "performed_by")
    private String performedBy;

    @NotNull(message = "Status cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    private RiskStatus riskStatus;

      
    @NotNull(message = "user cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_assessment_flow_id", nullable = false)
    private RiskAssessmentFlow riskAssessmentFlow;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_assessment_level_id", nullable = false)
    private RiskAssessmentLevel riskAssessmentLevel;

    @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;
}
