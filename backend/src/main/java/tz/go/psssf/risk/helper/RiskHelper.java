package tz.go.psssf.risk.helper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.RiskActionPlanDTO;
import tz.go.psssf.risk.entity.*;
import tz.go.psssf.risk.repository.*;

import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped
public class RiskHelper {

    @Inject
    RiskRepository riskRepository;

    @Inject
    RiskStatusRepository riskStatusRepository;

    @Inject
    RiskAssessmentHistoryRepository riskAssessmentHistoryRepository;

    @Inject
    RiskAssessmentLevelRepository riskAssessmentLevelRepository;

    @Inject
    LoggedInUserHelper loggedInUserHelper;

    @Inject
    Logger log;

    @Transactional
    public RiskAssessmentStatus createRiskAssessmentFlowAndStatus(Risk risk) {
    	
    	
        
        // Persist Risk entity before creating RiskAssessmentFlow and RiskAssessmentStatus
        riskRepository.persist(risk);

        // Create RiskAssessmentFlow
        RiskAssessmentFlow riskAssessmentFlow = new RiskAssessmentFlow();
        riskRepository.getEntityManager().persist(riskAssessmentFlow);

        // Find the draft status
        RiskStatus draftStatus = riskStatusRepository.find("code", "DRAFT").firstResult();
        if (draftStatus == null) {
            throw new IllegalStateException("Draft RiskStatus not found");
        }
        
        

        // Create RiskAssessmentStatus
        RiskAssessmentStatus riskAssessmentStatus = new RiskAssessmentStatus();
        riskAssessmentStatus.setRiskStatus(draftStatus);
        riskAssessmentStatus.setRiskAssessmentFlow(riskAssessmentFlow);
        riskAssessmentStatus.setRisk(risk, false); // Avoid infinite loop
        riskRepository.getEntityManager().persist(riskAssessmentStatus);
        
        

        // Create and persist RiskAssessmentLevels
        createRiskAssessmentLevels(riskAssessmentFlow);
        
        

        // Create initial RiskAssessmentHistory entry
        createRiskAssessmentHistory(riskAssessmentFlow, draftStatus, "Initial draft status");
        
  

        return riskAssessmentStatus;
    }

    private void createRiskAssessmentLevels(RiskAssessmentFlow riskAssessmentFlow) {
        // Create RiskAssessmentLevel for Risk Champion
        RiskAssessmentLevel riskChampionLevel = new RiskAssessmentLevel();
        riskChampionLevel.setRiskAssessmentFlow(riskAssessmentFlow);
        riskChampionLevel.setName("Risk Champion Level");
        riskChampionLevel.setDescription("Risk Champion Level Description");
        riskChampionLevel.setLevel(1);
        riskChampionLevel.setCurrent(true); // Set the first level as current
        riskChampionLevel.setCompleted(false);
        riskRepository.getEntityManager().persist(riskChampionLevel);

        // Create RiskAssessmentLevel for Department Owner
        RiskAssessmentLevel departmentOwnerLevel = new RiskAssessmentLevel();
        departmentOwnerLevel.setRiskAssessmentFlow(riskAssessmentFlow);
        departmentOwnerLevel.setName("Department Owner Level");
        departmentOwnerLevel.setDescription("Department Owner Level Description");
        departmentOwnerLevel.setLevel(2);
        departmentOwnerLevel.setCurrent(false);
        departmentOwnerLevel.setCompleted(false);
        riskRepository.getEntityManager().persist(departmentOwnerLevel);

        // Add levels to the flow
        riskAssessmentFlow.getRiskAssessmentLevels().add(riskChampionLevel);
        riskAssessmentFlow.getRiskAssessmentLevels().add(departmentOwnerLevel);
    }

    // Change this method to public
    @Transactional
    public void createRiskAssessmentHistory(RiskAssessmentFlow riskAssessmentFlow, RiskStatus riskStatus, String comment) {
        RiskAssessmentHistory riskAssessmentHistory = new RiskAssessmentHistory();
        riskAssessmentHistory.setRiskAssessmentFlow(riskAssessmentFlow);
        riskAssessmentHistory.setRiskStatus(riskStatus);
        riskAssessmentHistory.setTimestamp(LocalDateTime.now());
        riskAssessmentHistory.setComment(comment);
        riskAssessmentHistory.setPerformedBy("System"); // Set the user or system performing the action
        
//        System.out.println("########################################################");
//        System.out.println("########################################################");
//        System.out.println("########################################################");
//        System.out.println("########################################################");
//        System.out.println("########################################################");
//        System.out.println("########################################################");
//        System.out.println("########################## 77777 ##############################");
//        System.out.println("##### loggedInUserHelper.getLoggedInRiskChampion(): "+ loggedInUserHelper.getLoggedInRiskChampion().getUser().getJobTitle());
//        System.out.println("##### loggedInUserHelper.getLoggedInDepartmentOwner(): "+ loggedInUserHelper.getLoggedInDepartmentOwner().getUser().getJobTitle());
//        System.out.println("########################################################");
//        System.out.println("########################################################");
//        System.out.println("########################################################");
//        System.out.println("########################################################");
//        System.out.println("########################################################");
//        riskAssessmentHistory.setRiskChampion(loggedInUserHelper.getLoggedInRiskChampion());
        riskAssessmentHistory.setUser(loggedInUserHelper.getLoggedInUser());
        riskAssessmentHistory.setRiskAssessmentLevel(determineCurrentLevel(riskAssessmentFlow));
        
        
        
        riskAssessmentHistoryRepository.persist(riskAssessmentHistory);
    }

    private RiskAssessmentLevel determineCurrentLevel(RiskAssessmentFlow riskAssessmentFlow) {
        // Logic to determine the current level
        return riskAssessmentFlow.getRiskAssessmentLevels().stream()
            .filter(RiskAssessmentLevel::isCurrent)
            .findFirst()
            .orElseThrow(() -> new IllegalStateException("No current level found"));
    }

    // New method for updating risk status and allowing level change
    @Transactional
    public void updateRiskStatus(Risk risk, String riskStatusId, String comment, boolean allowChangeLevel) throws Exception {
        log.info("Updating Risk status for ID: " + risk.getId());
        log.info("New status ID: " + riskStatusId + ", Comment: " + comment + ", Allow Change Level: " + allowChangeLevel);

        // Fetch the RiskStatus entity with the given ID
        RiskStatus riskStatus = riskStatusRepository.findById(riskStatusId);
        if (riskStatus == null) {
            log.error("RiskStatus with ID " + riskStatusId + " not found");
            throw new Exception("RiskStatus not found");
        }

        // Ensure RiskAssessmentStatus is fully initialized
        RiskAssessmentStatus riskAssessmentStatus = risk.getRiskAssessmentStatus();
        if (riskAssessmentStatus == null) {
            log.error("RiskAssessmentStatus not found for Risk ID: " + risk.getId());
            throw new Exception("RiskAssessmentStatus not found");
        }

        log.info("Current RiskAssessmentStatus: " + riskAssessmentStatus);

        // Update the RiskAssessmentStatus
        riskAssessmentStatus.setRiskStatus(riskStatus);
        riskRepository.getEntityManager().merge(riskAssessmentStatus);
        log.info("RiskAssessmentStatus updated");

        // List of status codes that should not trigger level change
        List<String> noChangeLevelStatuses = List.of("UNDER_REVIEW", "APPROVED");

        // List of status codes that should return to the previous level
        List<String> returnToPreviousLevelStatuses = List.of("REJECTED");

        RiskAssessmentFlow riskAssessmentFlow = riskAssessmentStatus.getRiskAssessmentFlow();
        RiskAssessmentLevel currentLevel = riskAssessmentFlow.getRiskAssessmentLevels().stream()
            .filter(RiskAssessmentLevel::isCurrent)
            .findFirst()
            .orElse(null);

        // Handle the status that returns to the previous level
        if (returnToPreviousLevelStatuses.contains(riskStatus.getCode()) && currentLevel != null) {
            currentLevel.setCurrent(false);
            currentLevel.setCompleted(false); // Mark the current level as incomplete
            riskRepository.getEntityManager().merge(currentLevel);

            int previousLevelOrder = currentLevel.getLevel() - 1;
            RiskAssessmentLevel previousLevel = riskAssessmentFlow.getRiskAssessmentLevels().stream()
                .filter(level -> level.getLevel() == previousLevelOrder)
                .findFirst()
                .orElse(null);

            if (previousLevel != null) {
                previousLevel.setCurrent(true);
                previousLevel.setCompleted(false);
                riskRepository.getEntityManager().merge(previousLevel);
                log.info("RiskAssessmentLevel returned to: " + previousLevel.getName());
            } else {
                log.info("No previous level found, remaining at current level.");
            }
        }

        // If allowed, change the current level in RiskAssessmentFlow
        else if (allowChangeLevel && !noChangeLevelStatuses.contains(riskStatus.getCode()) && currentLevel != null) {
            currentLevel.setCurrent(false);
            currentLevel.setCompleted(true);
            riskRepository.getEntityManager().merge(currentLevel);

            int nextLevelOrder = currentLevel.getLevel() + 1;
            RiskAssessmentLevel nextLevel = riskAssessmentFlow.getRiskAssessmentLevels().stream()
                .filter(level -> level.getLevel() == nextLevelOrder)
                .findFirst()
                .orElse(null);

            if (nextLevel != null) {
                nextLevel.setCurrent(true);
                riskRepository.getEntityManager().merge(nextLevel);
                log.info("RiskAssessmentLevel changed to: " + nextLevel.getName());
            } else {
                log.info("No next level found, current level is the final level.");
            }
        }

        // Persist the Risk entity to ensure changes are saved
        riskRepository.getEntityManager().merge(risk);
        log.info("Risk entity persisted");

        // Create a new RiskAssessmentHistory entry
        createRiskAssessmentHistory(
            riskAssessmentStatus.getRiskAssessmentFlow(),
            riskStatus,
            comment
        );

        // Flush changes to the database
        riskRepository.getEntityManager().flush();

        log.info("Risk ID: " + risk.getId() + " status updated to: " + riskAssessmentStatus.getRiskStatus().getCode());
    }
    
    
    /**
     * Method to check if an action plan is required based on the product of residual likelihood and impact scores.
     * @param residualLikelihoodScore - Residual likelihood score of the risk.
     * @param residualImpactScore - Residual impact score of the risk.
     * @param riskActionPlans - List of RiskActionPlanDTO objects.
     * @return boolean - Returns true if the product of the scores is greater than 4 and there are action plans, otherwise throws an IllegalArgumentException.
     */
    public boolean checkIfActionPlanRequired(int residualLikelihoodScore, int residualImpactScore, List<RiskActionPlanDTO> riskActionPlans) {
        log.info("Checking if action plan is required for Likelihood Score: " + residualLikelihoodScore + " and Impact Score: " + residualImpactScore);

        // Calculate the product of the likelihood and impact scores
        int product = residualLikelihoodScore * residualImpactScore;

        // If the product is greater than 4, check if action plans are provided
        if (product > 4) {
            if (riskActionPlans.isEmpty()) {
                log.error("Product is greater than 4 but no action plans provided.");
                throw new IllegalArgumentException("Action plan required but none provided for high residual risk scores.");
            }
            log.info("Action plan is required as the product of scores is greater than 4. Product: " + product);
            return true;
        }

        // If the product is less than or equal to 4, no action plan is required
        log.info("No action plan required as the product of scores is less than or equal to 4. Product: " + product);
        return false;
    }
}
