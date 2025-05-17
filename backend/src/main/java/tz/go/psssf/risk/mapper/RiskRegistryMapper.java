package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.RiskRegistryDTO;
import tz.go.psssf.risk.entity.RiskRegistry;
import tz.go.psssf.risk.pojo.RiskRegistryPojo;

@Mapper(componentModel = "jakarta", uses = {RiskMapper.class})
public interface RiskRegistryMapper {
    RiskRegistryMapper INSTANCE = Mappers.getMapper(RiskRegistryMapper.class);

    @Mapping(source = "risk.id", target = "riskId")
    RiskRegistryDTO toDTO(RiskRegistry riskRegistry);

    @Mapping(source = "riskId", target = "risk.id")
    RiskRegistry toEntity(RiskRegistryDTO riskRegistryDTO);

    void updateEntityFromDTO(RiskRegistryDTO dto, @MappingTarget RiskRegistry entity);

    @Mapping(source = "risk.id", target = "riskId")
    RiskRegistryPojo toPojo(RiskRegistry entity);

    @Mapping(source = "riskId", target = "risk.id")
    RiskRegistry toEntity(RiskRegistryPojo pojo);

    void updateEntityFromPojo(RiskRegistryPojo pojo, @MappingTarget RiskRegistry entity);
}
