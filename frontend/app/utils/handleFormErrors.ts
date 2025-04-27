import { FormInstance } from 'antd';
import { FieldError, ErrorState } from '@/app/types/api';

export const handleFormErrors = (
    errors: FieldError[],
    form: FormInstance,
    setErrorState: (errorState: ErrorState | null) => void
) => {
    const formFields = errors.map(error => ({
        name: error.field,
        errors: [error.message],
    }));

    form.setFields(formFields);

    // Collect error messages into an errorState
    const errorState: ErrorState = {
        message: 'Validation errors occurred',
        description: 'Please correct the errors below.',
        errors: formFields.map(field => ({
            field: field.name.toString(),
            message: field.errors.join(', '),
        })),
        refId: null,  // Include refId here, set to null or any appropriate value
        details: null, // Set details and stack to null or provide appropriate values if needed
        stack: null,
    };

    setErrorState(errorState);
};
