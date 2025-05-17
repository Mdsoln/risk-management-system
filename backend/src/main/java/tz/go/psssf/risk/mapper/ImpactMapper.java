package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.ImpactDTO;
import tz.go.psssf.risk.entity.Impact;
import tz.go.psssf.risk.pojo.ImpactPojo;

@Mapper(componentModel = "jakarta")
public interface ImpactMapper {
    ImpactMapper INSTANCE = Mappers.getMapper(ImpactMapper.class);

    ImpactDTO toDTO(Impact impact);

    Impact toEntity(ImpactDTO impactDTO);

    void updateEntityFromDTO(ImpactDTO dto, @MappingTarget Impact entity);

    ImpactPojo toPojo(Impact entity);

    Impact toEntity(ImpactPojo pojo);

    void updateEntityFromPojo(ImpactPojo pojo, @MappingTarget Impact entity);
}
