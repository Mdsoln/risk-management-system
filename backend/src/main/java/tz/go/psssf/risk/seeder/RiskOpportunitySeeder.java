package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.entity.RiskOpportunity;
import tz.go.psssf.risk.repository.RiskOpportunityRepository;
import tz.go.psssf.risk.repository.RiskRepository;

import java.util.List;

@ApplicationScoped
public class RiskOpportunitySeeder {

    @Inject
    RiskOpportunityRepository riskOpportunityRepository;

    @Inject
    RiskRepository riskRepository;

    @Transactional
    public void seed() {
        if (riskOpportunityRepository.count() == 0) {
            List<Risk> risks = riskRepository.listAll();

            if (risks.isEmpty()) {
                throw new RuntimeException("No Risks found to link with Risk Opportunities.");
            }

            for (int i = 1; i <= 10; i++) {
                RiskOpportunity riskOpportunity = new RiskOpportunity();
                riskOpportunity.setDescription("Opportunity description " + i);
                riskOpportunity.setRisk(risks.get(i % risks.size()));
                riskOpportunityRepository.persist(riskOpportunity);
            }
        }
    }
}
