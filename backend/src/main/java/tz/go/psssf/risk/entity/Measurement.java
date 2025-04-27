package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Audited
@Entity
@Table(name = "measurement")
public class Measurement extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 3, message = "Description must be at least 3 characters long")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    @Column(name ="description", columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "code cannot be null")
    @NotBlank(message = "code cannot be blank")
    @Size(max = 255, message = "code cannot exceed 255 characters")
    @Column(name = "code", unique = true)
    private String code;
    
    // Constructor to accept ID
    public Measurement(String id) {
        this.id = id;
    }
}
