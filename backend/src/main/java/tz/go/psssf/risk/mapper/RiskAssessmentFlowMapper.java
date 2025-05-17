package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.dto.RiskAssessmentFlowDTO;
import tz.go.psssf.risk.entity.RiskAssessmentFlow;
import tz.go.psssf.risk.entity.RiskAssessmentStatus;
import tz.go.psssf.risk.pojo.RiskAssessmentFlowPojo;
import tz.go.psssf.risk.pojo.SimplifiedRiskAssessmentFlowPojo;
import tz.go.psssf.risk.pojo.SimplifiedRiskAssessmentStatusPojo;

@Mapper(componentModel = "jakarta", uses = {
    RiskAssessmentHistoryMapper.class,
    RiskAssessmentLevelMapper.class,
    RiskAssessmentStatusMapper.class, // Use the primary mapper here
    SimplifiedRiskAssessmentStatusMapper.class
})
public interface RiskAssessmentFlowMapper {

    RiskAssessmentFlowDTO toDTO(RiskAssessmentFlow riskAssessmentFlow);

    RiskAssessmentFlow toEntity(RiskAssessmentFlowDTO riskAssessmentFlowDTO);

    void updateEntityFromDTO(RiskAssessmentFlowDTO dto, @MappingTarget RiskAssessmentFlow entity);

//    @Mapping(target = "riskAssessmentStatus", qualifiedByName = "mapToSimplifiedRiskAssessmentStatusPojo")
//    RiskAssessmentFlowPojo toPojo(RiskAssessmentFlow entity);
//
//    @Mapping(target = "riskAssessmentStatus", qualifiedByName = "mapToRiskAssessmentStatusEntity")
//    RiskAssessmentFlow toEntity(RiskAssessmentFlowPojo pojo);

    void updateEntityFromPojo(RiskAssessmentFlowPojo pojo, @MappingTarget RiskAssessmentFlow entity);

//    @Mapping(target = "riskAssessmentStatus", qualifiedByName = "mapToSimplifiedRiskAssessmentStatusPojo")
//    SimplifiedRiskAssessmentFlowPojo toSimplifiedPojo(RiskAssessmentFlow entity);
//
//    @Mapping(target = "riskAssessmentStatus", qualifiedByName = "mapToRiskAssessmentStatusEntity")
//    RiskAssessmentFlow toEntity(SimplifiedRiskAssessmentFlowPojo pojo);

    void updateEntityFromSimplifiedPojo(SimplifiedRiskAssessmentFlowPojo pojo, @MappingTarget RiskAssessmentFlow entity);

//    @Named("mapToSimplifiedRiskAssessmentStatusPojo")
//    default SimplifiedRiskAssessmentStatusPojo mapToSimplifiedRiskAssessmentStatusPojo(RiskAssessmentStatus riskAssessmentStatus) {
//        return SimplifiedRiskAssessmentStatusMapper.INSTANCE.toSimplifiedPojo(riskAssessmentStatus);
//    }
//
//    @Named("mapToRiskAssessmentStatusEntity")
//    default RiskAssessmentStatus mapToRiskAssessmentStatusEntity(SimplifiedRiskAssessmentStatusPojo simplifiedPojo) {
//        return SimplifiedRiskAssessmentStatusMapper.INSTANCE.toEntity(simplifiedPojo);
//    }
}
