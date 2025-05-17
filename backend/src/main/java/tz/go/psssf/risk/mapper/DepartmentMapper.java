package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.DepartmentDTO;
import tz.go.psssf.risk.entity.Department;
import tz.go.psssf.risk.pojo.DepartmentPojo;

@Mapper(componentModel = "jakarta", uses = {UserMapper.class})
public interface DepartmentMapper {
    DepartmentMapper INSTANCE = Mappers.getMapper(DepartmentMapper.class);

    DepartmentDTO toDTO(Department department);

    Department toEntity(DepartmentDTO departmentDTO);

    void updateEntityFromDTO(DepartmentDTO dto, @MappingTarget Department entity);

    DepartmentPojo toPojo(Department entity);

    Department toEntity(DepartmentPojo pojo);


}
