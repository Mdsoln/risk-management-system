package tz.go.psssf.risk.seeder;

import java.util.List;
import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.ComparisonOperator;
import tz.go.psssf.risk.repository.ComparisonOperatorRepository;

@ApplicationScoped
public class ComparisonOperatorSeeder {

    @Inject
    ComparisonOperatorRepository comparisonOperatorRepository;

    @Transactional
    public void seed() {
        try {
            Long count = comparisonOperatorRepository.count();
            if (count == 0) {
                ObjectMapper mapper = new ObjectMapper();

                try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                        .getResourceAsStream("data/comparison-operator-seed-data.json")) {

                    if (inputStream == null) {
                        throw new IOException("File comparison-operator-seed-data.json not found");
                    }

                    List<ComparisonOperator> comparisonOperators = mapper.readValue(inputStream,
                            mapper.getTypeFactory().constructCollectionType(List.class, ComparisonOperator.class));

                    for (ComparisonOperator comparisonOperator : comparisonOperators) {
                        System.out.println("Saving: " + comparisonOperator.getName());

                        try {
                            ComparisonOperator comparisonOperatorObj = new ComparisonOperator();
                            comparisonOperatorObj.setName(comparisonOperator.getName());
                            comparisonOperatorObj.setDescription(comparisonOperator.getDescription());
                            comparisonOperatorObj.setCode(comparisonOperator.getCode());
                            comparisonOperatorObj.setSymbol(comparisonOperator.getSymbol());

                            comparisonOperatorRepository.persist(comparisonOperatorObj);
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
