package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmUrgentResourceDTO;
import tz.go.psssf.risk.bcm.entity.BcmUrgentResource;
import tz.go.psssf.risk.bcm.pojo.BcmUrgentResourcePojo;

@Mapper(componentModel = "jakarta")
public interface BcmUrgentResourceMapper {

    BcmUrgentResourceDTO toDTO(BcmUrgentResource resource);

    BcmUrgentResource toEntity(BcmUrgentResourceDTO dto);

    BcmUrgentResourcePojo toPojo(BcmUrgentResource resource);

    // Update Method
    void updateEntityFromDTO(BcmUrgentResourceDTO dto, @MappingTarget BcmUrgentResource entity);
}
