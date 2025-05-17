package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.Permission;
import tz.go.psssf.risk.pojo.PermissionPojo;
import tz.go.psssf.risk.dto.PermissionDTO;

@Mapper(componentModel = "jakarta")
public interface PermissionMapper {

    PermissionPojo toPojo(Permission permission);

    Permission toEntity(PermissionDTO dto);

    void updateEntityFromDTO(PermissionDTO dto, @MappingTarget Permission entity);
}
