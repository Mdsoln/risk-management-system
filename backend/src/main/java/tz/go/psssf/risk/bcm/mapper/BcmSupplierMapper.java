package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmSupplierDTO;
import tz.go.psssf.risk.bcm.entity.BcmSupplier;
import tz.go.psssf.risk.bcm.pojo.BcmSupplierPojo;

@Mapper(componentModel = "cdi")
public interface BcmSupplierMapper {

    BcmSupplierDTO toDTO(BcmSupplier supplier);

    BcmSupplier toEntity(BcmSupplierDTO dto);

    BcmSupplierPojo toPojo(BcmSupplier supplier);

    // Update Method
    void updateEntityFromDTO(BcmSupplierDTO dto, @MappingTarget BcmSupplier entity);
}
