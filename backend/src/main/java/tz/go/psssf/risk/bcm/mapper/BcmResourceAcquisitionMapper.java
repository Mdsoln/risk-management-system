package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmResourceAcquisitionDTO;
import tz.go.psssf.risk.bcm.entity.BcmResourceAcquisition;
import tz.go.psssf.risk.bcm.pojo.BcmResourceAcquisitionPojo;

@Mapper(componentModel = "cdi")
public interface BcmResourceAcquisitionMapper {

    BcmResourceAcquisitionDTO toDTO(BcmResourceAcquisition entity);

    BcmResourceAcquisition toEntity(BcmResourceAcquisitionDTO dto);

    BcmResourceAcquisitionPojo toPojo(BcmResourceAcquisition entity);

    void updateEntityFromDTO(BcmResourceAcquisitionDTO dto, @MappingTarget BcmResourceAcquisition entity);
}
