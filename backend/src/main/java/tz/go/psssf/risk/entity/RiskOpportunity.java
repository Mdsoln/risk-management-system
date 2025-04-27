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
@Table(name = "risk_opportunity")
public class RiskOpportunity extends BaseEntity {

  

    @NotNull(message = "Opportunity description cannot be null")
    @NotBlank(message = "Opportunity description cannot be blank")
    @Size(min = 5, message = "Opportunity description must be at least 5 characters long")
    @Size(max = 5000, message = "Opportunity description cannot exceed 5000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "risk_id", nullable = false)
    private Risk risk;

}
