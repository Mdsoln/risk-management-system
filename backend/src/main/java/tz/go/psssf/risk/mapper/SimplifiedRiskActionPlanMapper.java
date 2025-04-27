package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.RiskActionPlan;
import tz.go.psssf.risk.pojo.SimplifiedRiskActionPlanPojo;

@Mapper(componentModel = "cdi")
public interface SimplifiedRiskActionPlanMapper {

    @Mapping(source = "id", target = "id")
    SimplifiedRiskActionPlanPojo toPojo(RiskActionPlan entity);

    @Mapping(source = "id", target = "id")
    RiskActionPlan toEntity(SimplifiedRiskActionPlanPojo pojo);
}
