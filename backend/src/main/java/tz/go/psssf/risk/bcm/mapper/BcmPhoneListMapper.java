package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmPhoneListDTO;
import tz.go.psssf.risk.bcm.entity.BcmPhoneList;
import tz.go.psssf.risk.bcm.pojo.BcmPhoneListPojo;

@Mapper(componentModel = "cdi")
public interface BcmPhoneListMapper {

    BcmPhoneListDTO toDTO(BcmPhoneList phoneList);

    BcmPhoneList toEntity(BcmPhoneListDTO dto);

    BcmPhoneListPojo toPojo(BcmPhoneList phoneList);

    // Update Method
    void updateEntityFromDTO(BcmPhoneListDTO dto, @MappingTarget BcmPhoneList entity);
}
