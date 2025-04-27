package tz.go.psssf.risk.report.mapper;

import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.report.entity.ReportDashboard;
import tz.go.psssf.risk.report.pojo.ReportDashboardPojo;

@ApplicationScoped
public class ReportDashboardMapper {

    public ReportDashboardPojo toPojo(ReportDashboard reportDashboard) {
        ReportDashboardPojo pojo = new ReportDashboardPojo();
        pojo.setId(reportDashboard.getId());
        pojo.setCode(reportDashboard.getCode());
        pojo.setName(reportDashboard.getName());
        // We will not set the payload here, it's handled in the service
        return pojo;
    }
}