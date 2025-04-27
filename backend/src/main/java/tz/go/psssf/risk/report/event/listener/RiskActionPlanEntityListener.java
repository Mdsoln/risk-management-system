package tz.go.psssf.risk.report.event.listener;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.PostRemove;
import tz.go.psssf.risk.entity.RiskActionPlan;
import tz.go.psssf.risk.report.service.ReportDashboardService;
import io.quarkus.vertx.ConsumeEvent;
import io.vertx.mutiny.core.eventbus.EventBus;
import io.smallrye.common.annotation.Blocking;

@ApplicationScoped
public class RiskActionPlanEntityListener {

    @Inject
    ReportDashboardService reportDashboardService;

    @Inject
    EventBus eventBus;

    @PostPersist
    @PostUpdate
    public void handleRiskActionPlanChanges(RiskActionPlan riskActionPlan) {
        // Send an event to the event bus for background processing
        eventBus.publish("riskActionPlan.changed", riskActionPlan.getId()); 
    }

    @PostRemove
    public void handleRiskActionPlanDeletion(RiskActionPlan riskActionPlan) {
        // Send an event to the event bus for background processing
        eventBus.publish("riskActionPlan.deleted", riskActionPlan.getId());
    }

    @ConsumeEvent("riskActionPlan.changed")
    @Blocking  // Ensures this method runs on a worker thread
    public void processRiskActionPlanChangedEvent(String riskActionPlanId) {
        reportDashboardService.generateOrUpdateReportForRiskActionPlan(riskActionPlanId).subscribe().with(
            success -> System.out.println("Report generated successfully for Risk Action Plan ID: " + riskActionPlanId),
            failure -> System.err.println("Failed to generate report for Risk Action Plan: " + failure.getMessage())
        );
    }

    @ConsumeEvent("riskActionPlan.deleted")
    @Blocking  // Ensures this method runs on a worker thread
    public void processRiskActionPlanDeletedEvent(Long riskActionPlanId) {
        reportDashboardService.removeReportForRiskActionPlan(riskActionPlanId).subscribe().with(
            success -> System.out.println("Report removed successfully for Risk Action Plan ID: " + riskActionPlanId),
            failure -> System.err.println("Failed to remove report for Risk Action Plan: " + failure.getMessage())
        );
    }
}