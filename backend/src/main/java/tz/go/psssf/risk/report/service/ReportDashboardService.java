package tz.go.psssf.risk.report.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.report.entity.ReportDashboard;
import tz.go.psssf.risk.report.pojo.RiskActionPlanCounterPojo;
import tz.go.psssf.risk.report.pojo.RiskActionPlanCounterPojo.ActionPlanStatusCount;
import tz.go.psssf.risk.report.pojo.RiskCounterPojo;
import tz.go.psssf.risk.report.pojo.RiskCounterPojo.RiskStatusCount;
import tz.go.psssf.risk.report.repository.ReportDashboardRepository;
import tz.go.psssf.risk.repository.RiskActionPlanRepository;
import tz.go.psssf.risk.repository.RiskRepository;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.helper.JsonConverter;

@ApplicationScoped
public class ReportDashboardService {

    // Constants representing the report codes
    private static final String RISK_PER_ORGANIZATIONAL_UNIT_CODE = "RISK_PER_ORGANIZATIONAL_UNIT";
    private static final String RISK_PER_PRIORITY_CODE = "RISK_PER_PRIORITY";
    private static final String TOP_50_SEMI_QUALITATIVE_RISK_CODE = "TOP_50_SEMI_QUALITATIVE_RISK_VALUE";
    private static final String RISK_COUNTER_CODE = "RISK_COUNTER";  
    private static final String RISK_ACTION_PLAN_CODE = "RISK_ACTION_COUNTER";  
    private static final String RISK_ACTION_PLAN_REPORT_NAME = "RISK ACTION PLAN COUNTER";  

    

    @Inject
    ReportDashboardRepository reportDashboardRepository;

    @Inject
    RiskRepository riskRepository;
    
    @Inject
    RiskActionPlanRepository riskActionPlanRepository;

    // Reusable method to find or create a report
    private ReportDashboard findOrCreateReport(String code, String name, String payload) {
        ReportDashboard existingReport = reportDashboardRepository.find("code", code).firstResult();
        
        if (existingReport != null) {
            existingReport.setPayload(payload);
            reportDashboardRepository.persist(existingReport);
            return existingReport;
        } else {
            ReportDashboard newReport = new ReportDashboard();
            newReport.setCode(code);
            newReport.setName(name);
            newReport.setPayload(payload);
            reportDashboardRepository.persist(newReport);
            return newReport;
        }
    }

    @Transactional
    public Uni<Void> generateOrUpdateReport(String riskId) {
        return Uni.createFrom().item(riskRepository.findById(riskId))
            .onItem().ifNotNull().invoke(risk -> {
                try {
                    // Step 1: Generate or update the main report using reusable method
                    findOrCreateReport(risk.getId().toString(), "Report for " + risk.getName(), "Payload for risk " + risk.getName());

                    // Step 2: Call other report generation functions
                    generateReportForOrganizationalUnit(riskId).subscribe().with(
                        success -> System.out.println("Organizational Unit report generated"),
                        failure -> System.err.println("Failed to generate Organizational Unit report: " + failure.getMessage())
                    );
                    generateReportForPriority(riskId).subscribe().with(
                        success -> System.out.println("Priority report generated"),
                        failure -> System.err.println("Failed to generate Priority report: " + failure.getMessage())
                    );
                    generateTop50SemiQualitativeRiskReport(riskId).subscribe().with(
                        success -> System.out.println("Top 50 Semi Qualitative Risk report generated"),
                        failure -> System.err.println("Failed to generate Top 50 Semi Qualitative Risk report: " + failure.getMessage())
                    );
                    generateReportForRiskCounter(riskId).subscribe().with(
                        success -> System.out.println("Risk Counter report generated"),
                        failure -> System.err.println("Failed to generate Risk Counter report: " + failure.getMessage())
                    );

                } catch (Exception e) {
                    System.err.println("Failed to generate/update report for Risk ID: " + riskId + " due to: " + e.getMessage());
                }
            })
            .replaceWithVoid();
    }

    @Transactional
    public Uni<Void> generateReportForOrganizationalUnit(String riskId) {
        return Uni.createFrom().item(riskRepository.findById(riskId))
            .onItem().ifNotNull().invoke(risk -> {
                findOrCreateReport(RISK_PER_ORGANIZATIONAL_UNIT_CODE, "Organizational Unit Report", "Updated payload for organizational unit " + risk.getName());
            })
            .replaceWithVoid();
    }

    @Transactional
    public Uni<Void> generateReportForPriority(String riskId) {
        return Uni.createFrom().item(riskRepository.findById(riskId))
            .onItem().ifNotNull().invoke(risk -> {
                findOrCreateReport(RISK_PER_PRIORITY_CODE, "Priority Report", "Updated payload for priority " + risk.getName());
            })
            .replaceWithVoid();
    }

    @Transactional
    public Uni<Void> generateTop50SemiQualitativeRiskReport(String riskId) {
        return Uni.createFrom().item(riskRepository.findById(riskId))
            .onItem().ifNotNull().invoke(risk -> {
                findOrCreateReport(TOP_50_SEMI_QUALITATIVE_RISK_CODE, "Top 50 Semi Qualitative Risk Report", "Updated payload for Top 50 Semi Qualitative Risks");
            })
            .replaceWithVoid();
    }

    @Transactional
    public Uni<Void> generateReportForRiskCounter(String riskId) {
        return Uni.createFrom().item(riskRepository.findById(riskId))
            .onItem().ifNotNull().invoke(risk -> {

                // Step 1: Count total risks
                long totalRiskCount = riskRepository.count();

                // Step 2: Count risks by RiskStatus
                List<RiskStatusCount> riskStatusCounts = riskRepository.countRisksByStatus().stream()
                    .map(record -> new RiskStatusCount(record.getStatusName(), record.getCount()))
                    .collect(Collectors.toList());

                // Step 3: Create RiskCounterPojo object
                RiskCounterPojo riskCounter = new RiskCounterPojo(totalRiskCount, riskStatusCounts);

                // Step 4: Convert RiskCounterPojo to JSON payload
                String payload = JsonConverter.toJson(riskCounter);

                // Step 5: Use reusable method to find or create the report
                findOrCreateReport(RISK_COUNTER_CODE, "Risk Counter Report", payload);

            })
            .replaceWithVoid();
    }

    @Transactional
    public Uni<Void> removeReportAsync(Long riskId) {
        return Uni.createFrom().voidItem()
            .onItem().invoke(() -> {
                ReportDashboard existingReport = reportDashboardRepository.find("code", riskId.toString()).firstResult();
                if (existingReport != null) {
                    reportDashboardRepository.delete(existingReport);
                }
            });
    }
    
    
    
    
    // Action Plans
    

	
 // Method to generate or update report for a specific risk action plan and also generate overall action plan status report
    @Transactional
    public Uni<Void> generateOrUpdateReportForRiskActionPlan(String riskActionPlanId) {
        return Uni.createFrom().item(riskActionPlanRepository.findById(riskActionPlanId))
            .onItem().ifNotNull().invoke(riskActionPlan -> {
                String payload = "Payload for Risk Action Plan: " + riskActionPlan.getName();
                findOrCreateReport(RISK_ACTION_PLAN_CODE + "_" + riskActionPlanId, RISK_ACTION_PLAN_REPORT_NAME, payload);
                
                // Also generate the overall report for risk action plans
                generateReportForRiskActionPlans().subscribe().with(
                    success -> System.out.println("Overall Risk Action Plan report generated"),
                    failure -> System.err.println("Failed to generate overall Risk Action Plan report: " + failure.getMessage())
                );
            })
            .replaceWithVoid();
    }

    // Method to remove a report for a specific risk action plan and also update the overall action plan report
    @Transactional
    public Uni<Void> removeReportForRiskActionPlan(Long riskActionPlanId) {
        return Uni.createFrom().voidItem()
            .onItem().invoke(() -> {
                ReportDashboard existingReport = reportDashboardRepository.find("code", RISK_ACTION_PLAN_CODE + "_" + riskActionPlanId).firstResult();
                if (existingReport != null) {
                    reportDashboardRepository.delete(existingReport);
                }

                // Also regenerate the overall report for risk action plans
                generateReportForRiskActionPlans().subscribe().with(
                    success -> System.out.println("Overall Risk Action Plan report updated after deletion"),
                    failure -> System.err.println("Failed to update overall Risk Action Plan report: " + failure.getMessage())
                );
            });
    }

    // Generates a report based on all risk action plans with completed, ongoing, and not implemented status
    @Transactional
    public Uni<Void> generateReportForRiskActionPlans() {
        return Uni.createFrom().voidItem()
            .onItem().invoke(() -> {
                long totalActionPlans = riskActionPlanRepository.count();

                // Calculate ongoing, completed, and not implemented action plans
                long completedCount = riskActionPlanRepository.countByEndDatetimeBefore(LocalDateTime.now());
                long ongoingCount = riskActionPlanRepository.countByStartDatetimeBeforeAndEndDatetimeAfter(LocalDateTime.now(), LocalDateTime.now());
                long notImplementedCount = riskActionPlanRepository.countByStartDatetimeAfter(LocalDateTime.now());

                double completedPercentage = calculatePercentage(completedCount, totalActionPlans);
                double ongoingPercentage = calculatePercentage(ongoingCount, totalActionPlans);
                double notImplementedPercentage = calculatePercentage(notImplementedCount, totalActionPlans);

                // Build status counts
                List<ActionPlanStatusCount> statusCounts = List.of(
                    new ActionPlanStatusCount("Completed", completedCount, completedPercentage),
                    new ActionPlanStatusCount("Ongoing", ongoingCount, ongoingPercentage),
                    new ActionPlanStatusCount("Not Implemented", notImplementedCount, notImplementedPercentage)
                );

                // Create the RiskActionPlanCounterPojo
                RiskActionPlanCounterPojo actionPlanCounter = new RiskActionPlanCounterPojo(totalActionPlans, statusCounts);

                // Convert to JSON payload
                String payload = JsonConverter.toJson(actionPlanCounter);

                // Save report
                findOrCreateReport(RISK_ACTION_PLAN_CODE, RISK_ACTION_PLAN_REPORT_NAME, payload);
            });
    }

    private double calculatePercentage(long count, long total) {
        if (total == 0) {
            return 0;
        }
        return ((double) count / total) * 100;
    }
    
}