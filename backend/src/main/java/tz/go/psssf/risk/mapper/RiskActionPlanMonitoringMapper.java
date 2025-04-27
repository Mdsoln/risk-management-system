package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.dto.RiskActionPlanMonitoringDTO;
import tz.go.psssf.risk.entity.RiskActionPlanMonitoring;
import tz.go.psssf.risk.pojo.RiskActionPlanMonitoringPojo;

@Mapper(componentModel = "cdi", uses = {
    SimplifiedRiskActionPlanMapper.class
})
public interface RiskActionPlanMonitoringMapper {

    @Mapping(source = "riskActionPlan.id", target = "riskActionPlanId")
    RiskActionPlanMonitoringDTO toDTO(RiskActionPlanMonitoring entity);

    @Mapping(source = "riskActionPlanId", target = "riskActionPlan.id")
    RiskActionPlanMonitoring toEntity(RiskActionPlanMonitoringDTO dto);

    @Mapping(source = "riskActionPlan", target = "riskActionPlan")
    RiskActionPlanMonitoringPojo toPojo(RiskActionPlanMonitoring entity);

    @Mapping(source = "riskActionPlan", target = "riskActionPlan")
    RiskActionPlanMonitoring toEntity(RiskActionPlanMonitoringPojo pojo);

    void updateEntityFromPojo(RiskActionPlanMonitoringPojo pojo, @MappingTarget RiskActionPlanMonitoring entity);

    void updateEntityFromDTO(RiskActionPlanMonitoringDTO dto, @MappingTarget RiskActionPlanMonitoring entity);
}
