package tz.go.psssf.risk.entity;

import java.util.List;

import org.hibernate.envers.Audited;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
@Table(name = "monitoring_frequency")
public class MonitoringFrequency extends BaseEntity {

	@NotNull(message = "Frequency cannot be null")
	@NotBlank(message = "Frequency cannot be blank")
	@Size(max = 255, message = "Frequency cannot exceed 255 characters")
	@Column(name = "frequency")
	private String frequency;

	@NotNull(message = "Frequency Description cannot be null")
	@NotBlank(message = "Frequency Description cannot be blank")
	@Size(min = 3, message = "Frequency Description must be at least 3 characters long")
	@Size(max = 5000, message = "Frequency Description cannot exceed 5000 characters")
	@Column(name = "frequency_description", columnDefinition = "TEXT")
	private String frequencyDescription;
	
	
	@NotNull(message = "Frequency cannot be null")
	@NotBlank(message = "Frequency cannot be blank")
	@Size(max = 255, message = "Frequency cannot exceed 255 characters")
	@Column(name = "code", unique = true)
	private String code;

	@NotNull(message = "Level cannot be null")
	@Min(value = 0, message = "Level must be greater than or equal to 0")
	@Max(value = 100, message = "Level must be less than or equal to 100")
	@Column(name = "level")
	private Integer level;
	
	

	
	
//	@OneToMany(mappedBy = "monitoringFrequency")
//    private List<ControlIndicator> controlIndicators;
	
	// Constructor to accept ID
    public MonitoringFrequency(String id) {
        this.id = id;
    }

}
