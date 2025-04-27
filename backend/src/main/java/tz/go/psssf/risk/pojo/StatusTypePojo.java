package tz.go.psssf.risk.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusTypePojo {
    private String id;
    private String name;
    private String code;
    private String description;
    private String type;
    private String color;  // Color name (e.g., "red", "blue", "green")
}
