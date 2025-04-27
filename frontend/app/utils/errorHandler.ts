import { ApiResponse, ErrorState, FieldError } from '@/app/types/api';
import { FormInstance, message } from 'antd';

export const handleErrorResponse = (
    error?: any,
    setErrorState?: (errorState: ErrorState | null) => void,
    handleFormErrors?: (errors: FieldError[], form: FormInstance) => void,
    form?: FormInstance
): void => {
    if (error?.response && error.response.data) {
        const responseData = error.response.data;
        const errors: FieldError[] = responseData.errors || [];
        if (handleFormErrors && form) {
            handleFormErrors(errors, form);
        }

        const errorState: ErrorState = {
            message: responseData.message,
            description: responseData.description,
            errors: errors,
            refId: responseData.refId || null,  // Ensure refId is handled
            details: responseData.details || null,  // Ensure details are handled
            stack: responseData.stack || null,  // Ensure stack trace is handled
        };

        if (setErrorState) {
            setErrorState(errorState);
        }
    } else {
        console.log(error);
        const responseData = error || {};
        const errors: FieldError[] = responseData.errors || [];
        const errorState: ErrorState = {
            message: 'An unexpected error occurred',
            description: error?.message || '',
            errors: errors,
            refId: responseData.refId || null,  // Handle null refId
            details: null,
            stack: null,
        };

        if (setErrorState) {
            setErrorState(errorState);
        }
    }
};

export const handleFormErrors = (
    errors: FieldError[],
    form: FormInstance,
    setErrorState?: (errorState: ErrorState | null) => void
) => {
    const formFields = errors
        .filter(error => form.getFieldValue(error.field) !== undefined) // Filter out errors related to fields not in the form
        .map(error => ({
            name: error.field,
            errors: [error.message],
        }));

    form.setFields(formFields);

    if (setErrorState) {
        const errorState: ErrorState = {
            message: 'Validation errors occurred',
            description: 'Please correct the errors below.',
            errors: formFields.map(field => ({
                field: field.name.toString(),
                message: field.errors.join(', '),
            })),
            refId: null, // Handle refId
            details: null, // Handle details
            stack: null, // Handle stack
        };

        setErrorState(errorState);
    }
};

export const checkForErrors = <T>(response: ApiResponse<T | T[] | null>, setErrorState?: (errorState: ErrorState | null) => void): T | null | ErrorState => {
    const errorCodes = ["NP10", "NP01", "NN00"];

    if (errorCodes.includes(response.code)) {
        const errorState: ErrorState = {
            message: response.message,
            description: response.description,
            errors: response.errors || [],
            refId: response.refId || null,  // Handle refId
            details: response.errors?.details || null,  // Handle details
            stack: response.errors?.stack || null,  // Handle stack
        };

        if (setErrorState) {
            setErrorState(errorState);
        }
        return null;
    }
    // Ensure the data is a single item or null
    if (Array.isArray(response.data)) {
        return (response.data as T[]).length > 0 ? (response.data as T[])[0] : null;
    }
    return response.data as T;
};

export type { ErrorState };
