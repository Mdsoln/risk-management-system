package tz.go.psssf.risk.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import tz.go.psssf.risk.validation.ValidNin;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Audited
@Entity
@Table(name = "users")  // Using plural table name "users" because "user" is a reserved keyword in many databases
@Inheritance(strategy = InheritanceType.JOINED)  // or InheritanceType.SINGLE_TABLE depending on your design
public class User extends ProfileDetails {

    @NotNull(message = "NIN cannot be null")
    @NotBlank(message = "NIN cannot be blank")
    @ValidNin
    @Size(max = 20, message = "NIN cannot exceed 20 characters")
    @Column(name = "nin", unique = true, nullable = false)
    private String nin;

    @NotNull(message = "Password cannot be null")
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Size(max = 255, message = "Password cannot exceed 255 characters")
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull(message = "User type cannot be null")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_type_id", nullable = false)
    private UserType userType;

    @ManyToMany(fetch = FetchType.EAGER) // Fetching eagerly to avoid LazyInitializationException
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id", nullable = true)
    private Department department;
}
