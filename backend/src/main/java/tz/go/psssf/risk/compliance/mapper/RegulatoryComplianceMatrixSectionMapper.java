package tz.go.psssf.risk.compliance.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.compliance.dto.RegulatoryComplianceMatrixSectionDTO;
import tz.go.psssf.risk.compliance.entity.RegulatoryComplianceMatrixSection;
import tz.go.psssf.risk.compliance.pojo.RegulatoryComplianceMatrixSectionPojo;

@Mapper(componentModel = "cdi")
public interface RegulatoryComplianceMatrixSectionMapper {

    // Mapping to DTO
    @Mapping(target = "complianceStatusId", source = "complianceStatus.id")
    @Mapping(target = "matrixId", source = "regulatoryComplianceMatrix.id") // <-- Add this mapping
    RegulatoryComplianceMatrixSectionDTO toDTO(RegulatoryComplianceMatrixSection entity);

    // Mapping from DTO to Entity
    @Mapping(target = "complianceStatus.id", source = "complianceStatusId")
    @Mapping(target = "regulatoryComplianceMatrix.id", source = "matrixId") // <-- Add this mapping
    RegulatoryComplianceMatrixSection toEntity(RegulatoryComplianceMatrixSectionDTO dto);

    // Mapping to Pojo
    RegulatoryComplianceMatrixSectionPojo toPojo(RegulatoryComplianceMatrixSection entity);

    // Update Entity from DTO
    @Mapping(target = "regulatoryComplianceMatrix.id", source = "matrixId") // <-- Add this mapping
    void updateEntityFromDTO(RegulatoryComplianceMatrixSectionDTO dto, @MappingTarget RegulatoryComplianceMatrixSection entity);
}

