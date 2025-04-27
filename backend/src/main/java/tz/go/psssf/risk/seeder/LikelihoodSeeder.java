package tz.go.psssf.risk.seeder;

import java.util.List;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.constants.ResponseConstants;
import tz.go.psssf.risk.entity.Likelihood;
import tz.go.psssf.risk.repository.LikelihoodRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class LikelihoodSeeder {

	@Inject
	LikelihoodRepository likelihoodRepository;

	@Transactional
	public void seed() {

		try {

			Long count = likelihoodRepository.count(); // Wait for the count result
			if (count == 0) {

				ObjectMapper mapper = new ObjectMapper();

				try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
						.getResourceAsStream("data/likelihood-seed-data.json")) {

					if (inputStream == null) {
						throw new IOException("File likelihood-seed-data.json not found");
					}

					List<Likelihood> likelihoods = mapper.readValue(inputStream,
							mapper.getTypeFactory().constructCollectionType(List.class, Likelihood.class));

					for (Likelihood likelihood : likelihoods) {
						System.out.println("Saving: " + likelihood.getLikelihoodCategory());

						try {
							Likelihood likelihoodObj = new Likelihood();
							likelihoodObj.setLikelihoodCategory(likelihood.getLikelihoodCategory());
							likelihoodObj.setCategoryDefinition(likelihood.getCategoryDefinition());
							likelihoodObj.setScore(likelihood.getScore());
							likelihoodObj.setColorName(likelihood.getColorName());
							likelihoodObj.setColor(likelihood.getColor());

							likelihoodRepository.persist(likelihoodObj);
							System.out.println("Seed data loaded successfully.");
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
import tz.go.psssf.risk.entity.Likelihood;
import tz.go.psssf.risk.repository.LikelihoodRepository;

@ApplicationScoped
public class LikelihoodSeeder {

    @Inject
    LikelihoodRepository likelihoodRepository;

    @Transactional
    public void seed() {
        if (likelihoodRepository.count() == 0) {
            for (int i = 1; i <= 10; i++) {
                Likelihood likelihood = new Likelihood();
                likelihood.setLikelihoodCategory("Category " + i);
                likelihood.setCategoryDefinition("Definition for Category " + i);
                likelihood.setScore(i);
                likelihoodRepository.persist(likelihood);
            }
        }
    }
}

 **/
