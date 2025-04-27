package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.RiskAssessmentLevelDTO;
import tz.go.psssf.risk.entity.RiskAssessmentLevel;
import tz.go.psssf.risk.pojo.RiskAssessmentLevelPojo;

@Mapper(componentModel = "cdi", uses = {SimplifiedRiskAssessmentFlowMapper.class})
public interface RiskAssessmentLevelMapper {

    RiskAssessmentLevelMapper INSTANCE = Mappers.getMapper(RiskAssessmentLevelMapper.class);

    @Mapping(target = "riskAssessmentFlowId", source = "riskAssessmentFlow.id")
    RiskAssessmentLevelDTO toDTO(RiskAssessmentLevel riskAssessmentLevel);

    @Mapping(target = "riskAssessmentFlow.id", source = "riskAssessmentFlowId")
    RiskAssessmentLevel toEntity(RiskAssessmentLevelDTO riskAssessmentLevelDTO);

    @Mapping(target = "riskAssessmentFlow", source = "riskAssessmentFlow")
    RiskAssessmentLevelPojo toPojo(RiskAssessmentLevel riskAssessmentLevel);

    RiskAssessmentLevel toEntity(RiskAssessmentLevelPojo riskAssessmentLevelPojo);

    void updateEntityFromDTO(RiskAssessmentLevelDTO riskAssessmentLevelDTO, @MappingTarget RiskAssessmentLevel riskAssessmentLevel);
}
