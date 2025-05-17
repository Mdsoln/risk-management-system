package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.RiskAssessmentFlow;
import tz.go.psssf.risk.pojo.RiskAssessmentFlowPojo;

/**
 * A minimal mapper for RiskAssessmentFlow that doesn't depend on RiskAssessmentHistoryMapper
 * to break the circular dependency between RiskAssessmentFlowMapper and RiskAssessmentHistoryMapper.
 */
@Mapper(componentModel = "jakarta", uses = {
    RiskAssessmentLevelMapper.class,
    RiskAssessmentStatusMapper.class
})
public interface MinimalRiskAssessmentFlowMapper {

    /**
     * Maps a RiskAssessmentFlow entity to a RiskAssessmentFlowPojo, excluding the riskAssessmentHistories field
     * to break the circular dependency.
     */
    @Mapping(target = "riskAssessmentHistories", ignore = true)
    RiskAssessmentFlowPojo toPojo(RiskAssessmentFlow entity);

    /**
     * Maps a RiskAssessmentFlowPojo to a RiskAssessmentFlow entity, excluding the riskAssessmentHistories field
     * to break the circular dependency.
     */
    @Mapping(target = "riskAssessmentHistories", ignore = true)
    RiskAssessmentFlow toEntity(RiskAssessmentFlowPojo pojo);
}