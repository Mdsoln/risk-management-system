package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.entity.Role;
import tz.go.psssf.risk.pojo.RolePojo;
import tz.go.psssf.risk.dto.RoleDTO;

@Mapper(componentModel = "jakarta", uses = { PermissionMapper.class })
public interface RoleMapper {

    @Mapping(target = "permissions", source = "permissions")
    RolePojo toPojo(Role role);

    Role toEntity(RoleDTO dto);

    void updateEntityFromDTO(RoleDTO dto, @MappingTarget Role entity);
}
