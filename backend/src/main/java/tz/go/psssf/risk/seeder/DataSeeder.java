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

    @Transactional
    public void seed(@Observes StartupEvent event) {
    	
    	
        log.info("########################################################");
        log.info("########################################################");
        log.info("########################################################");
        log.info("########################################################");
        log.info("########################  START SEED ################################");
        log.info("########################################################");
        log.info("########################################################");
        log.info("########################################################");
        
//      directorateSeeder.seed();
//      departmentSeeder.seed();
//      
//
//         riskStatusSeeder.seed();
//         riskAreaSeeder.seed();
//         measurementSeeder.seed();
//         thresholdCategorySeeder.seed();
//         comparisonOperatorSeeder.seed();
//         userTypeSeeder.seed();
//         userSeeder.seed();
//        
//         roleAndPermissionsSeeder.seed();
//         likelihoodSeeder.seed();
//         impactSeeder.seed();
//         monitoringFrequencySeeder.seed();
//         fundObjectiveSeeder.seed();
//         businessProcessSeeder.seed();
//        
//        complianceSeeder.seedComplianceData();

         

        
        log.info("########################################################");
        log.info("########################################################");
        log.info("########################################################");
        log.info("########################################################");
        log.info("########################  END SEED ################################");
        log.info("########################################################");
        log.info("########################################################");
        log.info("########################################################");
    }
}
