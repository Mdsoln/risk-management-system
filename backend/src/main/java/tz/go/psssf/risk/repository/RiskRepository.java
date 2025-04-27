package tz.go.psssf.risk.repository;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tz.go.psssf.risk.entity.Risk;


@ApplicationScoped
public class RiskRepository implements PanacheRepositoryBase<Risk, String> {
	
	
	// staring report
	// Method to get all RiskStatus and count associated risks, including statuses with zero counts
    public List<RiskStatusRecord> countRisksByStatus() {
        return getEntityManager().createQuery(
            "SELECT new tz.go.psssf.risk.repository.RiskRepository$RiskStatusRecord(rs.name, COUNT(r.id)) " +
            "FROM RiskStatus rs " +
            "LEFT JOIN RiskAssessmentStatus ras ON ras.riskStatus = rs " +
            "LEFT JOIN ras.risk r " +
            "GROUP BY rs.name", RiskStatusRecord.class)
            .getResultList();
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RiskStatusRecord {
        private String statusName;
        private long count;
    }

}