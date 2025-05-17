package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.pojo.SimplifiedDepartmentOwnerPojo;

@Mapper(componentModel = "jakarta", uses = {SimplifiedDepartmentMapper.class})
public interface SimplifiedDepartmentOwnerMapper {

//    @Mapping(target = "department.id", source = "department.id")
//    SimplifiedDepartmentOwnerPojo toPojo(DepartmentOwner entity);

//    @Mapping(target = "department.id", source = "department.id")
//    DepartmentOwner toEntity(SimplifiedDepartmentOwnerPojo pojo);

//    void updateEntityFromPojo(SimplifiedDepartmentOwnerPojo pojo, @MappingTarget DepartmentOwner entity);
}
