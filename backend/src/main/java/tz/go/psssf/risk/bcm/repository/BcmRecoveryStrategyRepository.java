package tz.go.psssf.risk.bcm.repository;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.bcm.entity.BcmRecoveryStrategy;

@ApplicationScoped
public class BcmRecoveryStrategyRepository implements PanacheRepositoryBase<BcmRecoveryStrategy, String> {
}
