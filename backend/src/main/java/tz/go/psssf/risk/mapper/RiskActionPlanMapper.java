package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.dto.RiskActionPlanDTO;
import tz.go.psssf.risk.entity.RiskActionPlan;
import tz.go.psssf.risk.entity.RiskActionPlanMonitoring;
import tz.go.psssf.risk.pojo.RiskActionPlanPojo;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "jakarta", uses = {
    RiskActionPlanMonitoringMapper.class
})
public interface RiskActionPlanMapper {

    @Mapping(source = "riskId", target = "risk.id")
    @Mapping(target = "riskActionPlanMonitoring", ignore = true)
    RiskActionPlan toEntity(RiskActionPlanDTO riskActionPlanDTO);

    @AfterMapping
    default void linkRiskActionPlanMonitoring(@MappingTarget RiskActionPlan riskActionPlan, RiskActionPlanDTO riskActionPlanDTO) {
        if (riskActionPlanDTO.getRiskActionPlanMonitoring() != null) {
            List<RiskActionPlanMonitoring> monitoringList = riskActionPlanDTO.getRiskActionPlanMonitoring().stream()
                .map(monitoringDTO -> {
                    RiskActionPlanMonitoring monitoring = new RiskActionPlanMonitoring();
                    monitoring.setComment(monitoringDTO.getComment());
                    monitoring.setMonitoringDatetime(monitoringDTO.getMonitoringDatetime());
                    monitoring.setRiskActionPlan(riskActionPlan);
                    return monitoring;
                }).collect(Collectors.toList());

            riskActionPlan.setRiskActionPlanMonitoring(monitoringList);
        }
    }

    @Mapping(source = "risk.id", target = "riskId")
    RiskActionPlanDTO toDTO(RiskActionPlan riskActionPlan);

    void updateEntityFromDTO(RiskActionPlanDTO dto, @MappingTarget RiskActionPlan entity);

    @Mapping(source = "risk", target = "risk")
    RiskActionPlanPojo toPojo(RiskActionPlan entity);

    @Mapping(source = "risk", target = "risk")
    RiskActionPlan toEntity(RiskActionPlanPojo pojo);

    void updateEntityFromPojo(RiskActionPlanPojo pojo, @MappingTarget RiskActionPlan entity);
}
