package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.entity.Department;
import tz.go.psssf.risk.pojo.SimplifiedDepartmentPojo;

@Mapper(componentModel = "cdi")
public interface SimplifiedDepartmentMapper {
    SimplifiedDepartmentMapper INSTANCE = Mappers.getMapper(SimplifiedDepartmentMapper.class);

    SimplifiedDepartmentPojo toPojo(Department department);

    Department toEntity(SimplifiedDepartmentPojo pojo);
}
