package tz.go.psssf.risk.config;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;
import org.eclipse.microprofile.openapi.annotations.security.SecurityScheme;
import org.eclipse.microprofile.openapi.annotations.security.SecuritySchemes;

import jakarta.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeType;


@ApplicationScoped
@OpenAPIDefinition(
    info = @Info(
        title = "Your API",
        version = "1.0.0"
    ),
    security = @SecurityRequirement(name = "bearerAuth")
)
@SecuritySchemes({
    @SecurityScheme(
        securitySchemeName = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer"
    )
})
public class OpenApiConfig {
    // This class is only for OpenAPI configuration
}

