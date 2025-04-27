package tz.go.psssf.risk.seeder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.RiskStatus;
import tz.go.psssf.risk.repository.RiskStatusRepository;

@ApplicationScoped
public class RiskStatusSeeder {

    @Inject
    RiskStatusRepository riskStatusRepository;

    @Transactional
    public void seed() {
    	
  
    	System.out.println("######################## START RiskStatusSeeder seed ################################");
    	

        try {
            Long count = riskStatusRepository.count(); // Wait for the count result
            if (count == 0) {

                ObjectMapper mapper = new ObjectMapper();

                try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                        .getResourceAsStream("data/risk-status-seed-data.json")) {

                    if (inputStream == null) {
                        throw new IOException("File risk-status-seed-data.json not found");
                    }

                    List<RiskStatus> statuses = mapper.readValue(inputStream,
                            mapper.getTypeFactory().constructCollectionType(List.class, RiskStatus.class));

                    for (RiskStatus status : statuses) {
                        System.out.println("Saving: " + status.getName());

                        try {
                            RiskStatus existingStatus = riskStatusRepository.findByCode(status.getCode());
                            if (existingStatus == null) {
                                riskStatusRepository.persist(status);
                                System.out.println("Yes : "+ status.getName());
                            } else {
                                existingStatus.setName(status.getName());
                                existingStatus.setDescription(status.getDescription());
                                existingStatus.setType(status.getType());
                                riskStatusRepository.persist(existingStatus);
                            }

                            System.out.println("Risk Status Seed data loaded successfully.");
                        } catch (PersistenceException e) {
                            e.printStackTrace();

                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }

            }else {
            	System.out.println("No data to seed. data already exits");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        
      
    	System.out.println("######################## END RiskStatusSeeder seed ################################");
    
    }
}
