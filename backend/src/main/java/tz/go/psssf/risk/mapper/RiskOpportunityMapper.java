package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.RiskOpportunityDTO;
import tz.go.psssf.risk.entity.RiskOpportunity;
import tz.go.psssf.risk.pojo.RiskOpportunityPojo;

@Mapper(componentModel = "jakarta", uses = {RiskMapper.class})
public interface RiskOpportunityMapper {
    RiskOpportunityMapper INSTANCE = Mappers.getMapper(RiskOpportunityMapper.class);

    @Mapping(source = "risk.id", target = "riskId")
    RiskOpportunityDTO toDTO(RiskOpportunity riskOpportunity);

    @Mapping(source = "riskId", target = "risk.id")
    RiskOpportunity toEntity(RiskOpportunityDTO riskOpportunityDTO);

    void updateEntityFromDTO(RiskOpportunityDTO dto, @MappingTarget RiskOpportunity entity);

    @Mapping(source = "risk.id", target = "riskId")
    RiskOpportunityPojo toPojo(RiskOpportunity entity);

    @Mapping(source = "riskId", target = "risk.id")
    RiskOpportunity toEntity(RiskOpportunityPojo pojo);

    void updateEntityFromPojo(RiskOpportunityPojo pojo, @MappingTarget RiskOpportunity entity);
}
