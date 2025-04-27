package tz.go.psssf.risk.report.repository;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.report.entity.ReportDashboard;

@ApplicationScoped
public class ReportDashboardRepository implements PanacheRepositoryBase<ReportDashboard, String> {
}