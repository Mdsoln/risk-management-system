package tz.go.psssf.risk.validation;

import java.util.Arrays;
import java.util.List;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;



public class ComparisonSymbolValidator implements ConstraintValidator<ValidComparisonSymbol, String> {

    private static final List<String> ALLOWED_SYMBOLS = Arrays.asList("<", "<=", ">", ">=", "==", "!=");

    @Override
    public void initialize(ValidComparisonSymbol constraintAnnotation) {
    }

    @Override
    public boolean isValid(String symbol, ConstraintValidatorContext context) {
        return symbol != null && ALLOWED_SYMBOLS.contains(symbol);
    }
}