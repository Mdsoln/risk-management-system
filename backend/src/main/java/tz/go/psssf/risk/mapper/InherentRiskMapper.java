package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.InherentRiskDTO;
import tz.go.psssf.risk.entity.InherentRisk;
import tz.go.psssf.risk.pojo.InherentRiskPojo;

@Mapper(componentModel = "cdi", uses = {LikelihoodMapper.class, ImpactMapper.class})
public interface InherentRiskMapper {
    InherentRiskMapper INSTANCE = Mappers.getMapper(InherentRiskMapper.class);

    @Mapping(source = "likelihood", target = "likelihood")
    @Mapping(source = "impact", target = "impact")
    InherentRiskDTO toDTO(InherentRisk inherentRisk);

    @Mapping(source = "likelihood", target = "likelihood")
    @Mapping(source = "impact", target = "impact")
    InherentRisk toEntity(InherentRiskDTO inherentRiskDTO);

    void updateEntityFromDTO(InherentRiskDTO dto, @MappingTarget InherentRisk entity);

    @Mapping(source = "likelihood", target = "likelihood")
    @Mapping(source = "impact", target = "impact")
    InherentRiskPojo toPojo(InherentRisk entity);

    @Mapping(source = "likelihood", target = "likelihood")
    @Mapping(source = "impact", target = "impact")
    InherentRisk toEntity(InherentRiskPojo pojo);

    void updateEntityFromPojo(InherentRiskPojo pojo, @MappingTarget InherentRisk entity);
}
