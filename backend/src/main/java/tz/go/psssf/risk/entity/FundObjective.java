package tz.go.psssf.risk.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.envers.Audited;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.validation.DateValidator;

@Getter
@Setter
@Audited
@Entity
@Table(name = "fund_objective")
public class FundObjective extends BaseEntity {

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
    
    @NotNull(message = "Start Date and Time cannot be null")
    @PastOrPresent(message = "Start Date and Time cannot be in the future")
    @Column(name = "start_date_time")
    private LocalDateTime startDateTime;

    @NotNull(message = "End Date and Time cannot be null")
    @Future(message = "End Date and Time must be in the future")
    @Column(name = "end_date_time")
    private LocalDateTime endDateTime;

    @AssertTrue(message = "Start Date and Time must be before End Date and Time")
    public boolean isStartDateBeforeEndDate() {
        return DateValidator.isStartDateBeforeEndDate(startDateTime, endDateTime);
    }

//    @JsonManagedReference
    @OneToMany(mappedBy = "fundObjective")
    private List<BusinessProcess> businessProcess;
}
