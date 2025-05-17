package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.dto.RiskAreaDTO;
import tz.go.psssf.risk.entity.RiskArea;
import tz.go.psssf.risk.pojo.RiskAreaPojo;

@Mapper(componentModel = "jakarta", uses = {SimplifiedRiskAreaCategoryMapper.class})
public interface RiskAreaMapper {
    RiskAreaMapper INSTANCE = Mappers.getMapper(RiskAreaMapper.class);

    @Mapping(source = "riskAreaCategory.id", target = "riskAreaCategoryId")
    RiskAreaDTO toDTO(RiskArea riskArea);

    @Mapping(source = "riskAreaCategoryId", target = "riskAreaCategory.id")
    RiskArea toEntity(RiskAreaDTO riskAreaDTO);

    void updateEntityFromDTO(RiskAreaDTO dto, @MappingTarget RiskArea entity);

    @Mapping(source = "riskAreaCategory", target = "riskAreaCategory")
    RiskAreaPojo toPojo(RiskArea entity);

    @Mapping(target = "riskAreaCategory", ignore = true) // Avoid recursion
    RiskArea toEntity(RiskAreaPojo pojo);

    void updateEntityFromPojo(RiskAreaPojo pojo, @MappingTarget RiskArea entity);
}
