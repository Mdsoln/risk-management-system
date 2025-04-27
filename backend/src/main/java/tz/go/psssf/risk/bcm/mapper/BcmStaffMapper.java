package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmStaffDTO;
import tz.go.psssf.risk.bcm.entity.BcmStaff;
import tz.go.psssf.risk.bcm.pojo.BcmStaffPojo;

@Mapper(componentModel = "cdi")
public interface BcmStaffMapper {

    BcmStaffDTO toDTO(BcmStaff staff);

    BcmStaff toEntity(BcmStaffDTO dto);

    BcmStaffPojo toPojo(BcmStaff staff);

    // Update Method
    void updateEntityFromDTO(BcmStaffDTO dto, @MappingTarget BcmStaff entity);
}
