package tz.go.psssf.risk.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import tz.go.psssf.risk.constants.ResponseConstants;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ResponseWrapper<T> {
    private String code;
    private String message;
    private T data;
    private FieldError[] errors;
    private String description;
    private String refId;

    // Constructor without errors and description
    public ResponseWrapper(String code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.errors = null;
        this.description = getDescriptionForCode(code);
        this.refId = generateRefId();
    }

    // Constructor with errors but without description
    public ResponseWrapper(String code, String message, T data, FieldError[] errors) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.errors = errors;
        this.description = getDescriptionForCode(code);
        this.refId = generateRefId();
    }

    // Factory methods to easily create instances for objects and lists
    public static <T> ResponseWrapper<T> createForObject(String code, String message, T data) {
        return new ResponseWrapper<>(code, message, data);
    }

    public static <T> ResponseWrapper<List<T>> createForList(String code, String message, List<T> data) {
        return new ResponseWrapper<>(code, message, data);
    }

    public static <T> ResponseWrapper<T> createWithErrors(String code, String message, T data, FieldError[] errors) {
        return new ResponseWrapper<>(code, message, data, errors);
    }

    // Overloaded method to handle a single FieldError
    public static <T> ResponseWrapper<T> createWithErrors(String code, String message, T data, FieldError error) {
        return new ResponseWrapper<>(code, message, data, new FieldError[]{error});
    }

    private String getDescriptionForCode(String code) {
        switch (code) {
            case ResponseConstants.SUCCESS_CODE:
                return ResponseConstants.SUCCESS_DESCRIPTION;
            case ResponseConstants.VALIDATION_ERROR_CODE:
                return ResponseConstants.VALIDATION_ERROR_DESCRIPTION;
            case ResponseConstants.NOT_FOUND_CODE:
                return ResponseConstants.NOT_FOUND_DESCRIPTION;
            case ResponseConstants.INTERNAL_SERVER_ERROR_CODE:
                return ResponseConstants.INTERNAL_SERVER_ERROR_DESCRIPTION;
            case ResponseConstants.UNAUTHORIZED_ERROR_CODE:
                return ResponseConstants.UNAUTHORIZED_DESCRIPTION;
            default:
                return "Unknown status code";
        }
    }

    private String generateRefId() {
        return UUID.randomUUID().toString();
    }
}
