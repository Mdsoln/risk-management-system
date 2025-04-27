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
import tz.go.psssf.risk.repository.RiskReportingFrequencyRepository;

@ApplicationScoped
public class RiskReportingFrequencySeeder {

	@Inject
	RiskReportingFrequencyRepository riskReportingFrequencyRepository;

	@Transactional
	public void seed() {

		try {

			Long count = riskReportingFrequencyRepository.count(); // Wait for the count result
			if (count == 0) {

				ObjectMapper mapper = new ObjectMapper();

				try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
						.getResourceAsStream("data/risk-reporting-frequency-seed-data.json")) {

					if (inputStream == null) {
						throw new IOException("File risk-reporting-frequency-seed-data.json not found");
					}

					List<MonitoringFrequency> riskReportingFrequencies = mapper.readValue(inputStream,
							mapper.getTypeFactory().constructCollectionType(List.class, MonitoringFrequency.class));

					for (MonitoringFrequency riskreportingfrequency : riskReportingFrequencies) {
						System.out.println("Saving: " + riskreportingfrequency.getFrequency());

						try {
							MonitoringFrequency riskReportingFrequencyObj = new MonitoringFrequency();
							riskReportingFrequencyObj.setFrequency(riskreportingfrequency.getFrequency());
							riskReportingFrequencyObj.setFrequencyDescription(riskreportingfrequency.getFrequencyDescription());
							riskReportingFrequencyObj.setCode(riskreportingfrequency.getCode());
							riskReportingFrequencyObj.setLevel(riskreportingfrequency.getLevel());

							riskReportingFrequencyRepository.persist(riskReportingFrequencyObj);
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
