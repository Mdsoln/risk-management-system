package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.entity.FundObjective;
import tz.go.psssf.risk.pojo.SimplifiedFundObjectivePojo;

@Mapper(componentModel = "cdi")
public interface SimplifiedFundObjectiveMapper {
    SimplifiedFundObjectiveMapper INSTANCE = Mappers.getMapper(SimplifiedFundObjectiveMapper.class);

    SimplifiedFundObjectivePojo toPojo(FundObjective fundObjective);

    FundObjective toEntity(SimplifiedFundObjectivePojo pojo);
}
