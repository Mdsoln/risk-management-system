package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.RiskCauseDTO;
import tz.go.psssf.risk.entity.RiskCause;
import tz.go.psssf.risk.pojo.RiskCausePojo;

@Mapper(componentModel = "jakarta", uses = {RiskMapper.class})
public interface RiskCauseMapper {
    RiskCauseMapper INSTANCE = Mappers.getMapper(RiskCauseMapper.class);

    @Mapping(source = "risk.id", target = "riskId")
    RiskCauseDTO toDTO(RiskCause riskCause);

    @Mapping(source = "riskId", target = "risk.id")
    RiskCause toEntity(RiskCauseDTO riskCauseDTO);

    void updateEntityFromDTO(RiskCauseDTO dto, @MappingTarget RiskCause entity);

    @Mapping(source = "risk.id", target = "riskId")
    RiskCausePojo toPojo(RiskCause entity);

    @Mapping(source = "riskId", target = "risk.id")
    RiskCause toEntity(RiskCausePojo pojo);

    void updateEntityFromPojo(RiskCausePojo pojo, @MappingTarget RiskCause entity);
}
