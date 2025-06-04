package tz.go.psssf.risk.seeder;

import java.time.LocalDateTime;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.FundObjective;
import tz.go.psssf.risk.helper.SeederHelper;
import tz.go.psssf.risk.repository.FundObjectiveRepository;

@ApplicationScoped
public class FundObjectiveSeeder {

	@Inject
	FundObjectiveRepository fundObjectiveRepository;

	@Transactional
	public void seed() {

		try {
			Long count = fundObjectiveRepository.count();
			if (count == 0) {
				int numberOfRiskRegistries = 1000;

				for (int i = 1; i <= numberOfRiskRegistries; i++) {
					FundObjective fundObjectiveObj = new FundObjective();
					fundObjectiveObj.setName("Fund Objective " + i);
					fundObjectiveObj.setDescription(SeederHelper.generateDescription(1000));
					fundObjectiveObj.setStartDateTime(LocalDateTime.now().minusDays(1));
					fundObjectiveObj.setEndDateTime(LocalDateTime.now().plusDays(30));
					fundObjectiveRepository.persist(fundObjectiveObj);

				}
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();

		}

	}

}
