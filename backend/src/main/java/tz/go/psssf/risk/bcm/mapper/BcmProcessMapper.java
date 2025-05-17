package tz.go.psssf.risk.bcm.mapper;


import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmProcessDTO;
import tz.go.psssf.risk.bcm.entity.BcmProcess;
import tz.go.psssf.risk.bcm.pojo.BcmProcessPojo;

@Mapper(componentModel = "jakarta")
public interface BcmProcessMapper {

    @Mapping(target = "departmentId", source = "department.id")
    BcmProcessDTO toDTO(BcmProcess process);

    @Mapping(target = "department.id", source = "departmentId")
    BcmProcess toEntity(BcmProcessDTO dto);

    BcmProcessPojo toPojo(BcmProcess process);

    // Update Method
    void updateEntityFromDTO(BcmProcessDTO dto, @MappingTarget BcmProcess entity);
}
