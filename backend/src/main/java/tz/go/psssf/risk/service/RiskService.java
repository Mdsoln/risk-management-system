package tz.go.psssf.risk.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.jboss.logging.Logger;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import tz.go.psssf.risk.dto.ComparisonConditionDTO;
import tz.go.psssf.risk.dto.ControlIndicatorDTO;
import tz.go.psssf.risk.dto.ControlIndicatorThresholdDTO;
import tz.go.psssf.risk.dto.RiskActionPlanDTO;
import tz.go.psssf.risk.dto.RiskActionPlanMonitoringDTO;
import tz.go.psssf.risk.dto.RiskAssessmentHistoryDTO;
import tz.go.psssf.risk.dto.RiskControlDTO;
import tz.go.psssf.risk.dto.RiskDTO;
import tz.go.psssf.risk.dto.RiskIndicatorDTO;
import tz.go.psssf.risk.dto.RiskIndicatorThresholdDTO;
import tz.go.psssf.risk.entity.ControlIndicator;
import tz.go.psssf.risk.entity.ControlIndicatorComparisonCondition;
import tz.go.psssf.risk.entity.ControlIndicatorThreshold;
import tz.go.psssf.risk.entity.Department;
import tz.go.psssf.risk.entity.Impact;
import tz.go.psssf.risk.entity.InherentRisk;
import tz.go.psssf.risk.entity.Likelihood;
import tz.go.psssf.risk.entity.ResidualRisk;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.entity.RiskActionPlan;
import tz.go.psssf.risk.entity.RiskActionPlanMonitoring;
import tz.go.psssf.risk.entity.RiskAssessmentStatus;
import tz.go.psssf.risk.entity.RiskControl;
import tz.go.psssf.risk.entity.RiskIndicator;
import tz.go.psssf.risk.entity.RiskIndicatorComparisonCondition;
import tz.go.psssf.risk.entity.RiskIndicatorThreshold;
import tz.go.psssf.risk.entity.RiskStatus;
import tz.go.psssf.risk.enums.RecordStatus;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.helper.RiskBoundChecker;
import tz.go.psssf.risk.helper.RiskHelper;
import tz.go.psssf.risk.mapper.ControlIndicatorComparisonConditionMapper;
import tz.go.psssf.risk.mapper.ControlIndicatorMapper;
import tz.go.psssf.risk.mapper.ControlIndicatorThresholdMapper;
import tz.go.psssf.risk.mapper.RiskActionPlanMapper;
import tz.go.psssf.risk.mapper.RiskActionPlanMonitoringMapper;
import tz.go.psssf.risk.mapper.RiskControlMapper;
import tz.go.psssf.risk.mapper.RiskIndicatorComparisonConditionMapper;
import tz.go.psssf.risk.mapper.RiskIndicatorMapper;
import tz.go.psssf.risk.mapper.RiskIndicatorThresholdMapper;
import tz.go.psssf.risk.mapper.RiskMapper;
import tz.go.psssf.risk.mapper.SimplifiedListRiskMapper;
import tz.go.psssf.risk.mapper.SimplifiedRiskActionPlanMapper;
import tz.go.psssf.risk.pojo.RiskPojo;
import tz.go.psssf.risk.pojo.RiskWithActionPlansPojo;
import tz.go.psssf.risk.pojo.SimplifiedRiskActionPlanPojo;
import tz.go.psssf.risk.repository.ControlIndicatorComparisonConditionRepository;
import tz.go.psssf.risk.repository.ControlIndicatorRepository;
import tz.go.psssf.risk.repository.ControlIndicatorThresholdRepository;
import tz.go.psssf.risk.repository.DepartmentRepository;
import tz.go.psssf.risk.repository.ImpactRepository;
import tz.go.psssf.risk.repository.LikelihoodRepository;
import tz.go.psssf.risk.repository.MeasurementRepository;
import tz.go.psssf.risk.repository.RiskActionPlanMonitoringRepository;
import tz.go.psssf.risk.repository.RiskActionPlanRepository;
import tz.go.psssf.risk.repository.RiskControlRepository;
import tz.go.psssf.risk.repository.RiskIndicatorComparisonConditionRepository;
import tz.go.psssf.risk.repository.RiskIndicatorRepository;
import tz.go.psssf.risk.repository.RiskIndicatorThresholdRepository;
import tz.go.psssf.risk.repository.RiskRepository;
import tz.go.psssf.risk.repository.RiskStatusRepository;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class RiskService {

    @Inject
    Logger log;

    @Inject
    RiskRepository riskRepository;

    @Inject
    RiskIndicatorRepository riskIndicatorRepository;

    @Inject
    RiskControlRepository riskControlRepository;

    @Inject
    ControlIndicatorRepository controlIndicatorRepository;

    @Inject
    LikelihoodRepository likelihoodRepository;

    @Inject
    ImpactRepository impactRepository;

    @Inject
    RiskMapper riskMapper;

    @Inject
    RiskIndicatorMapper riskIndicatorMapper;

    @Inject
    RiskIndicatorThresholdMapper riskIndicatorThresholdMapper;

    @Inject
    RiskIndicatorComparisonConditionMapper riskIndicatorComparisonConditionMapper;

    @Inject
    RiskControlMapper riskControlMapper;

    @Inject
    ControlIndicatorMapper controlIndicatorMapper;

    @Inject
    ControlIndicatorThresholdMapper controlIndicatorThresholdMapper;

    @Inject
    ControlIndicatorComparisonConditionMapper controlIndicatorComparisonConditionMapper;

    @Inject
    ControlIndicatorThresholdRepository controlIndicatorThresholdRepository;

    @Inject
    ControlIndicatorComparisonConditionRepository controlIndicatorComparisonConditionRepository;

    @Inject
    RiskIndicatorThresholdRepository riskIndicatorThresholdRepository;

    @Inject
    RiskIndicatorComparisonConditionRepository riskIndicatorComparisonConditionRepository;
    
    @Inject
    RiskStatusRepository riskStatusRepository;
    
    @Inject
    RiskHelper riskHelper;
    
    @Inject
    DepartmentRepository departmentRepository;
    
    @Inject
    RiskActionPlanMapper riskActionPlanMapper;
    
    @Inject
    RiskActionPlanMonitoringMapper riskActionPlanMonitoringMapper;
    
    @Inject
    SimplifiedListRiskMapper simplifiedListRiskMapper;
    
    @Inject
    RiskActionPlanRepository riskActionPlanRepository;

    @Inject
    RiskActionPlanMonitoringRepository riskActionPlanMonitoringRepository;
    
    @Inject
    SimplifiedRiskActionPlanMapper simplifiedRiskActionPlanMapper;
    
    @Inject
    RiskBoundChecker riskBoundChecker;
    
    @Inject 
    MeasurementRepository measurementRepository;
    
   
    


    // Existing code
    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("name");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("name", "id", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();
    static {
        SORT_FIELD_MAPPINGS.put("name", "Risk");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
        SORT_FIELD_MAPPINGS.put("id", "id");
    }

    private void enableActiveFilter(Session session) {
        Filter filter = session.enableFilter("activeFilter");
        filter.setParameter("status", "ACTIVE");
    }

    public ResponseWrapper<PaginatedResponse<RiskPojo>> findWithPaginationSortingFiltering(int page, int size,
            List<String> sort, String sortDirection, String searchKeyword, LocalDateTime startDate,
            LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<Risk> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<Risk> query = customQueryHelper.findWithPaginationSortingFiltering(
                    riskRepository,
                    Risk.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<Risk> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<RiskPojo> pojos = paginatedResponse.getItems().stream()
                    .map(riskMapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<RiskPojo> pojoPaginatedResponse = new PaginatedResponse<>(
                    paginatedResponse.getCurrentPage(),
                    paginatedResponse.getTotalPages(),
                    paginatedResponse.getTotalItems(),
                    paginatedResponse.getPageSize(),
                    paginatedResponse.isHasPrevious(),
                    paginatedResponse.isHasNext(),
                    pojos
            );

            return ResponseHelper.createPaginatedResponse(pojoPaginatedResponse.getItems(),
                    pojoPaginatedResponse.getCurrentPage(), pojoPaginatedResponse.getTotalItems(),
                    pojoPaginatedResponse.getPageSize());

        } catch (IllegalArgumentException e) {
            return ResponseHelper.createValidationErrorResponse(e);
        } catch (ConstraintViolationException e) {
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<RiskPojo> findById(String id) {
        try {
            Session session = riskRepository.getEntityManager().unwrap(Session.class);
            enableActiveFilter(session);
            Risk risk = riskRepository.findById(id);

            if (risk != null) {
                RiskPojo pojo = riskMapper.toPojo(risk);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding Risk by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    @Transactional
    public ResponseWrapper<RiskPojo> create(@Valid RiskDTO riskDTO) {
        try {
            // Find related entities
            Likelihood inherentLikelihood = likelihoodRepository.findById(riskDTO.getInherentRiskLikelihoodId());
            Impact inherentImpact = impactRepository.findById(riskDTO.getInherentRiskImpactId());
            Likelihood residualLikelihood = likelihoodRepository.findById(riskDTO.getResidualRiskLikelihoodId());
            Impact residualImpact = impactRepository.findById(riskDTO.getResidualRiskImpactId());
            
         // start checking if action plan required
            riskHelper.checkIfActionPlanRequired(residualLikelihood.getScore(), residualImpact.getScore(), riskDTO.getRiskActionPlans());

            // Create and persist InherentRisk and ResidualRisk entities
            InherentRisk inherentRisk = new InherentRisk();
            inherentRisk.setLikelihood(inherentLikelihood);
            inherentRisk.setImpact(inherentImpact);
            riskRepository.getEntityManager().persist(inherentRisk);

            ResidualRisk residualRisk = new ResidualRisk();
            residualRisk.setLikelihood(residualLikelihood);
            residualRisk.setImpact(residualImpact);
            riskRepository.getEntityManager().persist(residualRisk);

            // Map DTO to entity and set InherentRisk and ResidualRisk
            Risk entity = riskMapper.toEntity(riskDTO);
            entity.setInherentRisk(inherentRisk);
            entity.setResidualRisk(residualRisk);

            // Use RiskHelper to create and persist RiskAssessmentFlow and RiskAssessmentStatus
            RiskAssessmentStatus riskAssessmentStatus = riskHelper.createRiskAssessmentFlowAndStatus(entity);
            entity.setRiskAssessmentStatus(riskAssessmentStatus);
            riskRepository.getEntityManager().merge(entity);

            // Save and merge risk indicators
            if (riskDTO.getRiskIndicators() != null) {
                saveOrUpdateRiskIndicators(entity, riskDTO.getRiskIndicators());
            }

            // Save and merge risk controls
            if (riskDTO.getRiskControls() != null) {
                saveOrUpdateRiskControls(entity, riskDTO.getRiskControls());
            }

            // Handle risk action plans after persisting the main Risk entity
            if (riskDTO.getRiskActionPlans() != null) {
                saveOrUpdateRiskActionPlans(entity, riskDTO.getRiskActionPlans());
            }

            RiskPojo resultPojo = riskMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating Risk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<RiskPojo> update(String id, @Valid RiskDTO riskDTO) {
        try {
            Risk entity = riskRepository.findById(id);
            if (entity != null) {
                // Fetch the related department entity
                Department department = departmentRepository.findById(riskDTO.getDepartmentId());
                if (department == null) {
                    throw new IllegalArgumentException("Invalid department ID: " + riskDTO.getDepartmentId());
                }

                entity.setDepartment(department);

                // Update other fields as usual
                Likelihood inherentLikelihood = likelihoodRepository.findById(riskDTO.getInherentRiskLikelihoodId());
                Impact inherentImpact = impactRepository.findById(riskDTO.getInherentRiskImpactId());
                InherentRisk inherentRisk = new InherentRisk();
                inherentRisk.setLikelihood(inherentLikelihood);
                inherentRisk.setImpact(inherentImpact);

                Likelihood residualLikelihood = likelihoodRepository.findById(riskDTO.getResidualRiskLikelihoodId());
                Impact residualImpact = impactRepository.findById(riskDTO.getResidualRiskImpactId());
                ResidualRisk residualRisk = new ResidualRisk();
                residualRisk.setLikelihood(residualLikelihood);
                residualRisk.setImpact(residualImpact);
                
                
             // start checking if action plan required
                riskHelper.checkIfActionPlanRequired(residualLikelihood.getScore(), residualImpact.getScore(), riskDTO.getRiskActionPlans());

                riskRepository.getEntityManager().persist(inherentRisk);
                riskRepository.getEntityManager().persist(residualRisk);
                
                

                entity.setInherentRisk(inherentRisk);
                entity.setResidualRisk(residualRisk);

                riskMapper.updateEntityFromDTO(riskDTO, entity);

                // Clear existing risk indicators and risk controls
                entity.getRiskIndicators().clear();
                entity.getRiskControls().clear();

                riskRepository.persist(entity);

                // Save and merge risk indicators
                if (riskDTO.getRiskIndicators() != null) {
                    saveOrUpdateRiskIndicators(entity, riskDTO.getRiskIndicators());
                }

                // Save and merge risk controls
                if (riskDTO.getRiskControls() != null) {
                    saveOrUpdateRiskControls(entity, riskDTO.getRiskControls());
                }

                // Save or update risk action plans
                if (riskDTO.getRiskActionPlans() != null) {
                    saveOrUpdateRiskActionPlans(entity, riskDTO.getRiskActionPlans());
                }

                RiskPojo resultPojo = riskMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating Risk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }


    @Transactional
    void saveOrUpdateRiskIndicators(Risk entity, List<RiskIndicatorDTO> riskIndicatorDTOs) {
        // Fetch the existing indicators from the repository by risk ID
        List<RiskIndicator> existingIndicatorsList = riskIndicatorRepository.find("risk.id", entity.getId()).list();
        Map<String, RiskIndicator> existingIndicators = existingIndicatorsList.stream()
                .collect(Collectors.toMap(RiskIndicator::getId, ri -> ri));

        for (RiskIndicatorDTO dto : riskIndicatorDTOs) {
            RiskIndicator indicator;
            if (dto.getId() != null && existingIndicators.containsKey(dto.getId())) {
                // Update existing indicator
                indicator = existingIndicators.remove(dto.getId());
                riskIndicatorMapper.updateEntityFromDTO(dto, indicator);
                // Merge the updated entity to ensure it's attached to the persistence context
                indicator = riskIndicatorRepository.getEntityManager().merge(indicator);
            } else {
                // Add new indicator
                indicator = riskIndicatorMapper.toEntity(dto);
                indicator.setRisk(entity);
                // Persist the new entity to ensure it's attached to the persistence context
                riskIndicatorRepository.persist(indicator);
                entity.getRiskIndicators().add(indicator);
            }

            // Save or update risk indicator thresholds
            saveOrUpdateRiskIndicatorThresholds(indicator, dto);
        }

        // Set status to DELETED for indicators that are not present in the update DTO
        for (RiskIndicator indicator : existingIndicators.values()) {
            indicator.setStatus(RecordStatus.DELETED);
            riskIndicatorRepository.getEntityManager().merge(indicator);
        }
    }
    
    @Transactional
    void saveOrUpdateRiskIndicatorThresholds(RiskIndicator riskIndicator, RiskIndicatorDTO riskIndicatorDTO) {
        List<RiskIndicatorThreshold> existingThresholdsList = riskIndicator.getRiskIndicatorThresholds();
        Map<String, RiskIndicatorThreshold> existingThresholds = existingThresholdsList.stream()
                .filter(t -> t.getId() != null)
                .collect(Collectors.toMap(RiskIndicatorThreshold::getId, t -> t));

        for (RiskIndicatorThresholdDTO dto : riskIndicatorDTO.getRiskIndicatorThresholds()) {
            RiskIndicatorThreshold threshold;
            if (dto.getId() != null && existingThresholds.containsKey(dto.getId())) {
                threshold = existingThresholds.remove(dto.getId());
                riskIndicatorThresholdMapper.updateEntityFromDTO(dto, threshold);
                threshold = riskIndicatorThresholdRepository.getEntityManager().merge(threshold);
            } else {
                threshold = riskIndicatorThresholdMapper.toEntity(dto);
                threshold.setRiskIndicator(riskIndicator);
                riskIndicatorThresholdRepository.persist(threshold);
                riskIndicator.getRiskIndicatorThresholds().add(threshold);
            }

            // Validate bounds by passing riskIndicatorDTO and thresholdDTOs
            riskBoundChecker.validateBounds(riskIndicatorDTO.getRiskIndicatorThresholds(), riskIndicatorDTO);

            saveOrUpdateRiskIndicatorComparisonConditions(threshold, dto.getComparisonConditions());
        }

        for (RiskIndicatorThreshold threshold : existingThresholds.values()) {
            threshold.setStatus(RecordStatus.DELETED);
            riskIndicatorThresholdRepository.getEntityManager().merge(threshold);
        }
    }
    

    
    
    @Transactional
    void saveOrUpdateRiskIndicatorComparisonConditions(RiskIndicatorThreshold threshold, List<ComparisonConditionDTO> conditionDTOs) {
        // Fetch the existing conditions from the threshold
        List<RiskIndicatorComparisonCondition> existingConditionsList = threshold.getComparisonConditions();
        Map<String, RiskIndicatorComparisonCondition> existingConditions = existingConditionsList.stream()
                .filter(c -> c.getId() != null)
                .collect(Collectors.toMap(RiskIndicatorComparisonCondition::getId, c -> c));

        for (ComparisonConditionDTO dto : conditionDTOs) {
            RiskIndicatorComparisonCondition condition;
            if (dto.getId() != null && existingConditions.containsKey(dto.getId())) {
                // Update existing condition
                condition = existingConditions.remove(dto.getId());
                riskIndicatorComparisonConditionMapper.updateEntityFromDTO(dto, condition);
                // Merge the updated entity to ensure it's attached to the persistence context
                condition = riskIndicatorComparisonConditionRepository.getEntityManager().merge(condition);
            } else {
                // Add new condition
                condition = riskIndicatorComparisonConditionMapper.toEntity(dto);
                condition.setRiskIndicatorThreshold(threshold);
                // Persist the new entity to ensure it's attached to the persistence context
                riskIndicatorComparisonConditionRepository.persist(condition);
                threshold.getComparisonConditions().add(condition);
            }
        }

        // Set status to DELETED for conditions that are not present in the update DTO
        for (RiskIndicatorComparisonCondition condition : existingConditions.values()) {
            condition.setStatus(RecordStatus.DELETED);
            riskIndicatorComparisonConditionRepository.getEntityManager().merge(condition);
        }
    }


    
    
    
    @Transactional
    void saveOrUpdateRiskControls(Risk entity, List<RiskControlDTO> riskControlDTOs) {
        // Fetch the existing controls from the repository by risk ID
        List<RiskControl> existingControlsList = riskControlRepository.find("risk.id", entity.getId()).list();
        Map<String, RiskControl> existingControls = existingControlsList.stream()
                .collect(Collectors.toMap(RiskControl::getId, rc -> rc));

        for (RiskControlDTO dto : riskControlDTOs) {
            RiskControl control;
            if (dto.getId() != null && existingControls.containsKey(dto.getId())) {
                // Update existing control
                control = existingControls.remove(dto.getId());
                riskControlMapper.updateEntityFromDTO(dto, control);
                control = riskControlRepository.getEntityManager().merge(control);
            } else {
                // Add new control
                control = riskControlMapper.toEntity(dto);
                control.setRisk(entity);
                control = riskControlRepository.getEntityManager().merge(control);
                riskControlRepository.persist(control);
                entity.getRiskControls().add(control);
            }

            // Save or update control indicators
            saveOrUpdateControlIndicators(control, dto.getControlIndicators());
        }

        // Set status to DELETED for controls that are not present in the update DTO
        for (RiskControl control : existingControls.values()) {
            control.setStatus(RecordStatus.DELETED);
            riskControlRepository.getEntityManager().merge(control);
        }
    }

    @Transactional
    void saveOrUpdateControlIndicators(RiskControl riskControl, List<ControlIndicatorDTO> controlIndicatorDTOs) {
        // Fetch the existing indicators from the repository by risk control ID
        List<ControlIndicator> existingIndicatorsList = controlIndicatorRepository.find("riskControl.id", riskControl.getId()).list();
        Map<String, ControlIndicator> existingIndicators = existingIndicatorsList.stream()
                .collect(Collectors.toMap(ControlIndicator::getId, ci -> ci));

        for (ControlIndicatorDTO dto : controlIndicatorDTOs) {
            ControlIndicator indicator;
            if (dto.getId() != null && existingIndicators.containsKey(dto.getId())) {
                // Update existing indicator
                indicator = existingIndicators.remove(dto.getId());
                controlIndicatorMapper.updateEntityFromDTO(dto, indicator);
                indicator = controlIndicatorRepository.getEntityManager().merge(indicator);
            } else {
                // Add new indicator
                indicator = controlIndicatorMapper.toEntity(dto);
                indicator.setRiskControl(riskControl);
                indicator = controlIndicatorRepository.getEntityManager().merge(indicator);
                controlIndicatorRepository.persist(indicator);
                riskControl.getControlIndicators().add(indicator);
            }

            // Save or update control indicator thresholds
            saveOrUpdateControlIndicatorThresholds(indicator, dto.getControlIndicatorThresholds());
        }

        // Set status to DELETED for indicators that are not present in the update DTO
        for (ControlIndicator indicator : existingIndicators.values()) {
            indicator.setStatus(RecordStatus.DELETED);
            controlIndicatorRepository.getEntityManager().merge(indicator);
        }
    }

    @Transactional
    void saveOrUpdateControlIndicatorThresholds(ControlIndicator controlIndicator, List<ControlIndicatorThresholdDTO> thresholdDTOs) {
        // Fetch the existing thresholds from the control indicator
        List<ControlIndicatorThreshold> existingThresholdsList = controlIndicator.getControlIndicatorThresholds();
        Map<String, ControlIndicatorThreshold> existingThresholds = existingThresholdsList.stream()
                .filter(t -> t.getId() != null)
                .collect(Collectors.toMap(ControlIndicatorThreshold::getId, t -> t));

        for (ControlIndicatorThresholdDTO dto : thresholdDTOs) {
            ControlIndicatorThreshold threshold;
            if (dto.getId() != null && existingThresholds.containsKey(dto.getId())) {
                // Update existing threshold
                threshold = existingThresholds.remove(dto.getId());
                controlIndicatorThresholdMapper.updateEntityFromDTO(dto, threshold);
                // Merge the updated entity to ensure it's attached to the persistence context
                threshold = controlIndicatorThresholdRepository.getEntityManager().merge(threshold);
            } else {
                // Add new threshold
                threshold = controlIndicatorThresholdMapper.toEntity(dto);
                threshold.setControlIndicator(controlIndicator);
                // Persist the new entity to ensure it's attached to the persistence context
                controlIndicatorThresholdRepository.persist(threshold);
                controlIndicator.getControlIndicatorThresholds().add(threshold);
            }

            // Save or update comparison conditions
            saveOrUpdateControlIndicatorComparisonConditions(threshold, dto.getComparisonConditions());
        }

        // Set status to DELETED for thresholds that are not present in the update DTO
        for (ControlIndicatorThreshold threshold : existingThresholds.values()) {
            threshold.setStatus(RecordStatus.DELETED);
            controlIndicatorThresholdRepository.getEntityManager().merge(threshold);
        }
    }

    @Transactional
    void saveOrUpdateControlIndicatorComparisonConditions(ControlIndicatorThreshold threshold, List<ComparisonConditionDTO> conditionDTOs) {
        // Fetch the existing conditions from the threshold
        List<ControlIndicatorComparisonCondition> existingConditionsList = threshold.getComparisonConditions();
        Map<String, ControlIndicatorComparisonCondition> existingConditions = existingConditionsList.stream()
                .filter(c -> c.getId() != null)
                .collect(Collectors.toMap(ControlIndicatorComparisonCondition::getId, c -> c));

        for (ComparisonConditionDTO dto : conditionDTOs) {
            ControlIndicatorComparisonCondition condition;
            if (dto.getId() != null && existingConditions.containsKey(dto.getId())) {
                // Update existing condition
                condition = existingConditions.remove(dto.getId());
                controlIndicatorComparisonConditionMapper.updateEntityFromDTO(dto, condition);
                // Merge the updated entity to ensure it's attached to the persistence context
                condition = controlIndicatorComparisonConditionRepository.getEntityManager().merge(condition);
            } else {
                // Add new condition
                condition = controlIndicatorComparisonConditionMapper.toEntity(dto);
                condition.setControlIndicatorThreshold(threshold);
                // Persist the new entity to ensure it's attached to the persistence context
                controlIndicatorComparisonConditionRepository.persist(condition);
                threshold.getComparisonConditions().add(condition);
            }
        }

        // Set status to DELETED for conditions that are not present in the update DTO
        for (ControlIndicatorComparisonCondition condition : existingConditions.values()) {
            condition.setStatus(RecordStatus.DELETED);
            controlIndicatorComparisonConditionRepository.getEntityManager().merge(condition);
        }
    }
    

    
    @Transactional
    void saveOrUpdateRiskActionPlans(Risk entity, List<RiskActionPlanDTO> riskActionPlanDTOs) {
        // Fetch the existing action plans from the entity, filtering out any with null IDs
        List<RiskActionPlan> existingActionPlansList = entity.getRiskActionPlans().stream()
            .filter(rap -> rap.getId() != null)
            .collect(Collectors.toList());

        // Create a map from the existing action plans with non-null IDs
        Map<String, RiskActionPlan> existingActionPlans = existingActionPlansList.stream()
            .collect(Collectors.toMap(RiskActionPlan::getId, rap -> rap));

        for (RiskActionPlanDTO dto : riskActionPlanDTOs) {
            RiskActionPlan actionPlan;

            // Validate the RiskActionPlan DTO before proceeding
            validateRiskActionPlanDTO(dto);

            if (dto.getId() != null && existingActionPlans.containsKey(dto.getId())) {
                // Update existing action plan
                actionPlan = existingActionPlans.remove(dto.getId());
                riskActionPlanMapper.updateEntityFromDTO(dto, actionPlan);
                actionPlan = riskRepository.getEntityManager().merge(actionPlan);
            } else {
                // Add new action plan
                actionPlan = riskActionPlanMapper.toEntity(dto);
                actionPlan.setRisk(entity);
                riskRepository.getEntityManager().persist(actionPlan);
                entity.getRiskActionPlans().add(actionPlan);
            }

            // Save or update the monitoring data related to the action plan
            saveOrUpdateRiskActionPlanMonitoring(actionPlan, dto.getRiskActionPlanMonitoring());
        }

        // Set status to DELETED for action plans that are not present in the update DTO
        for (RiskActionPlan actionPlan : existingActionPlans.values()) {
            actionPlan.setStatus(RecordStatus.DELETED);
            riskRepository.getEntityManager().merge(actionPlan);
        }
    }

    // Helper method to validate RiskActionPlanDTO
    void validateRiskActionPlanDTO(RiskActionPlanDTO dto) {
        if (dto.getName() == null || dto.getName().length() < 20 || dto.getName().length() > 255) {
            throw new IllegalArgumentException("RiskActionPlan name must be between 20 and 255 characters long");
        }
        if (dto.getDescription() == null || dto.getDescription().length() < 100 || dto.getDescription().length() > 5000) {
            throw new IllegalArgumentException("RiskActionPlan description must be between 100 and 5000 characters long");
        }
    }



//    private void validateRiskActionPlan(RiskActionPlan actionPlan) {
//        if (actionPlan.getName() == null || actionPlan.getName().isBlank()) {
//            throw new IllegalArgumentException("RiskActionPlan name cannot be null or blank");
//        }
//        if (actionPlan.getDescription() == null || actionPlan.getDescription().isBlank()) {
//            throw new IllegalArgumentException("RiskActionPlan description cannot be null or blank");
//        }
//        if (actionPlan.getStartDatetime() == null) {
//            throw new IllegalArgumentException("RiskActionPlan startDatetime cannot be null");
//        }
//        if (actionPlan.getEndDatetime() == null) {
//            throw new IllegalArgumentException("RiskActionPlan endDatetime cannot be null");
//        }
//    }


    @Transactional
    void saveOrUpdateRiskActionPlanMonitoring(RiskActionPlan actionPlan, List<RiskActionPlanMonitoringDTO> monitoringDTOs) {
        if (monitoringDTOs == null || monitoringDTOs.isEmpty()) {
            log.warn("No monitoring data provided for RiskActionPlan with ID: " + actionPlan.getId());
            return;  // Early return if monitoringDTOs is null or empty
        }

        // Fetch the existing monitoring data from the action plan
        List<RiskActionPlanMonitoring> existingMonitoringList = actionPlan.getRiskActionPlanMonitoring();
        Map<String, RiskActionPlanMonitoring> existingMonitoring = existingMonitoringList.stream()
                .filter(m -> m.getId() != null)
                .collect(Collectors.toMap(RiskActionPlanMonitoring::getId, m -> m));

        for (RiskActionPlanMonitoringDTO dto : monitoringDTOs) {
            RiskActionPlanMonitoring monitoring;
            if (dto.getId() != null && existingMonitoring.containsKey(dto.getId())) {
                // Update existing monitoring
                monitoring = existingMonitoring.remove(dto.getId());
                riskActionPlanMonitoringMapper.updateEntityFromDTO(dto, monitoring);
                // Merge the updated entity to ensure it's attached to the persistence context
                monitoring = riskRepository.getEntityManager().merge(monitoring);
            } else {
                // Add new monitoring
                monitoring = riskActionPlanMonitoringMapper.toEntity(dto);
                monitoring.setRiskActionPlan(actionPlan);
                // Merge instead of persist
                monitoring = riskRepository.getEntityManager().merge(monitoring);
                actionPlan.getRiskActionPlanMonitoring().add(monitoring);
            }
        }

        // Set status to DELETED for monitoring data that is not present in the update DTO
        for (RiskActionPlanMonitoring monitoring : existingMonitoring.values()) {
            monitoring.setStatus(RecordStatus.DELETED);
            riskRepository.getEntityManager().merge(monitoring);
        }
    }



    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            Risk entity = riskRepository.findById(id);
            if (entity != null) {
                riskRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting Risk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskPojo>> listAll() {
        try {
            List<Risk> entities = riskRepository.listAll();
            List<RiskPojo> pojos = entities.stream()
                    .map(riskMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all Risks", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskPojo>> listAllByBusinessProcess(String businessProcessId) {
        try {
            List<Risk> entities = riskRepository.find("businessProcess.id", businessProcessId).list();
            List<RiskPojo> pojos = entities.stream()
                    .map(riskMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing Risks by BusinessProcess", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
    


    @Transactional
    public ResponseWrapper<RiskPojo> submitForAssessment(String id) {
        try {
            log.info("Submitting Risk for assessment with ID: " + id);

            // Fetch the Risk entity
            Risk entity = riskRepository.findById(id);
            if (entity == null) {
                log.error("Risk entity not found for ID: " + id);
                return ResponseHelper.createNotFoundResponse();
            }

            log.info("Risk entity found: " + entity);

            // Update the risk status using the RiskHelper
            RiskStatus submittedForReviewStatus = riskStatusRepository.find("code", "SUBMITTED_FOR_REVIEW").firstResult();
            if (submittedForReviewStatus == null) {
                log.error("RiskStatus with code SUBMITTED_FOR_REVIEW not found");
                throw new Exception("RiskStatus not found");
            }

            riskHelper.updateRiskStatus(entity, submittedForReviewStatus.getId(), "Submitted for assessment", true);
            log.info("Risk status updated successfully");

            // Map the updated Risk entity to RiskPojo
            RiskPojo pojo = riskMapper.toPojo(entity);
            log.info("Risk entity mapped to RiskPojo: " + pojo);

            return ResponseHelper.createSuccessResponse(pojo);
        } catch (Exception e) {
            log.error("Error during submitting Risk for assessment", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    
    
    @Transactional
    public ResponseWrapper<RiskPojo> DepartmentOwnerReviewRisk(String id, RiskAssessmentHistoryDTO riskAssessmentHistoryDTO) {
        try {
            // Fetch the Risk entity
            Risk entity = riskRepository.findById(id);
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }

            // Update the risk status using the RiskHelper
            riskHelper.updateRiskStatus(entity, riskAssessmentHistoryDTO.getRiskStatusId(), riskAssessmentHistoryDTO.getComment(), true);

            // Map the updated Risk entity to RiskPojo
            RiskPojo pojo = riskMapper.toPojo(entity);

            return ResponseHelper.createSuccessResponse(pojo);
        } catch (Exception e) {
            log.error("Error during Department Owner review of Risk", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
    @Transactional
    public ResponseWrapper<List<RiskWithActionPlansPojo>> allRiskReadyForRiskActionPlanMonitoring() {
        try {
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime oneMonthFromNow = now.plus(1, ChronoUnit.MONTHS);

            // Get the EntityManager to create a query
            EntityManager em = riskRepository.getEntityManager();

            // Create and execute the query
            Query query = em.createQuery(
                "SELECT r, rap FROM Risk r JOIN r.riskActionPlans rap " +
                "WHERE rap.endDatetime < :oneMonthFromNow " +
                "AND rap.endDatetime > :now " +
                "AND rap.riskActionPlanMonitoring IS EMPTY"
            );
            query.setParameter("oneMonthFromNow", oneMonthFromNow);
            query.setParameter("now", now);

            // Execute the query and get the result list
            @SuppressWarnings("unchecked")
            List<Object[]> results = query.getResultList();

            // Initialize a map to group action plans by risk
            Map<Risk, List<SimplifiedRiskActionPlanPojo>> groupedResults = new HashMap<>();

            for (Object[] result : results) {
                Risk risk = (Risk) result[0];
                RiskActionPlan rap = (RiskActionPlan) result[1];

                // Convert RiskActionPlan to SimplifiedRiskActionPlanPojo
                SimplifiedRiskActionPlanPojo simplifiedRap = simplifiedRiskActionPlanMapper.toPojo(rap);

                // Group by risk
                groupedResults
                    .computeIfAbsent(risk, k -> new ArrayList<>())
                    .add(simplifiedRap);
            }

            // Map grouped results to RiskWithActionPlansPojo
            List<RiskWithActionPlansPojo> response = groupedResults.entrySet().stream()
                .map(entry -> new RiskWithActionPlansPojo(
                    simplifiedListRiskMapper.toPojo(entry.getKey()), // Convert Risk to SimplifiedListRiskPojo
                    entry.getValue() // List of SimplifiedRiskActionPlanPojo
                ))
                .collect(Collectors.toList());

            return ResponseHelper.createSuccessResponse(response);

        } catch (Exception e) {
            log.error("Error fetching risks ready for RiskActionPlanMonitoring", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }







   
    @Transactional
    public ResponseWrapper<Void> riskActionPlanMonitoringReporting(List<RiskActionPlanMonitoringDTO> monitoringData) {
        try {
            for (RiskActionPlanMonitoringDTO dto : monitoringData) {
                // Assuming the ID is of type String, no need to convert it
                RiskActionPlan riskActionPlan = riskActionPlanRepository.findById(dto.getRiskActionPlanId());
                if (riskActionPlan == null) {
                    // Return a generic not found response
                    return ResponseHelper.createNotFoundResponse();
                }

                RiskActionPlanMonitoring monitoring = riskActionPlanMonitoringMapper.toEntity(dto);
                monitoring.setRiskActionPlan(riskActionPlan);
                riskActionPlan.getRiskActionPlanMonitoring().add(monitoring);
                riskActionPlanRepository.getEntityManager().persist(monitoring);
            }

            return ResponseHelper.createSuccessResponse(null);
        } catch (Exception e) {
            log.error("Error during risk action plan monitoring reporting", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }









}

