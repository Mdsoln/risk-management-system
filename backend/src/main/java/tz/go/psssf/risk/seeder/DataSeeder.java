package tz.go.psssf.risk.seeder;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.compliance.seeder.ComplianceSeeder;
import tz.go.psssf.risk.repository.CategoryRepository;
import tz.go.psssf.risk.repository.SubCategoryRepository;

import org.jboss.logging.Logger;

@ApplicationScoped
public class DataSeeder {

    @Inject
    Logger log;

    @Inject
    FundObjectiveSeeder fundObjectiveSeeder;

    @Inject
    BusinessProcessSeeder businessProcessSeeder;

    @Inject
    CategoryRepository categoryRepository;

    @Inject
    SubCategoryRepository subCategoryRepository;

    @Inject
    RiskRegistrySeeder riskRegistrySeeder;

    @Inject
    LikelihoodSeeder likelihoodSeeder;

    @Inject
    ImpactSeeder impactSeeder;

    @Inject
    DepartmentSeeder departmentSeeder;

//    @Inject
//    DepartmentOwnerSeeder departmentOwnerSeeder;

    @Inject
    RiskReportingFrequencySeeder riskReportingFrequencySeeder;

    @Inject
    RiskAreaSeeder riskAreaSeeder;

    @Inject
    InherentRiskSeeder inherentRiskSeeder;

    @Inject
    ResidualRiskSeeder residualRiskSeeder;

    @Inject
    RiskSeeder riskSeeder;

    @Inject
    MonitoringFrequencySeeder monitoringFrequencySeeder;

    @Inject
    RiskIndicatorSeeder riskIndicatorSeeder;

    @Inject
    RiskOpportunitySeeder riskOpportunitySeeder;

    @Inject
    RiskCauseSeeder riskCauseSeeder;

    @Inject
    MeasurementSeeder measurementSeeder;

    @Inject
    ComparisonOperatorSeeder comparisonOperatorSeeder;

    @Inject
    ThresholdCategorySeeder thresholdCategorySeeder;

    @Inject 
    RiskStatusSeeder riskStatusSeeder;



    @Inject
    RoleAndPermissionsSeeder roleAndPermissionsSeeder;

    @Inject
    UserTypeSeeder userTypeSeeder;

    @Inject
    DirectorateSeeder directorateSeeder;

    @Inject
    UserSeeder userSeeder;


    // compliance
    @Inject
    ComplianceSeeder complianceSeeder;

    // Remove @Transactional from the main method to allow individual seeders to manage their own transactions
    public void seed(@Observes StartupEvent event) {
        try {
            log.info("########################################################");
            log.info("########################################################");
            log.info("########################################################");
            log.info("########################################################");
            log.info("########################  START SEED ################################");
            log.info("########################################################");
            log.info("########################################################");
            log.info("########################################################");

            // Execute each seeder in its own try-catch block to prevent one failure from stopping others
            seedWithErrorHandling("Directorate", () -> directorateSeeder.seed());
            seedWithErrorHandling("Department", () -> departmentSeeder.seed());

            seedWithErrorHandling("RiskStatus", () -> riskStatusSeeder.seed());
            seedWithErrorHandling("RiskArea", () -> riskAreaSeeder.seed());
            seedWithErrorHandling("Measurement", () -> measurementSeeder.seed());
            seedWithErrorHandling("ThresholdCategory", () -> thresholdCategorySeeder.seed());
            seedWithErrorHandling("ComparisonOperator", () -> comparisonOperatorSeeder.seed());
            seedWithErrorHandling("UserType", () -> userTypeSeeder.seed());
            seedWithErrorHandling("User", () -> userSeeder.seed());

            seedWithErrorHandling("RoleAndPermissions", () -> roleAndPermissionsSeeder.seed());
            seedWithErrorHandling("Likelihood", () -> likelihoodSeeder.seed());
            seedWithErrorHandling("Impact", () -> impactSeeder.seed());
            seedWithErrorHandling("MonitoringFrequency", () -> monitoringFrequencySeeder.seed());
            seedWithErrorHandling("FundObjective", () -> fundObjectiveSeeder.seed());
            seedWithErrorHandling("BusinessProcess", () -> businessProcessSeeder.seed());

            seedWithErrorHandling("Compliance", () -> complianceSeeder.seedComplianceData());

            log.info("########################################################");
            log.info("########################################################");
            log.info("########################################################");
            log.info("########################################################");
            log.info("########################  END SEED ################################");
            log.info("########################################################");
            log.info("########################################################");
            log.info("########################################################");
        } catch (Exception e) {
            log.error("Error during seeding process", e);
        }
    }

    // Helper method to execute a seeder with error handling
    private void seedWithErrorHandling(String seederName, Runnable seederMethod) {
        try {
            log.info("Starting " + seederName + " seeding...");
            seederMethod.run();
            log.info(seederName + " seeding completed successfully.");
        } catch (Exception e) {
            log.error("Error during " + seederName + " seeding", e);
            // Continue with other seeders even if this one fails
        }
    }
}
