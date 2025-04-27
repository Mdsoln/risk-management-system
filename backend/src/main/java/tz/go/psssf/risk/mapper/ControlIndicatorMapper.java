package tz.go.psssf.risk.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.dto.ControlIndicatorDTO;
import tz.go.psssf.risk.entity.ComparisonOperator;
import tz.go.psssf.risk.entity.ControlIndicator;
import tz.go.psssf.risk.entity.ControlIndicatorComparisonCondition;
import tz.go.psssf.risk.entity.ControlIndicatorThreshold;
import tz.go.psssf.risk.entity.ThresholdCategory;
import tz.go.psssf.risk.pojo.ControlIndicatorPojo;

@Mapper(componentModel = "cdi", uses = {
    MonitoringFrequencyMapper.class,
    MeasurementMapper.class,
    ControlIndicatorThresholdMapper.class,
    ControlIndicatorComparisonConditionMapper.class,
    ThresholdCategoryMapper.class,
    ComparisonOperatorMapper.class
})
public interface ControlIndicatorMapper {
    ControlIndicatorMapper INSTANCE = Mappers.getMapper(ControlIndicatorMapper.class);

    @Mapping(target = "riskControlId", source = "riskControl.id")
    @Mapping(target = "monitoringFrequencyId", source = "monitoringFrequency.id")
    @Mapping(target = "measurementId", source = "measurement.id")
    ControlIndicatorDTO toDTO(ControlIndicator controlIndicator);

    @Mapping(target = "riskControl.id", source = "riskControlId")
    @Mapping(target = "monitoringFrequency.id", source = "monitoringFrequencyId")
    @Mapping(target = "measurement.id", source = "measurementId")
    @Mapping(target = "controlIndicatorThresholds", ignore = true) // Handled manually to ensure proper linking
    ControlIndicator toEntity(ControlIndicatorDTO controlIndicatorDTO);

    void updateEntityFromDTO(ControlIndicatorDTO dto, @MappingTarget ControlIndicator entity);

    ControlIndicatorPojo toPojo(ControlIndicator entity);

    ControlIndicator toEntity(ControlIndicatorPojo pojo);

    void updateEntityFromPojo(ControlIndicatorPojo pojo, @MappingTarget ControlIndicator entity);

    @AfterMapping
    default void linkControlIndicatorThresholds(@MappingTarget ControlIndicator controlIndicator, ControlIndicatorDTO controlIndicatorDTO) {
        if (controlIndicatorDTO.getControlIndicatorThresholds() != null) {
            if (controlIndicator.getControlIndicatorThresholds() == null) {
                controlIndicator.setControlIndicatorThresholds(new ArrayList<>());
            }

            List<ControlIndicatorThreshold> controlIndicatorThresholds = controlIndicatorDTO.getControlIndicatorThresholds().stream()
                .map(thresholdDTO -> {
                    ControlIndicatorThreshold controlIndicatorThreshold = new ControlIndicatorThreshold();
                    controlIndicatorThreshold.setThresholdCategory(new ThresholdCategory(thresholdDTO.getThresholdCategoryId()));
                    controlIndicatorThreshold.setComparisonConditions(thresholdDTO.getComparisonConditions().stream()
                        .map(condDTO -> {
                            ControlIndicatorComparisonCondition condition = new ControlIndicatorComparisonCondition();
                            condition.setComparisonOperator(new ComparisonOperator(condDTO.getComparisonOperatorId()));
                            condition.setBound(condDTO.getBound());
                            condition.setControlIndicatorThreshold(controlIndicatorThreshold);
                            return condition;
                        }).collect(Collectors.toList()));
                    controlIndicatorThreshold.setControlIndicator(controlIndicator);
                    return controlIndicatorThreshold;
                }).collect(Collectors.toList());
            controlIndicator.getControlIndicatorThresholds().addAll(controlIndicatorThresholds);
        }
    }
}
