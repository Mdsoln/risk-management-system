package tz.go.psssf.risk.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "department")
public class Department extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 3, message = "Description must be at least 3 characters long")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Code cannot be null")
    @NotBlank(message = "Code cannot be blank")
    @Size(max = 20, message = "Code cannot exceed 20 characters")
    @Column(name = "code", unique = true)
    private String code;

    @Size(max = 100, message = "Reference cannot exceed 100 characters")
    @Column(name = "reference", unique = true)
    private String reference;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "directorate_id", nullable = false)
    private Directorate directorate;

    @OneToMany(mappedBy = "department")
    private List<User> users;  
}
