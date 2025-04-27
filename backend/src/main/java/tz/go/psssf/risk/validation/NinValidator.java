package tz.go.psssf.risk.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NinValidator implements ConstraintValidator<ValidNin, String> {

    @Override
    public void initialize(ValidNin constraintAnnotation) {
    }

    @Override
    public boolean isValid(String nin, ConstraintValidatorContext context) {
        if (nin == null) {
            return false;
        }
        // Check if NIN is exactly 20 characters long and contains only digits
        return nin.matches("\\d{20}");
    }
}
