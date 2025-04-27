package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import tz.go.psssf.risk.entity.UserType;
import tz.go.psssf.risk.pojo.UserTypePojo;

@Mapper(componentModel = "cdi")
public interface UserTypeMapper {

    UserTypePojo toPojo(UserType userType);

    UserType toEntity(UserTypePojo userTypePojo);
}
