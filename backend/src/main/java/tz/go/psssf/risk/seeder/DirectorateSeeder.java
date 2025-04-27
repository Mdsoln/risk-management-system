package tz.go.psssf.risk.seeder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Directorate;
import tz.go.psssf.risk.repository.DirectorateRepository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@ApplicationScoped
public class DirectorateSeeder {

    @Inject
    DirectorateRepository directorateRepository;

    @Transactional
    public void seed() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                .getResourceAsStream("data/directorate-seed-data.json")) {

            if (inputStream == null) {
                throw new IOException("File directorate-seed-data.json not found");
            }

            JsonNode rootNode = mapper.readTree(inputStream);

            List<Directorate> directorates = mapper.convertValue(
                    rootNode,
                    mapper.getTypeFactory().constructCollectionType(List.class, Directorate.class)
            );

            // Persist or update each directorate
            for (Directorate directorate : directorates) {
                createOrUpdateDirectorate(directorate);
            }

            System.out.println("Directorate seeding completed successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void createOrUpdateDirectorate(Directorate directorate) {
        Directorate existingDirectorate = directorateRepository.find("code", directorate.getCode()).firstResult();
        if (existingDirectorate != null) {
            // Update existing directorate
            existingDirectorate.setName(directorate.getName());
            existingDirectorate.setDescription(directorate.getDescription());
            existingDirectorate.setShortName(directorate.getShortName());
            existingDirectorate.setType(directorate.getType());
            existingDirectorate.setReference(directorate.getReference());
            directorateRepository.getEntityManager().merge(existingDirectorate);
        } else {
            // Create new directorate
            directorateRepository.persist(directorate);
        }
    }
}
