package tz.go.psssf.risk.constants;

public class ResponseConstants {
	
//	PP - Success
//	PN - Negative Success
//	NP - Positive Failure
//	NN - Failure
	
//	11 - Success
//	10 - Negative Success
//	01 - Positive Failure
//	00 - Failure
	 // Success Response
    public static final String SUCCESS_CODE = "PP11";
    public static final String SUCCESS_MESSAGE = "Success";
    public static final String SUCCESS_DESCRIPTION = "The request was successful.";

    // Validation Error Response
    public static final String VALIDATION_ERROR_CODE = "NP10";
    public static final String VALIDATION_ERROR_MESSAGE = "Validation Error";
    public static final String VALIDATION_ERROR_DESCRIPTION = "Please check your input data.";

    // Not Found Response
    public static final String NOT_FOUND_CODE = "NP01";
    public static final String NOT_FOUND_MESSAGE = "No record found";
    public static final String NOT_FOUND_DESCRIPTION = "No data was found associating with your request.";

  

    // Internal Server Error Response
    public static final String INTERNAL_SERVER_ERROR_CODE = "NN00";
    public static final String INTERNAL_SERVER_ERROR_MESSAGE = "oops! Something went wrong.";
    public static final String INTERNAL_SERVER_ERROR_DESCRIPTION = "Something went wrong while processing the request.";

    // Unauthorized
    public static final String UNAUTHORIZED_ERROR_CODE = "0000";
    public static final String UNAUTHORIZED_MESSAGE = "Access Denied: Unauthorized.";
    public static final String UNAUTHORIZED_DESCRIPTION = "You do not have the necessary permissions to access this resource. Unauthorized access attempts are logged. Please ensure you are logged in with the correct credentials or contact your administrator for further assistance.";
    
    // Forbidden
    public static final String FORBIDDEN_ERROR_CODE = "403";
    public static final String FORBIDDEN_MESSAGE = "Access Denied. Forbidden.";
    public static final String FORBIDDEN_DESCRIPTION = "You do not have the necessary permissions to access this resource. Unauthorized access attempts are logged. Please ensure you are logged in with the correct credentials or contact your administrator for further assistance.";


}
