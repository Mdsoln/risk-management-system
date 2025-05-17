package tz.go.psssf.risk.bcm.mapper;


import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmImpactAssessmentDTO;
import tz.go.psssf.risk.bcm.entity.BcmImpactAssessment;
import tz.go.psssf.risk.bcm.pojo.BcmImpactAssessmentPojo;

@Mapper(componentModel = "jakarta")
public interface BcmImpactAssessmentMapper {

    BcmImpactAssessmentDTO toDTO(BcmImpactAssessment impactAssessment);

    BcmImpactAssessment toEntity(BcmImpactAssessmentDTO dto);

    BcmImpactAssessmentPojo toPojo(BcmImpactAssessment impactAssessment);

    // Update Method
    void updateEntityFromDTO(BcmImpactAssessmentDTO dto, @MappingTarget BcmImpactAssessment entity);
}

