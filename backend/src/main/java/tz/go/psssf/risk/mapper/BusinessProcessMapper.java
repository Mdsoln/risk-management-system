package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.BusinessProcessDTO;
import tz.go.psssf.risk.entity.BusinessProcess;
import tz.go.psssf.risk.pojo.BusinessProcessPojo;

@Mapper(componentModel = "jakarta", uses = {FundObjectiveMapper.class, DepartmentMapper.class})
public interface BusinessProcessMapper {
    BusinessProcessMapper INSTANCE = Mappers.getMapper(BusinessProcessMapper.class);

    // Map Entity -> DTO
    @Mapping(target = "fundObjectiveId", source = "fundObjective.id")
    @Mapping(target = "businessProcessOwnerDepartmentId", source = "businessProcessOwnerDepartment.id") // Fixed
    BusinessProcessDTO toDTO(BusinessProcess businessProcess);

    // Map DTO -> Entity
    @Mapping(target = "fundObjective.id", source = "fundObjectiveId")
    @Mapping(target = "businessProcessOwnerDepartment.id", source = "businessProcessOwnerDepartmentId") // Fixed
    BusinessProcess toEntity(BusinessProcessDTO businessProcessDTO);

    // Update Entity
    void updateEntityFromDTO(BusinessProcessDTO dto, @MappingTarget BusinessProcess entity);

    // Map Entity -> Pojo
    @Mapping(target = "fundObjective", source = "fundObjective")
    @Mapping(target = "businessProcessOwnerDepartment", source = "businessProcessOwnerDepartment") // Fixed
    BusinessProcessPojo toPojo(BusinessProcess entity);

    // Map Pojo -> Entity
    @Mapping(target = "fundObjective", source = "fundObjective")
    @Mapping(target = "businessProcessOwnerDepartment", source = "businessProcessOwnerDepartment") // Fixed
    BusinessProcess toEntity(BusinessProcessPojo pojo);

    void updateEntityFromPojo(BusinessProcessPojo pojo, @MappingTarget BusinessProcess entity);
}
