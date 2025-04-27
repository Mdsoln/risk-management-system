package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.entity.RiskCause;
import tz.go.psssf.risk.repository.RiskCauseRepository;
import tz.go.psssf.risk.repository.RiskRepository;

import java.util.List;

@ApplicationScoped
public class RiskCauseSeeder {

    @Inject
    RiskCauseRepository riskCauseRepository;

    @Inject
    RiskRepository riskRepository;

    @Transactional
    public void seed() {
        if (riskCauseRepository.count() == 0) {
            List<Risk> risks = riskRepository.listAll();

            if (risks.isEmpty()) {
                throw new RuntimeException("No Risks found to link with Risk Causes.");
            }

            for (int i = 1; i <= 10; i++) {
                RiskCause riskCause = new RiskCause();
                riskCause.setDescription("Cause description " + i);
                riskCause.setRisk(risks.get(i % risks.size()));
                riskCauseRepository.persist(riskCause);
            }
        }
    }
}
