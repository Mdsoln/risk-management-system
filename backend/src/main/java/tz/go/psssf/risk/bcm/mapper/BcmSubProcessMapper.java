package tz.go.psssf.risk.bcm.mapper;


import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmSubProcessDTO;
import tz.go.psssf.risk.bcm.entity.BcmSubProcess;
import tz.go.psssf.risk.bcm.pojo.BcmSubProcessPojo;

@Mapper(componentModel = "jakarta")
public interface BcmSubProcessMapper {

    @Mapping(target = "processId", source = "process.id")
    BcmSubProcessDTO toDTO(BcmSubProcess subProcess);

    @Mapping(target = "process.id", source = "processId")
    BcmSubProcess toEntity(BcmSubProcessDTO dto);

    BcmSubProcessPojo toPojo(BcmSubProcess subProcess);

    // Update Method
    void updateEntityFromDTO(BcmSubProcessDTO dto, @MappingTarget BcmSubProcess entity);
}

