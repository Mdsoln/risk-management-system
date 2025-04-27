package tz.go.psssf.risk.report.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.helper.JsonConverter;
import tz.go.psssf.risk.report.entity.ReportDashboard;
import tz.go.psssf.risk.report.mapper.ReportDashboardMapper;
import tz.go.psssf.risk.report.pojo.ReportDashboardPojo;
import tz.go.psssf.risk.report.repository.ReportDashboardRepository;
import tz.go.psssf.risk.response.ResponseWrapper;
import tz.go.psssf.risk.helper.ResponseHelper;

@ApplicationScoped
public class DashboardService {

    @Inject
    Logger log;

    @Inject
    ReportDashboardRepository reportDashboardRepository;

    @Inject
    ReportDashboardMapper reportDashboardMapper;

    public ResponseWrapper<ReportDashboardPojo> findByCode(String code) {
        try {
            ReportDashboard reportDashboard = reportDashboardRepository.find("code", code).singleResult();
            if (reportDashboard != null) {
                ReportDashboardPojo reportDashboardPojo = reportDashboardMapper.toPojo(reportDashboard);

                // Convert the payload from a String to JSON using JsonConverter
                Object payloadObject = JsonConverter.fromJson(reportDashboard.getPayload(), Object.class);
                reportDashboardPojo.setPayload(payloadObject);

                return ResponseHelper.createSuccessResponse(reportDashboardPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding ReportDashboard by code", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}