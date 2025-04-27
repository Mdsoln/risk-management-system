package tz.go.psssf.risk.listener;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import tz.go.psssf.risk.entity.BaseEntity;

@ApplicationScoped
public class BaseEntityListener {

    @Inject
    SecurityIdentity securityIdentity;

    @PrePersist
    public void prePersist(BaseEntity entity) {
        String currentUserName = securityIdentity.getPrincipal().getName();
        entity.setCreatedBy(currentUserName);
        entity.setUpdatedBy(currentUserName);
    }

    @PreUpdate
    public void preUpdate(BaseEntity entity) {
        entity.setUpdatedBy(securityIdentity.getPrincipal().getName());
    }
}
