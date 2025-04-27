package tz.go.psssf.risk.security;

import io.quarkus.security.identity.AuthenticationRequestContext;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.security.identity.SecurityIdentityAugmentor;
import io.quarkus.security.runtime.QuarkusSecurityIdentity;
import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipal;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.Priority;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@ApplicationScoped
@Priority(1000)
public class CustomSecurityIdentityAugmentor implements SecurityIdentityAugmentor {

    @Override
    public Uni<SecurityIdentity> augment(SecurityIdentity identity, AuthenticationRequestContext context) {
        if (identity.getPrincipal() instanceof DefaultJWTCallerPrincipal) {
            DefaultJWTCallerPrincipal jwtPrincipal = (DefaultJWTCallerPrincipal) identity.getPrincipal();

            // Extract permissions from JWT and convert them to a Set
            Set<String> permissions = new HashSet<>(jwtPrincipal.<List<String>>getClaim("permissions"));

            QuarkusSecurityIdentity.Builder builder = QuarkusSecurityIdentity.builder(identity);

            if (permissions != null && !permissions.isEmpty()) {
                builder.addAttribute("permissions", permissions);
            }

            return Uni.createFrom().item(builder.build());
        }

        return Uni.createFrom().item(identity);
    }
}
