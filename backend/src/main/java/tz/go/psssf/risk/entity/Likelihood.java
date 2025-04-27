package tz.go.psssf.risk.entity;

import org.hibernate.envers.Audited;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Audited
@Entity
@Table(name = "likelihood")
public class Likelihood extends BaseEntity {

    @NotNull(message = "Likelihood category cannot be null")
    @NotBlank(message = "Likelihood category cannot be blank")
    @Size(max = 255, message = "Likelihood category cannot exceed 255 characters")
    @Column(name = "likelihood_category")
    private String likelihoodCategory;

    @NotNull(message = "Category definition cannot be null")
    @NotBlank(message = "Category definition cannot be blank")
    @Size(min = 50, message = "Category definition must be at least 50 characters long")
    @Size(max = 5000, message = "Category definition cannot exceed 5000 characters")
    @Column(name = "category_definition", columnDefinition = "TEXT")
    private String categoryDefinition;
    
    @NotNull(message = "Likelihood Score cannot be null")
    @Min(value = 0, message = "Likelihood Score must be greater than or equal to 0")
    @Max(value = 10, message = "Likelihood Score must be less than or equal to 10")
    @Column(name ="score", unique = true)
    private Integer score;
    
    @NotNull(message = "Color Name cannot be null")
    @NotBlank(message = "Color Name cannot be blank")
    @Size(max = 255, message = "Color Name cannot exceed 255 characters")
    @Column(name = "color_name")
    private String colorName;
    
    
    @NotNull(message = "Color cannot be null")
    @NotBlank(message = "Color cannot be blank")
    @Size(max = 255, message = "Color cannot exceed 255 characters")
    @Column(name = "color")
    private String color;
    

}
