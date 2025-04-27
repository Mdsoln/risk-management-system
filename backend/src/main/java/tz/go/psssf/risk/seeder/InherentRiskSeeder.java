package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.InherentRisk;
import tz.go.psssf.risk.entity.Likelihood;
import tz.go.psssf.risk.entity.Impact;
import tz.go.psssf.risk.repository.InherentRiskRepository;
import tz.go.psssf.risk.repository.LikelihoodRepository;
import tz.go.psssf.risk.repository.ImpactRepository;

import java.util.List;

@ApplicationScoped
public class InherentRiskSeeder {

    @Inject
    InherentRiskRepository inherentRiskRepository;

    @Inject
    LikelihoodRepository likelihoodRepository;

    @Inject
    ImpactRepository impactRepository;

    @Transactional
    public void seed() {
        if (inherentRiskRepository.count() == 0) {
            List<Likelihood> likelihoods = likelihoodRepository.listAll();
            List<Impact> impacts = impactRepository.listAll();

            if (likelihoods.isEmpty() || impacts.isEmpty()) {
                throw new RuntimeException("No Likelihoods or Impacts found to link with Inherent Risks.");
            }

            for (int i = 1; i <= 10; i++) {
                InherentRisk inherentRisk = new InherentRisk();
                inherentRisk.setLikelihood(likelihoods.get(i % likelihoods.size()));
                inherentRisk.setImpact(impacts.get(i % impacts.size()));
                inherentRiskRepository.persist(inherentRisk);
            }
        }
    }
}
