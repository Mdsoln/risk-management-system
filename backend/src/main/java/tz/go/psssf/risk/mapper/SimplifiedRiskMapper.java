package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.pojo.SimplifiedRiskPojo;

@Mapper(componentModel = "cdi")
public interface SimplifiedRiskMapper {
    SimplifiedRiskPojo toPojo(Risk risk);
    Risk toEntity(SimplifiedRiskPojo simplifiedRiskPojo);
}
