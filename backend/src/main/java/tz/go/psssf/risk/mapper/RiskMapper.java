package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import jakarta.inject.Inject;
import tz.go.psssf.risk.dto.RiskDTO;
import tz.go.psssf.risk.entity.*;
import tz.go.psssf.risk.pojo.RiskPojo;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "jakarta", uses = {
    RiskAreaMapper.class,
    BusinessProcessMapper.class,
    InherentRiskMapper.class,
    ResidualRiskMapper.class,
    RiskIndicatorMapper.class,
    RiskControlMapper.class,
    RiskActionPlanMapper.class,
    MeasurementMapper.class // Ensure MeasurementMapper is included
})
public abstract class RiskMapper {

    @Inject
    RiskIndicatorMapper riskIndicatorMapper;

    @Inject
    RiskControlMapper riskControlMapper;

    @Inject
    RiskActionPlanMapper riskActionPlanMapper;

    @Inject
    MeasurementMapper measurementMapper;

    @Inject
    ControlIndicatorMapper controlIndicatorMapper;

    @Mapping(target = "riskAreaId", source = "riskArea.id")
    @Mapping(target = "departmentId", source = "department.id")
    @Mapping(target = "businessProcessId", source = "businessProcess.id")
    @Mapping(target = "inherentRiskLikelihoodId", source = "inherentRisk.likelihood.id")
    @Mapping(target = "residualRiskLikelihoodId", source = "residualRisk.likelihood.id")
    @Mapping(target = "inherentRiskImpactId", source = "inherentRisk.impact.id")
    @Mapping(target = "residualRiskImpactId", source = "residualRisk.impact.id")
    public abstract RiskDTO toDTO(Risk risk);

    @Mapping(target = "riskArea.id", source = "riskAreaId")
    @Mapping(target = "department.id", source = "departmentId")
    @Mapping(target = "businessProcess.id", source = "businessProcessId")
    @Mapping(target = "inherentRisk.likelihood.id", source = "inherentRiskLikelihoodId")
    @Mapping(target = "residualRisk.likelihood.id", source = "residualRiskLikelihoodId")
    @Mapping(target = "inherentRisk.impact.id", source = "inherentRiskImpactId")
    @Mapping(target = "residualRisk.impact.id", source = "residualRiskImpactId")
    public abstract Risk toEntity(RiskDTO riskDTO);

    @Mapping(target = "department.id", source = "departmentId")
    public abstract void updateEntityFromDTO(RiskDTO dto, @MappingTarget Risk entity);

    @AfterMapping
    protected void linkRiskIndicators(@MappingTarget Risk entity, RiskDTO riskDTO) {
        if (riskDTO.getRiskIndicators() != null) {
            List<RiskIndicator> riskIndicators = riskDTO.getRiskIndicators().stream()
                .map(riskIndicatorDTO -> {
                    RiskIndicator riskIndicator = riskIndicatorMapper.toEntity(riskIndicatorDTO);
                    riskIndicator.setRisk(entity);

                    // Link Measurement
                    if (riskIndicatorDTO.getMeasurementId() != null) {
                        Measurement measurement = new Measurement();
                        measurement.setId(riskIndicatorDTO.getMeasurementId());
                        riskIndicator.setMeasurement(measurement);  // Ensure Measurement is set
                    }

                    // Link Risk Indicator Thresholds
                    if (riskIndicatorDTO.getRiskIndicatorThresholds() != null) {
                        List<RiskIndicatorThreshold> riskIndicatorThresholds = riskIndicatorDTO.getRiskIndicatorThresholds().stream()
                            .map(thresholdDTO -> {
                                RiskIndicatorThreshold threshold = new RiskIndicatorThreshold();
                                threshold.setThresholdCategory(new ThresholdCategory(thresholdDTO.getThresholdCategoryId()));
                                threshold.setRiskIndicator(riskIndicator);

                                if (thresholdDTO.getComparisonConditions() != null) {
                                    List<RiskIndicatorComparisonCondition> comparisonConditions = thresholdDTO.getComparisonConditions().stream()
                                        .map(condDTO -> {
                                            RiskIndicatorComparisonCondition condition = new RiskIndicatorComparisonCondition();
                                            condition.setComparisonOperator(new ComparisonOperator(condDTO.getComparisonOperatorId()));
                                            condition.setBound(condDTO.getBound());
                                            condition.setRiskIndicatorThreshold(threshold);
                                            return condition;
                                        })
                                        .collect(Collectors.toList());
                                    threshold.setComparisonConditions(comparisonConditions);
                                }

                                return threshold;
                            })
                            .collect(Collectors.toList());
                        riskIndicator.setRiskIndicatorThresholds(riskIndicatorThresholds);
                    }

                    return riskIndicator;
                })
                .collect(Collectors.toList());
            entity.setRiskIndicators(riskIndicators);
        }
    }

    @AfterMapping
    protected void linkRiskControls(@MappingTarget Risk entity, RiskDTO riskDTO) {
        if (riskDTO.getRiskControls() != null) {
            List<RiskControl> riskControls = riskDTO.getRiskControls().stream()
                .map(riskControlDTO -> {
                    RiskControl riskControl = riskControlMapper.toEntity(riskControlDTO);
                    riskControl.setRisk(entity);

                    // Link Control Indicators
                    if (riskControlDTO.getControlIndicators() != null) {
                        List<ControlIndicator> controlIndicators = riskControlDTO.getControlIndicators().stream()
                            .map(controlIndicatorDTO -> {
                                ControlIndicator controlIndicator = controlIndicatorMapper.toEntity(controlIndicatorDTO);
                                controlIndicator.setRiskControl(riskControl);

                                // Link Control Indicator Thresholds
                                if (controlIndicatorDTO.getControlIndicatorThresholds() != null) {
                                    List<ControlIndicatorThreshold> controlIndicatorThresholds = controlIndicatorDTO.getControlIndicatorThresholds().stream()
                                        .map(thresholdDTO -> {
                                            ControlIndicatorThreshold threshold = new ControlIndicatorThreshold();
                                            threshold.setThresholdCategory(new ThresholdCategory(thresholdDTO.getThresholdCategoryId()));
                                            threshold.setControlIndicator(controlIndicator);

                                            if (thresholdDTO.getComparisonConditions() != null) {
                                                List<ControlIndicatorComparisonCondition> comparisonConditions = thresholdDTO.getComparisonConditions().stream()
                                                    .map(condDTO -> {
                                                        ControlIndicatorComparisonCondition condition = new ControlIndicatorComparisonCondition();
                                                        condition.setComparisonOperator(new ComparisonOperator(condDTO.getComparisonOperatorId()));
                                                        condition.setBound(condDTO.getBound());
                                                        condition.setControlIndicatorThreshold(threshold);
                                                        return condition;
                                                    })
                                                    .collect(Collectors.toList());
                                                threshold.setComparisonConditions(comparisonConditions);
                                            }

                                            return threshold;
                                        })
                                        .collect(Collectors.toList());
                                    controlIndicator.setControlIndicatorThresholds(controlIndicatorThresholds);
                                }

                                return controlIndicator;
                            })
                            .collect(Collectors.toList());
                        riskControl.setControlIndicators(controlIndicators);
                    }

                    return riskControl;
                })
                .collect(Collectors.toList());
            entity.setRiskControls(riskControls);
        }
    }

    @AfterMapping
    protected void linkRiskActionPlans(@MappingTarget Risk entity, RiskDTO riskDTO) {
        if (riskDTO.getRiskActionPlans() != null) {
            List<RiskActionPlan> riskActionPlans = riskDTO.getRiskActionPlans().stream()
                .map(riskActionPlanDTO -> {
                    RiskActionPlan riskActionPlan = riskActionPlanMapper.toEntity(riskActionPlanDTO);
                    riskActionPlan.setRisk(entity);

                    if (riskActionPlanDTO.getRiskActionPlanMonitoring() != null) {
                        List<RiskActionPlanMonitoring> riskActionPlanMonitoringList = riskActionPlanDTO.getRiskActionPlanMonitoring().stream()
                            .map(monitoringDTO -> {
                                RiskActionPlanMonitoring monitoring = new RiskActionPlanMonitoring();
                                monitoring.setComment(monitoringDTO.getComment());
                                monitoring.setMonitoringDatetime(monitoringDTO.getMonitoringDatetime());
                                monitoring.setRiskActionPlan(riskActionPlan);
                                return monitoring;
                            })
                            .collect(Collectors.toList());
                        riskActionPlan.setRiskActionPlanMonitoring(riskActionPlanMonitoringList);
                    }

                    return riskActionPlan;
                })
                .collect(Collectors.toList());
            entity.setRiskActionPlans(riskActionPlans);
        }
    }

    public abstract RiskPojo toPojo(Risk entity);

    public abstract Risk toEntity(RiskPojo pojo);

    public abstract void updateEntityFromPojo(RiskPojo pojo, @MappingTarget Risk entity);
}
