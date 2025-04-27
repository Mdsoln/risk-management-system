package tz.go.psssf.risk.seeder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.entity.RiskArea;
import tz.go.psssf.risk.entity.RiskAreaCategory;
import tz.go.psssf.risk.repository.RiskAreaCategoryRepository;
import tz.go.psssf.risk.repository.RiskAreaRepository;

@ApplicationScoped
public class RiskAreaSeeder {

    @Inject
    RiskAreaCategoryRepository riskAreaCategoryRepository;

    @Inject
    RiskAreaRepository riskAreaRepository;

    @Inject
    Logger log;

    @Transactional
    public void seed() {
        log.info("######################## START RiskAreaSeeder seed ################################");

        try {
            Long count = riskAreaCategoryRepository.count();
            log.info("Count Risk Area Category: " + count);

            if (count == 0) {
                ObjectMapper mapper = new ObjectMapper();
                try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                        .getResourceAsStream("data/risk-area-seed-data.json")) {

                    if (inputStream == null) {
                        throw new IOException("File risk-area-seed-data.json not found");
                    }

                    List<RiskAreaCategory> categories = mapper.readValue(inputStream,
                            mapper.getTypeFactory().constructCollectionType(List.class, RiskAreaCategory.class));

                    for (RiskAreaCategory category : categories) {
                        log.info("Saving Risk Area Category: " + category.getName());
                        try {
                            riskAreaCategoryRepository.persist(category);

                            for (RiskArea riskArea : category.getRiskAreas()) {
                                riskArea.setRiskAreaCategory(category);
                                riskAreaRepository.persist(riskArea);
                                log.info(" --- Saving Risk Area : " + riskArea.getName());
                            }
                            
                            log.info("Risk Area Category and Risk Areas Seed data loaded successfully.");
                        } catch (PersistenceException e) {
                            log.error("PersistenceException", e);
                        } catch (Exception e) {
                            log.error("Exception", e);
                        }
                    }
                } catch (IOException e) {
                    log.error("IOException", e);
                }
            } else {
                log.info("No data to seed. Data already exists.");
            }
        } catch (Exception e) {
            log.error("Exception", e);
        }

        log.info("######################## END RiskAreaSeeder seed ################################");
    }
}
