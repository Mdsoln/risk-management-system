package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmDamageAssessmentDTO;
import tz.go.psssf.risk.bcm.entity.BcmDamageAssessment;
import tz.go.psssf.risk.bcm.pojo.BcmDamageAssessmentPojo;

@Mapper(componentModel = "jakarta")
public interface BcmDamageAssessmentMapper {

    BcmDamageAssessmentDTO toDTO(BcmDamageAssessment assessment);

    BcmDamageAssessment toEntity(BcmDamageAssessmentDTO dto);

    BcmDamageAssessmentPojo toPojo(BcmDamageAssessment assessment);

    // Update Method
    void updateEntityFromDTO(BcmDamageAssessmentDTO dto, @MappingTarget BcmDamageAssessment entity);
}
