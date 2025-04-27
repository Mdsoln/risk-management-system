package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.RiskChampion;
import tz.go.psssf.risk.pojo.SimplifiedRiskChampionPojo;

@Mapper(componentModel = "cdi")
public interface SimplifiedRiskChampionMapper {
    SimplifiedRiskChampionPojo toPojo(RiskChampion entity);
    RiskChampion toEntity(SimplifiedRiskChampionPojo pojo);
}
