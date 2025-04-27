package tz.go.psssf.risk.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SubCategoryDTO {
	
	@NotBlank(message = "Name cannot be blank")
	@NotNull(message = "Name cannot be null")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

	@NotBlank(message = "Category ID cannot be blank")
    @NotNull(message = "Category ID cannot be null")
    private String categoryId; // Id of the associated category

}
