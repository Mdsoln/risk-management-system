package tz.go.psssf.risk.seeder;

import java.util.List;
import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.MonitoringFrequency;
import tz.go.psssf.risk.repository.MonitoringFrequencyRepository;

@ApplicationScoped
public class MonitoringFrequencySeeder {

	@Inject
	MonitoringFrequencyRepository MonitoringFrequencyRepository;

	@Transactional
	public void seed() {

		try {

			Long count = MonitoringFrequencyRepository.count(); // Wait for the count result
			if (count == 0) {

				ObjectMapper mapper = new ObjectMapper();

				try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
						.getResourceAsStream("data/monitoring-frequency-seed-data.json")) {

					if (inputStream == null) {
						throw new IOException("File monitoring-frequency-seed-data.json not found");
					}

					List<MonitoringFrequency> riskReportingFrequencies = mapper.readValue(inputStream,
							mapper.getTypeFactory().constructCollectionType(List.class, MonitoringFrequency.class));

					for (MonitoringFrequency MonitoringFrequency : riskReportingFrequencies) {
						System.out.println("Saving: " + MonitoringFrequency.getFrequency());

						try {
							MonitoringFrequency MonitoringFrequencyObj = new MonitoringFrequency();
							MonitoringFrequencyObj.setFrequency(MonitoringFrequency.getFrequency());
							MonitoringFrequencyObj.setFrequencyDescription(MonitoringFrequency.getFrequencyDescription());
							MonitoringFrequencyObj.setCode(MonitoringFrequency.getCode());
							MonitoringFrequencyObj.setLevel(MonitoringFrequency.getLevel());

							MonitoringFrequencyRepository.persist(MonitoringFrequencyObj);
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
