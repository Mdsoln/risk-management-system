package tz.go.psssf.risk.compliance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import tz.go.psssf.risk.entity.BaseEntity;
import tz.go.psssf.risk.entity.Department;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "compliance_document")
public class ComplianceDocument extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Year cannot be null")
    @Min(value = 1900, message = "Year cannot be before 1900")
    @Max(value = 2100, message = "Year cannot be after 2100")
    @Column(name = "year")
    private int year;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 10, max = 5000, message = "Description must be between 10 and 5000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "entity_id", nullable = false)
    private ComplianceEntity entity;

    @ManyToOne
    @JoinColumn(name = "document_category_id", nullable = false)
    private ComplianceDocumentCategory documentCategory;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    // Relationship: One-to-Many with RegulatoryComplianceMatrix
    @OneToMany(mappedBy = "complianceDocument", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RegulatoryComplianceMatrix> complianceMatrices = new ArrayList<>();
}
