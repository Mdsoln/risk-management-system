package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.entity.RiskRegistry;
import tz.go.psssf.risk.repository.RiskRepository;
import tz.go.psssf.risk.repository.RiskRegistryRepository;

import java.util.List;

@ApplicationScoped
public class RiskRegistrySeeder {

    @Inject
    RiskRepository riskRepository;

    @Inject
    RiskRegistryRepository riskRegistryRepository;

    @Transactional
    public void seed() {
        try {
            long count = riskRegistryRepository.count();
            if (count == 0) {
                List<Risk> risks = riskRepository.listAll();

                if (risks.isEmpty()) {
                    throw new RuntimeException("No Risks found to link with Risk Registries.");
                }

                for (Risk risk : risks) {
                    RiskRegistry riskRegistry = new RiskRegistry();
                    riskRegistry.setRisk(risk);

                    riskRegistryRepository.persist(riskRegistry);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
