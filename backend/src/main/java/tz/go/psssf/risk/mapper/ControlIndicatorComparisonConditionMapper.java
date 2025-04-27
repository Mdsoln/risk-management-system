package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.dto.ComparisonConditionDTO;
import tz.go.psssf.risk.entity.ControlIndicatorComparisonCondition;
import tz.go.psssf.risk.pojo.ComparisonConditionPojo;

@Mapper(componentModel = "cdi", uses = {ComparisonOperatorMapper.class})
public interface ControlIndicatorComparisonConditionMapper {
    ControlIndicatorComparisonConditionMapper INSTANCE = Mappers.getMapper(ControlIndicatorComparisonConditionMapper.class);

    @Mapping(source = "comparisonOperator.id", target = "comparisonOperatorId")
    ComparisonConditionDTO toDTO(ControlIndicatorComparisonCondition condition);

    @Mapping(source = "comparisonOperatorId", target = "comparisonOperator.id")
    ControlIndicatorComparisonCondition toEntity(ComparisonConditionDTO conditionDTO);

    void updateEntityFromDTO(ComparisonConditionDTO dto, @MappingTarget ControlIndicatorComparisonCondition entity);

    @Mapping(source = "comparisonOperator.id", target = "comparisonOperator.id")
    ComparisonConditionPojo toPojo(ControlIndicatorComparisonCondition entity);

    @Mapping(source = "comparisonOperator.id", target = "comparisonOperator.id")
    ControlIndicatorComparisonCondition toEntity(ComparisonConditionPojo pojo);

    void updateEntityFromPojo(ComparisonConditionPojo pojo, @MappingTarget ControlIndicatorComparisonCondition entity);
}
