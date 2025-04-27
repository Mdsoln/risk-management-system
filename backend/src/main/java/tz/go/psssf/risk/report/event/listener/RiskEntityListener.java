package tz.go.psssf.risk.report.event.listener;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.PostRemove;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.report.service.ReportDashboardService;
import io.quarkus.vertx.ConsumeEvent;
import io.vertx.mutiny.core.eventbus.EventBus;
import io.smallrye.common.annotation.Blocking;

@ApplicationScoped
public class RiskEntityListener {

    @Inject
    ReportDashboardService reportDashboardService;

    @Inject
    EventBus eventBus;

    @PostPersist
    @PostUpdate
    public void handleRiskChanges(Risk risk) {
        // Send an event to the event bus for background processing
        eventBus.publish("risk.changed", risk.getId()); 
    }

    @PostRemove
    public void handleRiskDeletion(Risk risk) {
        // Send an event to the event bus for background processing
        eventBus.publish("risk.deleted", risk.getId());
    }

    // Method to handle the background processing of the event
    @ConsumeEvent("risk.changed")
    @Blocking  // Ensures this method runs on a worker thread
    public void processRiskChangedEvent(String riskId) {
        // Generate or update the report asynchronously
        reportDashboardService.generateOrUpdateReport(riskId).subscribe().with(
            success -> System.out.println("Report generated successfully for Risk ID: " + riskId),
            failure -> System.err.println("Failed to generate report: " + failure.getMessage())
        );
    }

    @ConsumeEvent("risk.deleted")
    @Blocking  // Ensures this method runs on a worker thread
    public void processRiskDeletedEvent(Long riskId) {
        reportDashboardService.removeReportAsync(riskId).subscribe().with(
            success -> System.out.println("Report removed successfully for Risk ID: " + riskId),
            failure -> System.err.println("Failed to remove report: " + failure.getMessage())
        );
    }
}