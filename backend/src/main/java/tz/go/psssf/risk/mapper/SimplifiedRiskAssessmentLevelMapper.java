package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.RiskAssessmentLevel;
import tz.go.psssf.risk.pojo.SimplifiedRiskAssessmentLevelPojo;

@Mapper(componentModel = "jakarta")
public interface SimplifiedRiskAssessmentLevelMapper {

    SimplifiedRiskAssessmentLevelPojo toPojo(RiskAssessmentLevel entity);

    RiskAssessmentLevel toEntity(SimplifiedRiskAssessmentLevelPojo pojo);
}
