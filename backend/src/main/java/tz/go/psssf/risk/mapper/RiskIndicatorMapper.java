package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.RiskIndicatorDTO;
import tz.go.psssf.risk.entity.*;
import tz.go.psssf.risk.pojo.RiskIndicatorPojo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "jakarta", uses = {
    SimplifiedRiskMapper.class,
    MonitoringFrequencyMapper.class,
    MeasurementMapper.class,
    RiskIndicatorThresholdMapper.class,
    ThresholdCategoryMapper.class,
    RiskIndicatorComparisonConditionMapper.class,
    ComparisonOperatorMapper.class,
    RiskIndicatorActionPlanMapper.class,
    RiskIndicatorActionPlanMonitoringMapper.class  // Added the Monitoring Mapper
})
public interface RiskIndicatorMapper {

    @Mapping(source = "riskId", target = "risk.id")
    @Mapping(source = "monitoringFrequencyId", target = "monitoringFrequency.id")
    @Mapping(source = "measurementId", target = "measurement.id")
    @Mapping(target = "riskIndicatorThresholds", ignore = true) // Handled manually to ensure proper linking
    @Mapping(target = "riskIndicatorActionPlans", ignore = true) // Handled manually to ensure proper linking
    RiskIndicator toEntity(RiskIndicatorDTO riskIndicatorDTO);

    @AfterMapping
    default void linkRiskIndicatorThresholdsAndActionPlans(@MappingTarget RiskIndicator riskIndicator, RiskIndicatorDTO riskIndicatorDTO) {
        // Link Risk Indicator Thresholds
        if (riskIndicatorDTO.getRiskIndicatorThresholds() != null) {
            List<RiskIndicatorThreshold> riskIndicatorThresholds = riskIndicatorDTO.getRiskIndicatorThresholds().stream()
                .map(thresholdDTO -> {
                    RiskIndicatorThreshold riskIndicatorThreshold = new RiskIndicatorThreshold();
                    riskIndicatorThreshold.setThresholdCategory(new ThresholdCategory());
                    riskIndicatorThreshold.getThresholdCategory().setId(thresholdDTO.getThresholdCategoryId());

                    riskIndicatorThreshold.setComparisonConditions(thresholdDTO.getComparisonConditions().stream()
                        .map(condDTO -> {
                            RiskIndicatorComparisonCondition condition = new RiskIndicatorComparisonCondition();
                            condition.setComparisonOperator(new ComparisonOperator());
                            condition.getComparisonOperator().setId(condDTO.getComparisonOperatorId());
                            condition.setBound(condDTO.getBound());
                            condition.setRiskIndicatorThreshold(riskIndicatorThreshold);
                            return condition;
                        }).collect(Collectors.toList()));

                    riskIndicatorThreshold.setRiskIndicator(riskIndicator);
                    return riskIndicatorThreshold;
                }).collect(Collectors.toList());

            riskIndicator.setRiskIndicatorThresholds(riskIndicatorThresholds);
        }

        // Link Risk Indicator Action Plans
        if (riskIndicatorDTO.getRiskIndicatorActionPlans() != null) {
            List<RiskIndicatorActionPlan> riskIndicatorActionPlans = riskIndicatorDTO.getRiskIndicatorActionPlans().stream()
                .map(planDTO -> {
                    RiskIndicatorActionPlan actionPlan = new RiskIndicatorActionPlan();
                    actionPlan.setName(planDTO.getName());
                    actionPlan.setDescription(planDTO.getDescription());
                    actionPlan.setStartDatetime(LocalDateTime.parse(planDTO.getStartDatetime()));
                    actionPlan.setEndDatetime(LocalDateTime.parse(planDTO.getEndDatetime()));

                    Department department = new Department();
                    department.setId(planDTO.getDepartmentId());
                    actionPlan.setDepartment(department);

                    // Set the risk indicator action plan monitoring values
                    if (planDTO.getRiskIndicatorActionPlanMonitoring() != null) {
                        List<RiskIndicatorActionPlanMonitoring> monitoringList = planDTO.getRiskIndicatorActionPlanMonitoring().stream()
                            .map(monitoringDTO -> {
                                RiskIndicatorActionPlanMonitoring monitoring = new RiskIndicatorActionPlanMonitoring();
                                monitoring.setStartDatetime(LocalDateTime.parse(monitoringDTO.getStartDatetime()));
                                monitoring.setEndDatetime(LocalDateTime.parse(monitoringDTO.getEndDatetime()));
                                monitoring.setValue(monitoringDTO.getValue());

                                Measurement measurement = new Measurement();
                                measurement.setId(monitoringDTO.getMeasurementId());
                                monitoring.setMeasurement(measurement);

                                monitoring.setRiskIndicatorActionPlan(actionPlan);
                                return monitoring;
                            }).collect(Collectors.toList());
                        actionPlan.setRiskIndicatorActionPlanMonitoring(monitoringList);
                    }

                    actionPlan.setRiskIndicator(riskIndicator);
                    return actionPlan;
                }).collect(Collectors.toList());

            riskIndicator.setRiskIndicatorActionPlans(riskIndicatorActionPlans);
        }
    }

    @Mapping(source = "risk.id", target = "riskId")
    @Mapping(source = "monitoringFrequency.id", target = "monitoringFrequencyId")
    @Mapping(source = "measurement.id", target = "measurementId")
    RiskIndicatorDTO toDTO(RiskIndicator riskIndicator);

    void updateEntityFromDTO(RiskIndicatorDTO dto, @MappingTarget RiskIndicator entity);

    @Mapping(source = "risk", target = "risk")
    @Mapping(source = "monitoringFrequency.id", target = "monitoringFrequency.id")
    @Mapping(source = "measurement.id", target = "measurement.id")
    RiskIndicatorPojo toPojo(RiskIndicator entity);

    @Mapping(source = "risk", target = "risk")
    @Mapping(source = "monitoringFrequency.id", target = "monitoringFrequency.id")
    @Mapping(source = "measurement.id", target = "measurement.id")
    RiskIndicator toEntity(RiskIndicatorPojo pojo);

    void updateEntityFromPojo(RiskIndicatorPojo pojo, @MappingTarget RiskIndicator entity);
}
