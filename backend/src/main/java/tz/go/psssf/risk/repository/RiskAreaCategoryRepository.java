package tz.go.psssf.risk.repository;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.entity.RiskAreaCategory;


@ApplicationScoped
public class RiskAreaCategoryRepository implements PanacheRepositoryBase<RiskAreaCategory, String> {
	
	public List<RiskAreaCategory> listAllOrdered() {
        return find("ORDER BY name ASC").list();
    }

    public List<RiskAreaCategory> listAllWithRiskAreasOrdered() {
        return find("FROM RiskAreaCategory rac LEFT JOIN FETCH rac.riskAreas ra ORDER BY rac.name ASC, ra.name ASC").list();
    }
}