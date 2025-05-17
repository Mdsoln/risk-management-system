package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.entity.Department;
import tz.go.psssf.risk.pojo.RiskOwnerPojo;
import tz.go.psssf.risk.pojo.RiskDepartmentOwnerPojo;

@Mapper(componentModel = "jakarta", uses = {UserMapper.class})
public interface RiskOwnerMapper {
    
    RiskOwnerMapper INSTANCE = Mappers.getMapper(RiskOwnerMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "code", target = "code")
//    @Mapping(source = "departmentDirectors", target = "riskDepartmentOwners")
    RiskOwnerPojo toRiskOwnerPojo(Department department);
//
//    @Mapping(source = "id", target = "id")
//    @Mapping(source = "user", target = "user")
//    RiskDepartmentOwnerPojo toRiskDepartmentOwnerPojo(DepartmentOwner departmentOwner);
}
