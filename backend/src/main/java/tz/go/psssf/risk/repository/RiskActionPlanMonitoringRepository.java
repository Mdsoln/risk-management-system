package tz.go.psssf.risk.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.entity.RiskActionPlanMonitoring;

@ApplicationScoped
public class RiskActionPlanMonitoringRepository implements PanacheRepositoryBase<RiskActionPlanMonitoring, String> {
}
