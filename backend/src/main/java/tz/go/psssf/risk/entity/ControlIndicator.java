package tz.go.psssf.risk.entity;

import java.util.List;
import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Audited
@Entity
@Table(name = "control_indicator")
public class ControlIndicator extends BaseEntity {

    @NotNull(message = "Indicator cannot be null")
    @NotBlank(message = "Indicator cannot be blank")
    @Size(max = 255, message = "Indicator cannot exceed 255 characters")
    @Column(name = "key_control_indicator")
    private String keyControlIndicator;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 3, message = "Description must be at least 3 characters long")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Purpose cannot be null")
    @NotBlank(message = "Purpose cannot be blank")
    @Size(min = 3, message = "Purpose must be at least 3 characters long")
    @Size(max = 5000, message = "Purpose cannot exceed 5000 characters")
    @Column(name = "purpose", columnDefinition = "TEXT")
    private String purpose;

    @ManyToOne
    @JoinColumn(name = "risk_control_id")
    private RiskControl riskControl;

    @ManyToOne
    @JoinColumn(name = "monitoring_frequency_id", nullable = false)
    private MonitoringFrequency monitoringFrequency;

    @ManyToOne
    @JoinColumn(name = "measurement_id")
    private Measurement measurement;

    @OneToMany(mappedBy = "controlIndicator")
    private List<ControlIndicatorThreshold> controlIndicatorThresholds;
}
