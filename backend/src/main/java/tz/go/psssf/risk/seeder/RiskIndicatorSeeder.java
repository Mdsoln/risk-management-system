package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.entity.RiskIndicator;
import tz.go.psssf.risk.repository.RiskIndicatorRepository;
import tz.go.psssf.risk.repository.RiskRepository;
import tz.go.psssf.risk.repository.MonitoringFrequencyRepository;

import java.util.List;

@ApplicationScoped
public class RiskIndicatorSeeder {

    @Inject
    RiskIndicatorRepository riskIndicatorRepository;

    @Inject
    RiskRepository riskRepository;
    
    @Inject
    MonitoringFrequencyRepository monitoringFrequencyRepository;

    @Transactional
    public void seed() {
        if (riskIndicatorRepository.count() == 0) {
            List<Risk> risks = riskRepository.listAll();
            var frequencies = monitoringFrequencyRepository.listAll();

            if (risks.isEmpty() || frequencies.isEmpty()) {
                throw new RuntimeException("No Risks or Frequencies found to link with Risk Indicators.");
            }

            for (int i = 1; i <= 10; i++) {
                RiskIndicator riskIndicator = new RiskIndicator();
                riskIndicator.setIndicator("Indicator " + i);
                riskIndicator.setDescription("Description for Indicator " + i);
                riskIndicator.setPurpose("Purpose for Indicator " + i);
                riskIndicator.setRisk(risks.get(i % risks.size()));
                riskIndicator.setMonitoringFrequency(frequencies.get(i % frequencies.size()));
                riskIndicatorRepository.persist(riskIndicator);
            }
        }
    }
}
