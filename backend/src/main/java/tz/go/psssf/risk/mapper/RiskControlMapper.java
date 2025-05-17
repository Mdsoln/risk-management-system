package tz.go.psssf.risk.mapper;

import org.mapstruct.*;

import jakarta.inject.Inject;
import tz.go.psssf.risk.dto.RiskControlDTO;
import tz.go.psssf.risk.entity.*;
import tz.go.psssf.risk.pojo.RiskControlPojo;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "jakarta", uses = {
//    DepartmentOwnerMapper.class,
    ControlIndicatorMapper.class
})
public abstract class RiskControlMapper {

    @Inject
    ControlIndicatorMapper controlIndicatorMapper;

    @Mapping(target = "riskId", source = "risk.id")
    @Mapping(target = "departmentId", source = "department.id")
    public abstract RiskControlDTO toDTO(RiskControl riskControl);

    @Mapping(target = "risk.id", source = "riskId")
    @Mapping(target = "department.id", source = "departmentId")
    public abstract RiskControl toEntity(RiskControlDTO riskControlDTO);

    public abstract void updateEntityFromDTO(RiskControlDTO dto, @MappingTarget RiskControl entity);

    public abstract RiskControlPojo toPojo(RiskControl entity);

    public abstract RiskControl toEntity(RiskControlPojo pojo);

    public abstract void updateEntityFromPojo(RiskControlPojo pojo, @MappingTarget RiskControl entity);

    @AfterMapping
    protected void linkControlIndicators(@MappingTarget RiskControl entity, RiskControlDTO riskControlDTO) {
        if (riskControlDTO.getControlIndicators() != null) {
            List<ControlIndicator> controlIndicators = riskControlDTO.getControlIndicators().stream()
                .map(controlIndicatorDTO -> {
                    ControlIndicator controlIndicator = controlIndicatorMapper.toEntity(controlIndicatorDTO);
                    controlIndicator.setRiskControl(entity);

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
            if (entity.getControlIndicators() == null) {
                entity.setControlIndicators(controlIndicators);
            } else {
                entity.getControlIndicators().addAll(controlIndicators);
            }
        }
    }
}
