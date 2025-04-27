package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.entity.RiskAreaCategory;
import tz.go.psssf.risk.pojo.SimplifiedRiskAreaCategoryPojo;

@Mapper(componentModel = "cdi")
public interface SimplifiedRiskAreaCategoryMapper {
    SimplifiedRiskAreaCategoryMapper INSTANCE = Mappers.getMapper(SimplifiedRiskAreaCategoryMapper.class);

    SimplifiedRiskAreaCategoryPojo toPojo(RiskAreaCategory riskAreaCategory);

    RiskAreaCategory toEntity(SimplifiedRiskAreaCategoryPojo pojo);
}
