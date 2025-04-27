package tz.go.psssf.risk.compliance.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.compliance.dto.ComplianceDocumentDTO;
import tz.go.psssf.risk.compliance.entity.ComplianceDocument;
import tz.go.psssf.risk.compliance.pojo.ComplianceDocumentPojo;

@Mapper(componentModel = "cdi", uses = RegulatoryComplianceMatrixMapper.class) // Use the other mapper
public interface ComplianceDocumentMapper {

    // Mapping to DTO
    @Mapping(target = "entityId", source = "entity.id")
    @Mapping(target = "documentCategoryId", source = "documentCategory.id")
    @Mapping(target = "departmentId", source = "department.id")
    ComplianceDocumentDTO toDTO(ComplianceDocument entity);

    // Mapping from DTO to Entity
    @Mapping(target = "entity.id", source = "entityId")
    @Mapping(target = "documentCategory.id", source = "documentCategoryId")
    @Mapping(target = "department.id", source = "departmentId")
    ComplianceDocument toEntity(ComplianceDocumentDTO dto);

    // Mapping to Pojo
    ComplianceDocumentPojo toPojo(ComplianceDocument entity);

    // Update Entity from DTO
    void updateEntityFromDTO(ComplianceDocumentDTO dto, @MappingTarget ComplianceDocument entity);
}
