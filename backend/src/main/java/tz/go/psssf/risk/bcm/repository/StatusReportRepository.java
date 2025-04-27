package tz.go.psssf.risk.bcm.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.bcm.entity.StatusReport;

@ApplicationScoped
public class StatusReportRepository implements PanacheRepositoryBase<StatusReport, String> {
}
