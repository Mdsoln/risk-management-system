package tz.go.psssf.risk.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.dto.ControlIndicatorThresholdDTO;
import tz.go.psssf.risk.entity.ControlIndicatorComparisonCondition;
import tz.go.psssf.risk.entity.ControlIndicatorThreshold;
import tz.go.psssf.risk.pojo.ControlIndicatorThresholdPojo;

@Mapper(componentModel = "cdi", uses = {ControlIndicatorComparisonConditionMapper.class, ThresholdCategoryMapper.class})
public interface ControlIndicatorThresholdMapper {
    ControlIndicatorThresholdMapper INSTANCE = Mappers.getMapper(ControlIndicatorThresholdMapper.class);

    @Mapping(source = "thresholdCategory.id", target = "thresholdCategoryId")
    @Mapping(source = "comparisonConditions", target = "comparisonConditions")
    ControlIndicatorThresholdDTO toDTO(ControlIndicatorThreshold threshold);

    @Mapping(source = "thresholdCategoryId", target = "thresholdCategory.id")
    @Mapping(source = "comparisonConditions", target = "comparisonConditions")
    ControlIndicatorThreshold toEntity(ControlIndicatorThresholdDTO thresholdDTO);

    void updateEntityFromDTO(ControlIndicatorThresholdDTO dto, @MappingTarget ControlIndicatorThreshold entity);

    @Mapping(source = "comparisonConditions", target = "comparisonConditions")
    ControlIndicatorThresholdPojo toPojo(ControlIndicatorThreshold entity);

    @Mapping(source = "comparisonConditions", target = "comparisonConditions")
    ControlIndicatorThreshold toEntity(ControlIndicatorThresholdPojo pojo);

    void updateEntityFromPojo(ControlIndicatorThresholdPojo pojo, @MappingTarget ControlIndicatorThreshold entity);

    @AfterMapping
    default void linkComparisonConditions(@MappingTarget ControlIndicatorThreshold threshold, ControlIndicatorThresholdDTO thresholdDTO) {
        if (thresholdDTO.getComparisonConditions() != null) {
            List<ControlIndicatorComparisonCondition> comparisonConditions = thresholdDTO.getComparisonConditions().stream()
                .map(conditionDTO -> {
                    ControlIndicatorComparisonCondition condition = ControlIndicatorComparisonConditionMapper.INSTANCE.toEntity(conditionDTO);
                    condition.setControlIndicatorThreshold(threshold);
                    return condition;
                }).collect(Collectors.toList());
            threshold.setComparisonConditions(comparisonConditions);
        }
    }
}
