package tz.go.psssf.risk.helper;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.inject.Inject;
import org.jboss.logging.Logger;

import jakarta.validation.ConstraintViolationException;
import tz.go.psssf.risk.constants.ResponseConstants;
import tz.go.psssf.risk.response.FieldError;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

public class ResponseHelper {

    @Inject
    static Logger log; // Inject the logger

    public static <T> ResponseWrapper<PaginatedResponse<T>> createPaginatedResponse(
            List<T> results, int page, long totalCount, int size) {
        int totalPages = PaginationHelper.calculateTotalPages(totalCount, size);
        boolean hasPrevious = page > 0;
        boolean hasNext = page < totalPages - 1;

        PaginatedResponse<T> paginatedResponse = new PaginatedResponse<>(
                page,
                totalPages,
                totalCount,
                size,
                hasPrevious,
                hasNext,
                results
        );

        if (results.isEmpty()) {
            return createNoListFoundResponse(paginatedResponse);
        } else {
            return createSuccessResponse(paginatedResponse);
        }
    }

    public static <T> ResponseWrapper<T> createErrorResponse(Exception exception) {
        System.err.println("################ createErrorResponse");
        FieldError[] errorMessages = { new FieldError("exception", exception.getMessage()) };
        return new ResponseWrapper<>(ResponseConstants.INTERNAL_SERVER_ERROR_CODE, ResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE, null, errorMessages);
    }

    public static <T> ResponseWrapper<T> createNotFoundResponse() {
        return new ResponseWrapper<>(ResponseConstants.NOT_FOUND_CODE, ResponseConstants.NOT_FOUND_MESSAGE, null);
    }

    public static <T> ResponseWrapper<T> createNoListFoundResponse(T data) {
        return new ResponseWrapper<>(ResponseConstants.NOT_FOUND_CODE, ResponseConstants.NOT_FOUND_MESSAGE, data);
    }

    public static <T> ResponseWrapper<T> createSuccessResponse(T data) {
        return new ResponseWrapper<>(ResponseConstants.SUCCESS_CODE, ResponseConstants.SUCCESS_MESSAGE, data);
    }

    public static <T> ResponseWrapper<T> createValidationErrorResponse(IllegalArgumentException exception) {
        System.err.println("################ createValidationErrorResponse");
        FieldError[] errorMessages = { new FieldError("exception", exception.getMessage()) };
        return new ResponseWrapper<>(ResponseConstants.VALIDATION_ERROR_CODE, ResponseConstants.VALIDATION_ERROR_MESSAGE, null, errorMessages);
    }

    public static <T> ResponseWrapper<T> createConstraintViolationErrorResponse(ConstraintViolationException exception) {
        System.err.println("################ createConstraintViolationErrorResponse");

        FieldError[] errorMessages = exception.getConstraintViolations().stream()
                .map(violation -> new FieldError(
                        violation.getPropertyPath().toString(),
                        violation.getMessage()))
                .toArray(FieldError[]::new);

        return new ResponseWrapper<>(ResponseConstants.VALIDATION_ERROR_CODE, ResponseConstants.VALIDATION_ERROR_MESSAGE, null, errorMessages);
    }

    public static <T> ResponseWrapper<T> createUnauthorizedResponse(String message) {
        System.err.println("################ createUnauthorizedResponse");

        // Use default message if the provided message is null or empty
        if (message == null || message.isEmpty()) {
            message = ResponseConstants.UNAUTHORIZED_MESSAGE;
        }

        return new ResponseWrapper<>(ResponseConstants.UNAUTHORIZED_ERROR_CODE, message, null);
    }


    private static String generateRefId() {
        return UUID.randomUUID().toString();
    }
}
