package tz.go.psssf.risk.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

import org.hibernate.envers.Audited;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Getter
@Setter
@Audited
@Entity
@Table(name = "category")
public class Category extends BaseEntity {

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @JsonManagedReference
    @OneToMany(mappedBy = "category")
    private List<SubCategory> subCategories;
}
