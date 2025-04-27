package tz.go.psssf.risk.compliance.entity;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import tz.go.psssf.risk.report.event.listener.RiskEntityListener;
import org.hibernate.annotations.FilterDef;
import org.hibernate.envers.Audited;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.ParamDef;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "compliance_document_category", uniqueConstraints = @UniqueConstraint(columnNames = {"code"}))
//@EntityListeners(RiskEntityListener.class)
//@FilterDef(name = "activeFilter", parameters = @ParamDef(name = "status", type = String.class))
public class ComplianceDocumentCategory extends BaseEntity {

    @NotNull(message = "Code cannot be null")
    @NotBlank(message = "Code cannot be blank")
    @Size(min = 3, max = 50, message = "Code must be between 3 and 50 characters")
    @Column(name = "code", unique = true, nullable = false)
    private String code;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 255)
    @Column(name = "name")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 10, max = 5000)
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "documentCategory", cascade = CascadeType.ALL, orphanRemoval = true)
//    @Filter(name = "activeFilter", condition = "status = :status")
    private List<ComplianceDocument> documents = new ArrayList<>();
}
