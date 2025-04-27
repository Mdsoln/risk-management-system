package tz.go.psssf.risk.validation;


import java.lang.annotation.*;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = ComparisonSymbolValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidComparisonSymbol {
    String message() default "Invalid comparison operator symbol";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}