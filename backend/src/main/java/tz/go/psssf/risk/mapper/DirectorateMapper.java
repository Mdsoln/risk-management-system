package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.entity.Directorate;
import tz.go.psssf.risk.pojo.DirectoratePojo;

@Mapper(componentModel = "cdi", uses = { DepartmentMapper.class })
public interface DirectorateMapper {
    DirectorateMapper INSTANCE = Mappers.getMapper(DirectorateMapper.class);

    @Mapping(source = "departments", target = "departments")
    DirectoratePojo toPojo(Directorate directorate);
}
