package tz.go.psssf.risk.bcm.mapper;


import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmRecoveryStrategyDTO;
import tz.go.psssf.risk.bcm.entity.BcmRecoveryStrategy;
import tz.go.psssf.risk.bcm.pojo.BcmRecoveryStrategyPojo;

@Mapper(componentModel = "jakarta")
public interface BcmRecoveryStrategyMapper {

    @Mapping(target = "dependencyId", source = "dependency.id")
    BcmRecoveryStrategyDTO toDTO(BcmRecoveryStrategy strategy);

    @Mapping(target = "dependency.id", source = "dependencyId")
    BcmRecoveryStrategy toEntity(BcmRecoveryStrategyDTO dto);

    BcmRecoveryStrategyPojo toPojo(BcmRecoveryStrategy strategy);

    // Update Method
    void updateEntityFromDTO(BcmRecoveryStrategyDTO dto, @MappingTarget BcmRecoveryStrategy entity);
}
