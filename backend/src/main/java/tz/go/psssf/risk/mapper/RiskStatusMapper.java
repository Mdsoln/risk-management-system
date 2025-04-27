package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.RiskStatusDTO;
import tz.go.psssf.risk.entity.RiskStatus;
import tz.go.psssf.risk.pojo.RiskStatusPojo;

@Mapper(componentModel = "cdi")
public interface RiskStatusMapper {

    RiskStatusMapper INSTANCE = Mappers.getMapper(RiskStatusMapper.class);

    RiskStatusDTO toDTO(RiskStatus riskStatus);

    RiskStatus toEntity(RiskStatusDTO riskStatusDTO);

    RiskStatusPojo toPojo(RiskStatus riskStatus);

    RiskStatus toEntity(RiskStatusPojo riskStatusPojo);

    void updateEntityFromDTO(RiskStatusDTO dto, @MappingTarget RiskStatus entity);
}
