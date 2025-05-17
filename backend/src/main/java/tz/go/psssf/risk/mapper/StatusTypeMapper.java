package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.StatusTypeDTO;
import tz.go.psssf.risk.entity.StatusType;
import tz.go.psssf.risk.pojo.StatusTypePojo;

@Mapper(componentModel = "jakarta")
public interface StatusTypeMapper {
    StatusTypeMapper INSTANCE = Mappers.getMapper(StatusTypeMapper.class);

    @Mapping(target = "name", source = "entity.name")
    @Mapping(target = "code", source = "entity.code")
    @Mapping(target = "description", source = "entity.description")
    @Mapping(target = "type", source = "entity.type")
    @Mapping(target = "color", source = "entity.color")
    StatusTypeDTO toDTO(StatusType entity);

    @Mapping(target = "name", source = "dto.name")
    @Mapping(target = "code", source = "dto.code")
    @Mapping(target = "description", source = "dto.description")
    @Mapping(target = "type", source = "dto.type")
    @Mapping(target = "color", source = "dto.color")
    StatusType toEntity(StatusTypeDTO dto);

    StatusTypePojo toPojo(StatusType entity);

    StatusType toEntity(StatusTypePojo pojo);
}
