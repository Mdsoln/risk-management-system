package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.RiskStatus;
import tz.go.psssf.risk.pojo.SimplifiedRiskStatusPojo;

@Mapper(componentModel = "jakarta")
public interface SimplifiedRiskStatusMapper {

    SimplifiedRiskStatusPojo toPojo(RiskStatus entity);

    RiskStatus toEntity(SimplifiedRiskStatusPojo pojo);
}
