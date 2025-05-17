package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.RiskAssessmentHistory;
import tz.go.psssf.risk.pojo.SimplifiedRiskAssessmentHistoryPojo;

@Mapper(componentModel = "jakarta", uses = {
    SimplifiedRiskStatusMapper.class,
    SimplifiedRiskChampionMapper.class,
    SimplifiedDepartmentOwnerMapper.class,
    MinimalSimplifiedRiskAssessmentFlowMapper.class,
    SimplifiedRiskAssessmentLevelMapper.class
})
public interface SimplifiedRiskAssessmentHistoryMapper {

    SimplifiedRiskAssessmentHistoryPojo toPojo(RiskAssessmentHistory entity);

    RiskAssessmentHistory toEntity(SimplifiedRiskAssessmentHistoryPojo pojo);
}
