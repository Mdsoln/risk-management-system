package tz.go.psssf.risk.compliance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import tz.go.psssf.risk.entity.BaseEntity;
import tz.go.psssf.risk.entity.Department;

import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "regulatory_compliance_matrix")
public class RegulatoryComplianceMatrix extends BaseEntity {

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

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    // Relationship: One-to-Many with RegulatoryComplianceMatrixSection
    @OneToMany(mappedBy = "regulatoryComplianceMatrix", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RegulatoryComplianceMatrixSection> sections;

    // Relationship: Many-to-One with ComplianceDocument
    @ManyToOne
    @JoinColumn(name = "compliance_document_id", nullable = false)
    private ComplianceDocument complianceDocument;
}
