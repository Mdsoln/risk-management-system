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
@Table(name = "impact")
public class Impact extends BaseEntity {
	//Potential Loss / Impact

	@NotNull(message = "Severity Ranking cannot be null")
	@NotBlank(message = "Severity Ranking  cannot be blank")
	@Size(max = 255, message = "Severity Ranking cannot exceed 255 characters")
	@Column(name = "severity_ranking")
	private String severityRanking; // (Severity Ranking)

	@NotNull(message = "Assessment cannot be null")
	@NotBlank(message = "Assessment cannot be blank")
	@Size(min = 30, message = "Assessment must be at least 30 characters long")
	@Size(max = 5000, message = "Assessment cannot exceed 5000 characters")
	@Column(name="assessment", columnDefinition = "TEXT")
	private String assessment; // (Assessment)

	@NotNull(message = "Impact Score cannot be null")
	@Min(value = 0, message = "Impact Score must be greater than or equal to 0")
	@Max(value = 10, message = "Impact Score must be less than or equal to 10")
	@Column(name = "score", unique = true)
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
