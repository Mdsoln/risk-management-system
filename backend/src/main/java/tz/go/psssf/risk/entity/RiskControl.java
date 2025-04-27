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
@Table(name = "risk_control")
public class RiskControl extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 3, message = "Description must be at least 3 characters long")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    @Column(name ="description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Purpose cannot be null")
    @NotBlank(message = "Purpose cannot be blank")
    @Size(min = 3, message = "Purpose must be at least 3 characters long")
    @Size(max = 5000, message = "Purpose cannot exceed 5000 characters")
    @Column(name ="purpose", columnDefinition = "TEXT")
    private String purpose;

    @ManyToOne
    @JoinColumn(name = "risk_id")
    private Risk risk;

    @OneToMany(mappedBy = "riskControl")
    private List<ControlIndicator> controlIndicators;
    
    
//    @ManyToOne
//    @JoinColumn(name = "risk_control_owner", nullable = false)
//    private User riskControlOwner;
    
    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
    
  
}
