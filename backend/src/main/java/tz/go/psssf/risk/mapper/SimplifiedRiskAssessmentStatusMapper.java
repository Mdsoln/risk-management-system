package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.entity.RiskAssessmentStatus;
import tz.go.psssf.risk.pojo.SimplifiedRiskAssessmentStatusPojo;

@Mapper(componentModel = "jakarta", uses = {
    SimplifiedRiskStatusMapper.class,
    SimplifiedRiskAssessmentFlowMapper.class
})
public interface SimplifiedRiskAssessmentStatusMapper {

    SimplifiedRiskAssessmentStatusMapper INSTANCE = Mappers.getMapper(SimplifiedRiskAssessmentStatusMapper.class);

//    @Mapping(target = "riskStatus.id", source = "riskStatus.id")
//    @Mapping(target = "riskAssessmentFlow.id", source = "riskAssessmentFlow.id")
//    SimplifiedRiskAssessmentStatusPojo toSimplifiedPojo(RiskAssessmentStatus status);

//    @Mapping(target = "riskStatus.id", source = "riskStatus.id")
//    @Mapping(target = "riskAssessmentFlow.id", source = "riskAssessmentFlow.id")
//    RiskAssessmentStatus toEntity(SimplifiedRiskAssessmentStatusPojo pojo);
}
