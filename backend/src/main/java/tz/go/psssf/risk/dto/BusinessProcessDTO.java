
package tz.go.psssf.risk.dto;

import java.time.LocalDateTime;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.validation.DateValidator;


@Getter
@Setter
public class BusinessProcessDTO {
    private String id;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 3, message = "Description must be at least 3 characters long")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @NotNull(message = "Fund Objective ID cannot be null")
    private String fundObjectiveId;

    @NotNull(message = "Business Process Owner Department ID cannot be null")
    private String businessProcessOwnerDepartmentId; // Add this line
    

    @NotNull(message = "Start Date and Time cannot be null")
    @PastOrPresent(message = "Start Date and Time cannot be in the future")
    private LocalDateTime startDateTime;

    @NotNull(message = "End Date and Time cannot be null")
    @Future(message = "End Date and Time must be in the future")
    private LocalDateTime endDateTime;

    @AssertTrue(message = "Start Date and Time must be before End Date and Time")
    public boolean isStartDateBeforeEndDate() {
        return DateValidator.isStartDateBeforeEndDate(startDateTime, endDateTime);
    }
}
