package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.RiskAssessmentHistoryDTO;
import tz.go.psssf.risk.entity.RiskAssessmentHistory;
import tz.go.psssf.risk.pojo.RiskAssessmentHistoryPojo;

@Mapper(componentModel = "cdi", uses = {
    RiskStatusMapper.class,
    RiskChampionMapper.class,
//    DepartmentOwnerMapper.class,
    RiskAssessmentFlowMapper.class,
    RiskAssessmentLevelMapper.class
})
public interface RiskAssessmentHistoryMapper {

    RiskAssessmentHistoryMapper INSTANCE = Mappers.getMapper(RiskAssessmentHistoryMapper.class);

    @Mapping(target = "riskStatusId", source = "riskStatus.id")
//    @Mapping(target = "riskChampionId", source = "riskChampion.id")
//    @Mapping(target = "departmentOwnerId", source = "departmentOwner.id")
//    @Mapping(target = "riskAssessmentFlowId", source = "riskAssessmentFlow.id")
//    @Mapping(target = "riskAssessmentLevelId", source = "riskAssessmentLevel.id")
    RiskAssessmentHistoryDTO toDTO(RiskAssessmentHistory riskAssessmentHistory);

    @Mapping(target = "riskStatus.id", source = "riskStatusId")
//    @Mapping(target = "riskChampion.id", source = "riskChampionId")
//    @Mapping(target = "departmentOwner.id", source = "departmentOwnerId")
//    @Mapping(target = "riskAssessmentFlow.id", source = "riskAssessmentFlowId")
//    @Mapping(target = "riskAssessmentLevel.id", source = "riskAssessmentLevelId")
    RiskAssessmentHistory toEntity(RiskAssessmentHistoryDTO riskAssessmentHistoryDTO);

    RiskAssessmentHistoryPojo toPojo(RiskAssessmentHistory entity);

    RiskAssessmentHistory toEntity(RiskAssessmentHistoryPojo pojo);

    void updateEntityFromDTO(RiskAssessmentHistoryDTO dto, @MappingTarget RiskAssessmentHistory entity);

    void updateEntityFromPojo(RiskAssessmentHistoryPojo pojo, @MappingTarget RiskAssessmentHistory entity);
}
