package tz.go.psssf.risk.validation;

import java.util.regex.Pattern;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidPathParamValidator implements ConstraintValidator<ValidPathParam, String> {

    // Define the UUID pattern here
    private static final Pattern pattern = Pattern.compile("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}");

    @Override
    public void initialize(ValidPathParam constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Check if the value matches the UUID pattern and is not null or blank
        return value != null && !value.isBlank() && pattern.matcher(value).matches();
    }
}