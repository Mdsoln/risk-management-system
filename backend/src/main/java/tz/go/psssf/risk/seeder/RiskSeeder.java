package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.entity.RiskArea;
import tz.go.psssf.risk.entity.RiskOwner;
import tz.go.psssf.risk.entity.BusinessProcess;
import tz.go.psssf.risk.entity.InherentRisk;
import tz.go.psssf.risk.entity.ResidualRisk;
import tz.go.psssf.risk.entity.Likelihood;
import tz.go.psssf.risk.entity.Impact;
import tz.go.psssf.risk.repository.RiskRepository;
import tz.go.psssf.risk.repository.RiskAreaRepository;
import tz.go.psssf.risk.repository.RiskOwnerRepository;
import tz.go.psssf.risk.repository.BusinessProcessRepository;
import tz.go.psssf.risk.repository.InherentRiskRepository;
import tz.go.psssf.risk.repository.ResidualRiskRepository;
import tz.go.psssf.risk.repository.LikelihoodRepository;
import tz.go.psssf.risk.repository.ImpactRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@ApplicationScoped
public class RiskSeeder {

    @Inject
    RiskRepository riskRepository;

    @Inject
    RiskAreaRepository riskAreaRepository;

   
    @Inject
    BusinessProcessRepository businessProcessRepository;

    @Inject
    InherentRiskRepository inherentRiskRepository;

    @Inject
    ResidualRiskRepository residualRiskRepository;

    @Inject
    LikelihoodRepository likelihoodRepository;

    @Inject
    ImpactRepository impactRepository;
    
    @Inject 
    RiskOwnerRepository riskOwnerRepository;

    @Transactional
    public void seed() {
        if (riskRepository.count() == 0) {
            List<RiskArea> riskAreas = riskAreaRepository.listAll();
            List<RiskOwner> riskOwners = riskOwnerRepository.listAll();
            List<BusinessProcess> businessProcesses = businessProcessRepository.listAll();
            List<Likelihood> likelihoods = likelihoodRepository.listAll();
            List<Impact> impacts = impactRepository.listAll();

            if (riskAreas.isEmpty() ) {
                throw new RuntimeException("No RiskAreas found to link with Risks.");
            }
            
            if (riskOwners.isEmpty() ) {
                throw new RuntimeException("No Risk Owners found to link with Risks.");
            }
            
            if (businessProcesses.isEmpty()) {
                throw new RuntimeException("No BusinessProcesses found to link with Risks.");
            }
            
            if (likelihoods.isEmpty()) {
                throw new RuntimeException("No Likelihoods found to link with Risks.");
            }
            
            if (impacts.isEmpty()) {
                throw new RuntimeException("No Impacts found to link with Risks.");
            }

            Random random = new Random();

            for (int i = 0; i < 1000; i++) {
                Risk risk = new Risk();
                risk.setName("Risk " + (i + 1));
                risk.setDescription("Description for Risk " + (i + 1));

                risk.setRiskArea(riskAreas.get(random.nextInt(riskAreas.size())));
//                risk.setRiskOwner(riskOwners.get(random.nextInt(riskOwners.size())));
                risk.setBusinessProcess(businessProcesses.get(random.nextInt(businessProcesses.size())));

                // Create and set InherentRisk
                InherentRisk inherentRisk = new InherentRisk();
                inherentRisk.setLikelihood(likelihoods.get(random.nextInt(likelihoods.size())));
                inherentRisk.setImpact(impacts.get(random.nextInt(impacts.size())));
                inherentRiskRepository.persist(inherentRisk);
                risk.setInherentRisk(inherentRisk);

                // Create and set ResidualRisk
                ResidualRisk residualRisk = new ResidualRisk();
                residualRisk.setLikelihood(likelihoods.get(random.nextInt(likelihoods.size())));
                residualRisk.setImpact(impacts.get(random.nextInt(impacts.size())));
                residualRiskRepository.persist(residualRisk);
                risk.setResidualRisk(residualRisk);

                risk.setCreatedAt(LocalDateTime.now().minusDays(1));
                risk.setUpdatedAt(LocalDateTime.now().minusDays(1));

                riskRepository.persist(risk);
            }
        }
    }
}
