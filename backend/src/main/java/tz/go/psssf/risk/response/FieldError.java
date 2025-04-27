package tz.go.psssf.risk.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FieldError {
	
	private String field;
    private String message;

}
