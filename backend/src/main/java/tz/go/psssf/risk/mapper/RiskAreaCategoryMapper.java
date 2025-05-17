package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.dto.RiskAreaCategoryDTO;
import tz.go.psssf.risk.entity.RiskAreaCategory;
import tz.go.psssf.risk.pojo.RiskAreaCategoryPojo;

@Mapper(componentModel = "jakarta", uses = {SimplifiedRiskAreaMapper.class})
public interface RiskAreaCategoryMapper {
    RiskAreaCategoryMapper INSTANCE = Mappers.getMapper(RiskAreaCategoryMapper.class);

    RiskAreaCategoryDTO toDTO(RiskAreaCategory riskAreaCategory);

    RiskAreaCategory toEntity(RiskAreaCategoryDTO riskAreaCategoryDTO);

    void updateEntityFromDTO(RiskAreaCategoryDTO dto, @MappingTarget RiskAreaCategory entity);

    RiskAreaCategoryPojo toPojo(RiskAreaCategory entity);
}
