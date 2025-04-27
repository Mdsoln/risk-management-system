package tz.go.psssf.risk.compliance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import tz.go.psssf.risk.entity.BaseEntity;

@Getter
@Setter
@Audited
@Entity
@Table(name = "compliance_status")
public class ComplianceStatus extends BaseEntity {

    @NotNull(message = "Status name cannot be null")
    @NotBlank(message = "Status name cannot be blank")
    @Size(max = 100, message = "Status name cannot exceed 100 characters")
    @Column(name = "status_name", unique = true)
    private String statusName;

    @NotNull(message = "Score cannot be null")
    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "1.0", message = "Score cannot be more than 1")
    @Column(name = "score")
    private Double score;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 10, max = 5000, message = "Description must be between 10 and 5000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
