package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmPhoneDirectoryDTO;
import tz.go.psssf.risk.bcm.entity.BcmPhoneDirectory;
import tz.go.psssf.risk.bcm.pojo.BcmPhoneDirectoryPojo;

@Mapper(componentModel = "jakarta")
public interface BcmPhoneDirectoryMapper {

    BcmPhoneDirectoryDTO toDTO(BcmPhoneDirectory directory);

    BcmPhoneDirectory toEntity(BcmPhoneDirectoryDTO dto);

    BcmPhoneDirectoryPojo toPojo(BcmPhoneDirectory directory);

    // Update Method
    void updateEntityFromDTO(BcmPhoneDirectoryDTO dto, @MappingTarget BcmPhoneDirectory entity);
}
