package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.entity.BusinessProcess;
import tz.go.psssf.risk.pojo.SimplifiedBusinessProcessPojo;

@Mapper(componentModel = "jakarta", uses = { SimplifiedFundObjectiveMapper.class, SimplifiedDepartmentMapper.class }) // Update uses attribute
public interface SimplifiedBusinessProcessMapper {
    SimplifiedBusinessProcessMapper INSTANCE = Mappers.getMapper(SimplifiedBusinessProcessMapper.class);

    @Mapping(target = "fundObjective", source = "fundObjective")
    @Mapping(target = "businessProcessOwnerDepartment", source = "businessProcessOwnerDepartment") // Add this line
    SimplifiedBusinessProcessPojo toPojo(BusinessProcess businessProcess);

    @Mapping(target = "fundObjective", source = "fundObjective")
    @Mapping(target = "businessProcessOwnerDepartment", source = "businessProcessOwnerDepartment") // Add this line
    BusinessProcess toEntity(SimplifiedBusinessProcessPojo pojo);
}
