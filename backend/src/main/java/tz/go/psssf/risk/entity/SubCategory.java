package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Getter
@Setter
@Audited
@Entity
@Table(name = "sub_category")
public class SubCategory extends BaseEntity {

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @NotNull(message = "Category cannot be null")
    @JsonBackReference
    @ManyToOne
    private Category category;
}
