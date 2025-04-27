package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.ResidualRisk;
import tz.go.psssf.risk.entity.Likelihood;
import tz.go.psssf.risk.entity.Impact;
import tz.go.psssf.risk.repository.ResidualRiskRepository;
import tz.go.psssf.risk.repository.LikelihoodRepository;
import tz.go.psssf.risk.repository.ImpactRepository;

import java.util.List;

@ApplicationScoped
public class ResidualRiskSeeder {

    @Inject
    ResidualRiskRepository residualRiskRepository;

    @Inject
    LikelihoodRepository likelihoodRepository;

    @Inject
    ImpactRepository impactRepository;

    @Transactional
    public void seed() {
        if (residualRiskRepository.count() == 0) {
            List<Likelihood> likelihoods = likelihoodRepository.listAll();
            List<Impact> impacts = impactRepository.listAll();

            if (likelihoods.isEmpty() || impacts.isEmpty()) {
                throw new RuntimeException("No Likelihoods or Impacts found to link with Residual Risks.");
            }

            for (int i = 1; i <= 10; i++) {
                ResidualRisk residualRisk = new ResidualRisk();
                residualRisk.setLikelihood(likelihoods.get(i % likelihoods.size()));
                residualRisk.setImpact(impacts.get(i % impacts.size()));
                residualRiskRepository.persist(residualRisk);
            }
        }
    }
}
