package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.RiskAssessmentFlow;
import tz.go.psssf.risk.pojo.SimplifiedRiskAssessmentFlowPojo;

@Mapper(componentModel = "cdi", uses = {
    SimplifiedRiskAssessmentHistoryMapper.class,
    SimplifiedRiskAssessmentLevelMapper.class
})
public interface SimplifiedRiskAssessmentFlowMapper {

    SimplifiedRiskAssessmentFlowPojo toPojo(RiskAssessmentFlow entity);

    RiskAssessmentFlow toEntity(SimplifiedRiskAssessmentFlowPojo pojo);
}
