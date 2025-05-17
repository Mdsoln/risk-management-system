package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.dto.RiskAssessmentStatusDTO;
import tz.go.psssf.risk.entity.RiskAssessmentStatus;
import tz.go.psssf.risk.pojo.SimplifiedRiskAssessmentStatusPojo;

@Mapper(componentModel = "jakarta", uses = {
    SimplifiedRiskStatusMapper.class,
    SimplifiedRiskAssessmentFlowMapper.class
})
public interface RiskAssessmentStatusMapper {

    @Named("toDTOUsingPrimaryMapper")
    @Mapping(target = "riskStatusId", source = "riskStatus.id")
    RiskAssessmentStatusDTO toDTO(RiskAssessmentStatus status);

    @Named("toEntityUsingPrimaryMapper")
    @Mapping(target = "riskStatus.id", source = "riskStatusId")
    RiskAssessmentStatus toEntity(RiskAssessmentStatusDTO statusDTO);

    @Named("updateEntityFromDTOUsingPrimaryMapper")
    void updateEntityFromDTO(RiskAssessmentStatusDTO dto, @MappingTarget RiskAssessmentStatus entity);

//    @Named("toSimplifiedPojoUsingPrimaryMapper")
//    @Mapping(target = "riskStatus.id", source = "riskStatus.id")
//    @Mapping(target = "riskAssessmentFlow.id", source = "riskAssessmentFlow.id")
//    SimplifiedRiskAssessmentStatusPojo toSimplifiedPojo(RiskAssessmentStatus status);
//
//    @Named("toEntityUsingSimplifiedPojo")
//    @Mapping(target = "riskStatus.id", source = "riskStatus.id")
//    @Mapping(target = "riskAssessmentFlow.id", source = "riskAssessmentFlow.id")
//    RiskAssessmentStatus toEntity(SimplifiedRiskAssessmentStatusPojo pojo);
}
