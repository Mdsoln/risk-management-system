package tz.go.psssf.risk.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.NameBinding;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ValidPathParamValidator.class)
@NameBinding
@NotNull
@NotBlank
public @interface ValidPathParam {
    String message() default "Invalid Path Parameter";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}