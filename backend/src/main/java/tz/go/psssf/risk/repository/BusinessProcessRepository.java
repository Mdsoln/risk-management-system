package tz.go.psssf.risk.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.entity.BusinessProcess;

@ApplicationScoped
public class BusinessProcessRepository implements PanacheRepositoryBase<BusinessProcess, String> {
}