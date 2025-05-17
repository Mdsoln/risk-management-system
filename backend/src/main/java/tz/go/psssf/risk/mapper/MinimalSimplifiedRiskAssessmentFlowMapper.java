package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.RiskAssessmentFlow;
import tz.go.psssf.risk.pojo.SimplifiedRiskAssessmentFlowPojo;

/**
 * A minimal mapper for SimplifiedRiskAssessmentFlow that doesn't depend on SimplifiedRiskAssessmentHistoryMapper
 * to break the circular dependency between SimplifiedRiskAssessmentFlowMapper and SimplifiedRiskAssessmentHistoryMapper.
 */
@Mapper(componentModel = "jakarta", uses = {
    SimplifiedRiskAssessmentLevelMapper.class
})
public interface MinimalSimplifiedRiskAssessmentFlowMapper {

    /**
     * Maps a RiskAssessmentFlow entity to a SimplifiedRiskAssessmentFlowPojo, excluding the riskAssessmentHistories field
     * to break the circular dependency.
     */
    @Mapping(target = "riskAssessmentHistories", ignore = true)
    SimplifiedRiskAssessmentFlowPojo toPojo(RiskAssessmentFlow entity);

    /**
     * Maps a SimplifiedRiskAssessmentFlowPojo to a RiskAssessmentFlow entity, excluding the riskAssessmentHistories field
     * to break the circular dependency.
     */
    @Mapping(target = "riskAssessmentHistories", ignore = true)
    RiskAssessmentFlow toEntity(SimplifiedRiskAssessmentFlowPojo pojo);
}