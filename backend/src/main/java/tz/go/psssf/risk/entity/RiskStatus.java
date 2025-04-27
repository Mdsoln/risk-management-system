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
@Table(name = "risk_status")
public class RiskStatus extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Code cannot be null")
    @NotBlank(message = "Code cannot be blank")
    @Size(max = 50, message = "Code cannot exceed 50 characters")
    @Column(name = "code", unique = true)
    private String code;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Type cannot be null")
    @NotBlank(message = "Type cannot be blank")
    @Size(max = 100, message = "Type cannot exceed 100 characters")
    @Column(name = "type")
    private String type;
}
