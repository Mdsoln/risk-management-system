package tz.go.psssf.risk.compliance.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.compliance.dto.RegulatoryComplianceMatrixDTO;
import tz.go.psssf.risk.compliance.entity.RegulatoryComplianceMatrix;
import tz.go.psssf.risk.compliance.pojo.RegulatoryComplianceMatrixPojo;

@Mapper(componentModel = "jakarta", uses = {RegulatoryComplianceMatrixSectionMapper.class})
public interface RegulatoryComplianceMatrixMapper {

    // Mapping to DTO
    @Mapping(target = "departmentId", source = "department.id")
    @Mapping(target = "documentId", source = "complianceDocument.id") // <-- Ensure documentId mapping
    RegulatoryComplianceMatrixDTO toDTO(RegulatoryComplianceMatrix entity);

    // Mapping from DTO to Entity
    @Mapping(target = "department.id", source = "departmentId")
    @Mapping(target = "complianceDocument.id", source = "documentId") // <-- Ensure documentId mapping
    RegulatoryComplianceMatrix toEntity(RegulatoryComplianceMatrixDTO dto);

    // Mapping to Pojo
    RegulatoryComplianceMatrixPojo toPojo(RegulatoryComplianceMatrix entity);

    // Update Entity from DTO
    void updateEntityFromDTO(RegulatoryComplianceMatrixDTO dto, @MappingTarget RegulatoryComplianceMatrix entity);
}
