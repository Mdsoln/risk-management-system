package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmSystemListingDTO;
import tz.go.psssf.risk.bcm.entity.BcmSystemListing;
import tz.go.psssf.risk.bcm.pojo.BcmSystemListingPojo;

@Mapper(componentModel = "cdi")
public interface BcmSystemListingMapper {

    BcmSystemListingDTO toDTO(BcmSystemListing entity);

    BcmSystemListing toEntity(BcmSystemListingDTO dto);

    BcmSystemListingPojo toPojo(BcmSystemListing entity);

    void updateEntityFromDTO(BcmSystemListingDTO dto, @MappingTarget BcmSystemListing entity);
}
