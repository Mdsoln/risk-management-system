package tz.go.psssf.risk.repository;

import java.time.LocalDateTime;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.entity.RiskActionPlan;

@ApplicationScoped
public class RiskActionPlanRepository implements PanacheRepositoryBase<RiskActionPlan, String> {
	
	//	•	Completed Action Plans: endDatetime is in the past.
	//	•	Ongoing Action Plans: startDatetime is before now, and endDatetime is after now.
	//	•	Not Implemented Action Plans: startDatetime is in the future.
	
	public long countByEndDatetimeBefore(LocalDateTime now) {
        return find("endDatetime < ?1", now).count();
    }

    public long countByStartDatetimeBeforeAndEndDatetimeAfter(LocalDateTime start, LocalDateTime end) {
        return find("startDatetime <= ?1 AND endDatetime >= ?2", start, end).count();
    }

    public long countByStartDatetimeAfter(LocalDateTime now) {
        return find("startDatetime > ?1", now).count();
    }
}
