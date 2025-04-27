package tz.go.psssf.risk.compliance.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.compliance.entity.ComplianceStatus;

@ApplicationScoped
public class ComplianceStatusRepository implements PanacheRepositoryBase<ComplianceStatus, String> {
}
