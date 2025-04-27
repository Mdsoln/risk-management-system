package tz.go.psssf.risk.bcm.repository;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.bcm.entity.BcmSubProcess;

@ApplicationScoped
public class BcmSubProcessRepository implements PanacheRepositoryBase<BcmSubProcess, String> {
}

