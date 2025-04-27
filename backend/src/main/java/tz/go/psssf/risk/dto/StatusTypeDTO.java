package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusTypeDTO {
    private String id;
    private String name;
    private String code;
    private String description;
    private String type;
    private String color;  // Color name (e.g., "red", "blue", "green")
}
