package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.dto.UserDTO;
import tz.go.psssf.risk.entity.User;
import tz.go.psssf.risk.pojo.ProfileDetailsPojo;
import tz.go.psssf.risk.pojo.UserPojo;

@Mapper(componentModel = "jakarta", uses = {
    RoleMapper.class,
    DepartmentMapper.class,
    //UserTypeMapper.class 
})
public interface UserMapper {

    @Mapping(source = "department", target = "department") // Map department
    @Mapping(source = "user", target = "profileDetails")
    @Mapping(source = "nin", target = "nin")
    UserPojo toPojo(User user);
    
    UserDTO toDTO(User user);

    User toEntity(UserDTO userDTO);

    @Mapping(target = "roles", ignore = true) // Avoid circular reference
    void updateEntityFromDTO(UserDTO userDTO, @MappingTarget User user);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "middleName", source = "middleName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "mobile", source = "mobile")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "nin", source = "nin")
    @Mapping(target = "jobTitle", source = "jobTitle")
    @Mapping(target = "position", source = "position")
    @Mapping(target = "office", source = "office")
    @Mapping(target = "status", source = "status")
    ProfileDetailsPojo toProfileDetailsPojo(User user);
}
