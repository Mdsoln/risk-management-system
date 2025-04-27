package tz.go.psssf.risk.entity;

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
@Table(name = "risk_cause")
public class RiskCause extends BaseEntity {



    @NotNull(message = "Cause description cannot be null")
    @NotBlank(message = "Cause description cannot be blank")
    @Size(min = 5, message = "Cause description must be at least 5 characters long")
    @Size(max = 5000, message = "Cause description cannot exceed 5000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id", nullable = false)
    private Risk risk;

}
