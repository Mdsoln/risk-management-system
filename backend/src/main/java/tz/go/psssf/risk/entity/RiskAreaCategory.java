package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk_area_category")
public class RiskAreaCategory extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 3, message = "Description must be at least 3 characters long")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Code cannot be null")
    @NotBlank(message = "Code cannot be blank")
    @Size(max = 50, message = "Code cannot exceed 50 characters")
    @Column(name = "code", unique = true)
    private String code;

    @OneToMany(mappedBy = "riskAreaCategory")
    private List<RiskArea> riskAreas = new ArrayList<>();
}
