package tz.go.psssf.risk.bcm.mapper;


import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmDependencyDTO;
import tz.go.psssf.risk.bcm.entity.BcmDependency;
import tz.go.psssf.risk.bcm.pojo.BcmDependencyPojo;

@Mapper(componentModel = "jakarta")
public interface BcmDependencyMapper {

    BcmDependencyDTO toDTO(BcmDependency dependency);

    BcmDependency toEntity(BcmDependencyDTO dto);

    BcmDependencyPojo toPojo(BcmDependency dependency);

    // Update Method
    void updateEntityFromDTO(BcmDependencyDTO dto, @MappingTarget BcmDependency entity);
}
