package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.entity.RiskArea;
import tz.go.psssf.risk.pojo.SimplifiedRiskAreaPojo;

@Mapper(componentModel = "jakarta")
public interface SimplifiedRiskAreaMapper {
    SimplifiedRiskAreaMapper INSTANCE = Mappers.getMapper(SimplifiedRiskAreaMapper.class);

    SimplifiedRiskAreaPojo toPojo(RiskArea riskArea);

    RiskArea toEntity(SimplifiedRiskAreaPojo pojo);
}
