package tz.go.psssf.risk.seeder;

import java.util.List;
import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Impact;
import tz.go.psssf.risk.repository.ImpactRepository;

@ApplicationScoped
public class ImpactSeeder {

	@Inject
	ImpactRepository impactRepository;

	@Transactional
	public void seed() {

		try {

			Long count = impactRepository.count(); // Wait for the count result
			if (count == 0) {

				ObjectMapper mapper = new ObjectMapper();

				try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
						.getResourceAsStream("data/impact-seed-data.json")) {

					if (inputStream == null) {
						throw new IOException("File impact-seed-data.json not found");
					}

					List<Impact> impacts = mapper.readValue(inputStream,
							mapper.getTypeFactory().constructCollectionType(List.class, Impact.class));

					for (Impact impact : impacts) {
						System.out.println("Saving: " + impact.getSeverityRanking());

						try {
							Impact impactObj = new Impact();
							impactObj.setSeverityRanking(impact.getSeverityRanking());
							impactObj.setAssessment(impact.getAssessment());
							impactObj.setScore(impact.getScore());
							
							impactObj.setColorName(impact.getColorName());
							impactObj.setColor(impact.getColor());

							impactRepository.persist(impactObj);
							System.out.println("Impact Seed data loaded successfully.");
						} catch (PersistenceException e) {
							e.printStackTrace();

						} catch (Exception e) {
							// TODO: handle exception
							e.printStackTrace();
						}

					}

				} catch (IOException e) {
					e.printStackTrace();
				}

			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
}
/**
package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Impact;
import tz.go.psssf.risk.repository.ImpactRepository;

@ApplicationScoped
public class ImpactSeeder {

    @Inject
    ImpactRepository impactRepository;

    @Transactional
    public void seed() {
        if (impactRepository.count() == 0) {
            for (int i = 1; i <= 10; i++) {
                Impact impact = new Impact();
                impact.setSeverityRanking("Severity " + i);
                impact.setAssessment("Assessment for Severity " + i);
                impact.setScore(i);
                impactRepository.persist(impact);
            }
        }
    }
}

**/