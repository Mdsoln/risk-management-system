package tz.go.psssf.risk.seeder;

import java.util.List;
import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Measurement;
import tz.go.psssf.risk.repository.MeasurementRepository;

@ApplicationScoped
public class MeasurementSeeder {

    @Inject
    MeasurementRepository measurementRepository;

    @Transactional
    public void seed() {
        try {
            Long count = measurementRepository.count();
            if (count == 0) {
                ObjectMapper mapper = new ObjectMapper();

                try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                        .getResourceAsStream("data/measurement-seed-data.json")) {

                    if (inputStream == null) {
                        throw new IOException("File measurement-seed-data.json not found");
                    }

                    List<Measurement> measurements = mapper.readValue(inputStream,
                            mapper.getTypeFactory().constructCollectionType(List.class, Measurement.class));

                    for (Measurement measurement : measurements) {
                        System.out.println("Saving: " + measurement.getName());

                        try {
                            Measurement measurementObj = new Measurement();
                            measurementObj.setName(measurement.getName());
                            measurementObj.setDescription(measurement.getDescription());
                            measurementObj.setCode(measurement.getCode());

                            measurementRepository.persist(measurementObj);
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
