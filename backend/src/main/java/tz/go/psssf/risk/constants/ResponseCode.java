package tz.go.psssf.risk.constants;

public class ResponseCode {
	
	// ERRORS    
    public static final String INVALID_ID_PARAMETER_CODE = "E1001";
    public static final String INVALID_ID_PARAMETER_MESSAGE = "Invalid Id (Parameter)";
    public static final String INVALID_ID_PARAMETER_DESCRIPTION = "The request was successful.";
    
    
    public static final String INTERNAL_SERVER_ERROR_CODE = "E1002";
    public static final String INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server Error";
    public static final String INTERNAL_SERVER_ERROR_DESCRIPTION = "The server has encountered a situation it does not know how to handle.";
    
    public static final String NOT_FOUND_CODE = "E1003";
    public static final String NOT_FOUND_MESSAGE = "Record not found";
    public static final String NOT_FOUND_DESCRIPTION = "No record was found.";
    
    // SUCCESS
    public static final String SUCCESS_CODE = "S2001";
    public static final String SUCCESS_MESSAGE = "Success";
    public static final String SUCCESS_DESCRIPTION = "The request was successful.";
    
    
    // WARNING
    public static final String LIST_EMPTY_CODE = "W1001";
    public static final String LIST_EMPTY_MESSAGE = "List is Empty";
    public static final String LIST_EMPTY_DESCRIPTION =  "List is Empty";
}

