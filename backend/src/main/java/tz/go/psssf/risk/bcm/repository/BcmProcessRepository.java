package tz.go.psssf.risk.bcm.repository;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.bcm.entity.BcmProcess;

@ApplicationScoped
public class BcmProcessRepository implements PanacheRepositoryBase<BcmProcess, String> {
}

