//package tz.go.psssf.risk.mapper;
//
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//import org.mapstruct.MappingTarget;
//import org.mapstruct.factory.Mappers;
//
//import tz.go.psssf.risk.dto.ComparisonConditionDTO;
//import tz.go.psssf.risk.entity.ComparisonCondition;
//import tz.go.psssf.risk.pojo.ComparisonConditionPojo;
//
//@Mapper(componentModel = "jakarta", uses = {ComparisonOperatorMapper.class})
//public interface ComparisonConditionMapper {
//    ComparisonConditionMapper INSTANCE = Mappers.getMapper(ComparisonConditionMapper.class);
//
//    @Mapping(source = "comparisonOperator.id", target = "comparisonOperatorId")
//    ComparisonConditionDTO toDTO(ComparisonCondition comparisonCondition);
//
//    @Mapping(source = "comparisonOperatorId", target = "comparisonOperator.id")
//    ComparisonCondition toEntity(ComparisonConditionDTO comparisonConditionDTO);
//
//    void updateEntityFromDTO(ComparisonConditionDTO dto, @MappingTarget ComparisonCondition entity);
//
//    @Mapping(source = "comparisonOperator", target = "comparisonOperator")
//    ComparisonConditionPojo toPojo(ComparisonCondition entity);
//
//    @Mapping(source = "comparisonOperator.id", target = "comparisonOperator.id")
//    ComparisonCondition toEntity(ComparisonConditionPojo pojo);
//
//    void updateEntityFromPojo(ComparisonConditionPojo pojo, @MappingTarget ComparisonCondition entity);
//}
