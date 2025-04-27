package tz.go.psssf.risk.seeder;

import java.util.List;
import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.ThresholdCategory;
import tz.go.psssf.risk.repository.ThresholdCategoryRepository;

@ApplicationScoped
public class ThresholdCategorySeeder {

    @Inject
    ThresholdCategoryRepository thresholdCategoryRepository;

    @Transactional
    public void seed() {
        try {
            Long count = thresholdCategoryRepository.count();
            if (count == 0) {
                ObjectMapper mapper = new ObjectMapper();

                try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                        .getResourceAsStream("data/threshold-category-seed-data.json")) {

                    if (inputStream == null) {
                        throw new IOException("File threshold-category-seed-data.json not found");
                    }

                    List<ThresholdCategory> thresholdCategories = mapper.readValue(inputStream,
                            mapper.getTypeFactory().constructCollectionType(List.class, ThresholdCategory.class));

                    for (ThresholdCategory thresholdCategory : thresholdCategories) {
                        System.out.println("Saving: " + thresholdCategory.getName());

                        try {
                            ThresholdCategory thresholdCategoryObj = new ThresholdCategory();
                            thresholdCategoryObj.setName(thresholdCategory.getName());
                            thresholdCategoryObj.setDescription(thresholdCategory.getDescription());
                            thresholdCategoryObj.setCode(thresholdCategory.getCode());

                            thresholdCategoryRepository.persist(thresholdCategoryObj);
                            System.out.println("Seed data loaded successfully.");
                        } catch (PersistenceException e) {
                            e.printStackTrace();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
