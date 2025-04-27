package tz.go.psssf.risk.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Audited
@Entity
@Table(name = "roles")
public class Role extends BaseEntity {

    @NotNull(message = "Code cannot be null")
    @NotBlank(message = "Code cannot be blank")
    @Size(min = 3, message = "Code must be at least 3 characters long")
    @Size(max = 100, message = "Code cannot exceed 100 characters")
    @Column(name = "code", unique = true, nullable = false)
    private String code;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, message = "Name must be at least 3 characters long")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 20, message = "Description must be at least 20 characters long")
    @Size(max = 255, message = "Description cannot exceed 255 characters")
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToMany(fetch = FetchType.EAGER) // Fetching eagerly to avoid LazyInitializationException
    @JoinTable(
        name = "role_permissions",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions = new HashSet<>();
}
