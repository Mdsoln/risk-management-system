package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.ResidualRiskDTO;
import tz.go.psssf.risk.entity.ResidualRisk;
import tz.go.psssf.risk.pojo.ResidualRiskPojo;

@Mapper(componentModel = "cdi", uses = {LikelihoodMapper.class, ImpactMapper.class})
public interface ResidualRiskMapper {
    ResidualRiskMapper INSTANCE = Mappers.getMapper(ResidualRiskMapper.class);

    @Mapping(source = "likelihood", target = "likelihood")
    @Mapping(source = "impact", target = "impact")
    ResidualRiskDTO toDTO(ResidualRisk residualRisk);

    @Mapping(source = "likelihood", target = "likelihood")
    @Mapping(source = "impact", target = "impact")
    ResidualRisk toEntity(ResidualRiskDTO residualRiskDTO);

    void updateEntityFromDTO(ResidualRiskDTO dto, @MappingTarget ResidualRisk entity);

    @Mapping(source = "likelihood", target = "likelihood")
    @Mapping(source = "impact", target = "impact")
    ResidualRiskPojo toPojo(ResidualRisk entity);

    @Mapping(source = "likelihood", target = "likelihood")
    @Mapping(source = "impact", target = "impact")
    ResidualRisk toEntity(ResidualRiskPojo pojo);

    void updateEntityFromPojo(ResidualRiskPojo pojo, @MappingTarget ResidualRisk entity);
}
