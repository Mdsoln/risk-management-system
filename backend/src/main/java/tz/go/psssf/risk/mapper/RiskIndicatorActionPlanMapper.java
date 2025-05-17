package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.RiskIndicatorActionPlanDTO;
import tz.go.psssf.risk.entity.RiskIndicatorActionPlan;
import tz.go.psssf.risk.pojo.RiskIndicatorActionPlanPojo;

@Mapper(componentModel = "jakarta", uses = {
    DepartmentMapper.class,
    RiskIndicatorMapper.class,
    RiskIndicatorActionPlanMonitoringMapper.class // Include the Monitoring Mapper
})
public interface RiskIndicatorActionPlanMapper {
    RiskIndicatorActionPlanMapper INSTANCE = Mappers.getMapper(RiskIndicatorActionPlanMapper.class);

    @Mapping(target = "departmentId", source = "department.id")
    @Mapping(target = "riskIndicatorId", source = "riskIndicator.id")
    RiskIndicatorActionPlanDTO toDTO(RiskIndicatorActionPlan riskIndicatorActionPlan);

    @Mapping(target = "department.id", source = "departmentId")
    @Mapping(target = "riskIndicator.id", source = "riskIndicatorId")
    RiskIndicatorActionPlan toEntity(RiskIndicatorActionPlanDTO riskIndicatorActionPlanDTO);

    @Mapping(target = "riskIndicatorActionPlanMonitoring", source = "riskIndicatorActionPlanMonitoring") // Map the monitoring list
    RiskIndicatorActionPlanPojo toPojo(RiskIndicatorActionPlan entity);

    @Mapping(target = "riskIndicatorActionPlanMonitoring", source = "riskIndicatorActionPlanMonitoring") // Map the monitoring list
    RiskIndicatorActionPlan toEntity(RiskIndicatorActionPlanPojo pojo);

    void updateEntityFromPojo(RiskIndicatorActionPlanPojo pojo, @MappingTarget RiskIndicatorActionPlan entity);

    void updateEntityFromDTO(RiskIndicatorActionPlanDTO dto, @MappingTarget RiskIndicatorActionPlan entity);
}
