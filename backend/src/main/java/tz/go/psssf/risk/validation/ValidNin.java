package tz.go.psssf.risk.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = NinValidator.class)
@Target({ FIELD })
@Retention(RUNTIME)
public @interface ValidNin {
    String message() default "Invalid NIN format. It must be exactly 20 characters long and contain only digits.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
