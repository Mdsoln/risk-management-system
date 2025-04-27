package tz.go.psssf.risk.compliance.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.compliance.dto.ComplianceStatusDTO;
import tz.go.psssf.risk.compliance.entity.ComplianceStatus;
import tz.go.psssf.risk.compliance.pojo.ComplianceStatusPojo;

@Mapper(componentModel = "cdi")
public interface ComplianceStatusMapper {

    // Map Entity to DTO
    ComplianceStatusDTO toDTO(ComplianceStatus complianceStatus);

    // Map DTO to Entity
    ComplianceStatus toEntity(ComplianceStatusDTO dto);

    // Map Entity to Pojo
    ComplianceStatusPojo toPojo(ComplianceStatus complianceStatus);

    // Update Entity from DTO
    void updateEntityFromDTO(ComplianceStatusDTO dto, @MappingTarget ComplianceStatus complianceStatus);
}
