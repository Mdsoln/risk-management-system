package tz.go.psssf.risk.compliance.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.compliance.dto.*;
import tz.go.psssf.risk.compliance.entity.*;
import tz.go.psssf.risk.compliance.pojo.*;

@Mapper(componentModel = "jakarta")
public interface ComplianceEntityMapper {
    @Mapping(target = "categoryId", source = "category.id")
    ComplianceEntityDTO toDTO(ComplianceEntity entity);

    @Mapping(target = "category.id", source = "categoryId")
    ComplianceEntity toEntity(ComplianceEntityDTO dto);

    ComplianceEntityPojo toPojo(ComplianceEntity entity);
    
    void updateEntityFromDTO(ComplianceEntityDTO dto, @MappingTarget ComplianceEntity entity);

}
