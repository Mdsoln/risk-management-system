

package tz.go.psssf.risk.compliance.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.compliance.dto.ComplianceDocumentCategoryDTO;
import tz.go.psssf.risk.compliance.entity.ComplianceDocumentCategory;
import tz.go.psssf.risk.compliance.pojo.ComplianceDocumentCategoryPojo;

//@Mapper(componentModel = "cdi")
//public interface ComplianceDocumentCategoryMapper {
//
//    ComplianceDocumentCategoryPojo toPojo(ComplianceDocumentCategory entity);
//
//    ComplianceDocumentCategory toEntity(ComplianceDocumentCategoryDTO dto);
//
//    // ADD THIS METHOD
//    void updateEntityFromDTO(ComplianceDocumentCategoryDTO dto, @MappingTarget ComplianceDocumentCategory entity);
//}

@Mapper(componentModel = "cdi")
public interface ComplianceDocumentCategoryMapper {

    ComplianceDocumentCategoryPojo toPojo(ComplianceDocumentCategory entity);

    ComplianceDocumentCategory toEntity(ComplianceDocumentCategoryDTO dto);

    // Fix update mapping to ignore 'documents' field
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "id", ignore = true) // Ignore ID mapping to prevent override
    void updateEntityFromDTO(ComplianceDocumentCategoryDTO dto, @MappingTarget ComplianceDocumentCategory entity);
}

