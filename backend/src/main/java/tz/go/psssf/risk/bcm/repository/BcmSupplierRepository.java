package tz.go.psssf.risk.bcm.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.bcm.entity.BcmSupplier;

@ApplicationScoped
public class BcmSupplierRepository implements PanacheRepositoryBase<BcmSupplier, String> {
}
