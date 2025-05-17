package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import tz.go.psssf.risk.entity.RiskIndicator;
import tz.go.psssf.risk.pojo.SimplifiedRiskIndicatorPojo;

@Mapper(componentModel = "jakarta")
public interface SimplifiedRiskIndicatorMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "indicator", source = "indicator")
    SimplifiedRiskIndicatorPojo toPojo(RiskIndicator riskIndicator);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "indicator", source = "indicator")
    RiskIndicator toEntity(SimplifiedRiskIndicatorPojo pojo);
}
