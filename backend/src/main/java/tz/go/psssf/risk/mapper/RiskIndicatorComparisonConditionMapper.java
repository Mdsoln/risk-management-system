package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.dto.ComparisonConditionDTO;
import tz.go.psssf.risk.entity.RiskIndicatorComparisonCondition;
import tz.go.psssf.risk.pojo.ComparisonConditionPojo;

@Mapper(componentModel = "cdi", uses = {ComparisonOperatorMapper.class})
public interface RiskIndicatorComparisonConditionMapper {
    RiskIndicatorComparisonConditionMapper INSTANCE = Mappers.getMapper(RiskIndicatorComparisonConditionMapper.class);

    @Mapping(source = "comparisonOperator.id", target = "comparisonOperatorId")
    ComparisonConditionDTO toDTO(RiskIndicatorComparisonCondition condition);

    @Mapping(source = "comparisonOperatorId", target = "comparisonOperator.id")
    RiskIndicatorComparisonCondition toEntity(ComparisonConditionDTO conditionDTO);

    void updateEntityFromDTO(ComparisonConditionDTO dto, @MappingTarget RiskIndicatorComparisonCondition entity);

    @Mapping(source = "comparisonOperator.id", target = "comparisonOperator.id")
    ComparisonConditionPojo toPojo(RiskIndicatorComparisonCondition entity);

    @Mapping(source = "comparisonOperator.id", target = "comparisonOperator.id")
    RiskIndicatorComparisonCondition toEntity(ComparisonConditionPojo pojo);

    void updateEntityFromPojo(ComparisonConditionPojo pojo, @MappingTarget RiskIndicatorComparisonCondition entity);
}
