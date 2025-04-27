package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.dto.RiskIndicatorThresholdDTO;
import tz.go.psssf.risk.entity.RiskIndicatorThreshold;
import tz.go.psssf.risk.pojo.RiskIndicatorThresholdPojo;

@Mapper(componentModel = "cdi", uses = {RiskIndicatorComparisonConditionMapper.class, ThresholdCategoryMapper.class})
public interface RiskIndicatorThresholdMapper {
    RiskIndicatorThresholdMapper INSTANCE = Mappers.getMapper(RiskIndicatorThresholdMapper.class);

    @Mapping(source = "thresholdCategory.id", target = "thresholdCategoryId")
    @Mapping(source = "comparisonConditions", target = "comparisonConditions")
    RiskIndicatorThresholdDTO toDTO(RiskIndicatorThreshold threshold);

    @Mapping(source = "thresholdCategoryId", target = "thresholdCategory.id")
    @Mapping(source = "comparisonConditions", target = "comparisonConditions")
    RiskIndicatorThreshold toEntity(RiskIndicatorThresholdDTO thresholdDTO);

    void updateEntityFromDTO(RiskIndicatorThresholdDTO dto, @MappingTarget RiskIndicatorThreshold entity);

    @Mapping(source = "comparisonConditions", target = "comparisonConditions")
    RiskIndicatorThresholdPojo toPojo(RiskIndicatorThreshold entity);

    @Mapping(source = "comparisonConditions", target = "comparisonConditions")
    RiskIndicatorThreshold toEntity(RiskIndicatorThresholdPojo pojo);

    void updateEntityFromPojo(RiskIndicatorThresholdPojo pojo, @MappingTarget RiskIndicatorThreshold entity);
}
