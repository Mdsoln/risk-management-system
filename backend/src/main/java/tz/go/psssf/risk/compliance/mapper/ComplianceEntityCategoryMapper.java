
package tz.go.psssf.risk.compliance.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.compliance.dto.ComplianceEntityCategoryDTO;
import tz.go.psssf.risk.compliance.entity.ComplianceEntityCategory;
import tz.go.psssf.risk.compliance.pojo.ComplianceEntityCategoryPojo;

@Mapper(componentModel = "jakarta")
public interface ComplianceEntityCategoryMapper {

    // Convert Entity to Pojo
    ComplianceEntityCategoryPojo toPojo(ComplianceEntityCategory entity);

    // Convert DTO to Entity
    ComplianceEntityCategory toEntity(ComplianceEntityCategoryDTO dto);

    // Update an existing Entity from a DTO - ADD THIS METHOD
    void updateEntityFromDTO(ComplianceEntityCategoryDTO dto, @MappingTarget ComplianceEntityCategory entity);
}
