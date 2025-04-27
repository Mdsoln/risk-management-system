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
@Table(name = "regulatory_compliance_matrix_section")
public class RegulatoryComplianceMatrixSection extends BaseEntity {

    @NotNull(message = "Item number cannot be null")
    @NotBlank(message = "Item number cannot be blank")
    @Size(min = 1, max = 50, message = "Item number must be between 1 and 50 characters")
    @Column(name = "item_number")
    private String itemNumber;

    @NotNull(message = "Details cannot be null")
    @NotBlank(message = "Details cannot be blank")
    @Size(min = 10, max = 5000, message = "Details must be between 10 and 5000 characters")
    @Column(name = "details", columnDefinition = "TEXT")
    private String details;

    @NotNull(message = "Compliance status cannot be null")
    @ManyToOne
    @JoinColumn(name = "compliance_status_id", nullable = false)
    private ComplianceStatus complianceStatus;

    @Size(max = 5000, message = "Comment cannot exceed 5000 characters")
    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Size(max = 5000, message = "Recommendation cannot exceed 5000 characters")
    @Column(name = "recommendation", columnDefinition = "TEXT")
    private String recommendation;

    // Relationship: Many-to-One with RegulatoryComplianceMatrix
    @ManyToOne
    @JoinColumn(name = "regulatory_compliance_matrix_id", nullable = false)
    private RegulatoryComplianceMatrix regulatoryComplianceMatrix;
}
