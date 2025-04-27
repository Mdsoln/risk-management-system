package tz.go.psssf.risk.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.entity.RiskStatus;


@ApplicationScoped
public class RiskStatusRepository implements PanacheRepositoryBase<RiskStatus, String> {
	
	public RiskStatus findByCode(String code) {
        return find("code", code).firstResult();
    }
}