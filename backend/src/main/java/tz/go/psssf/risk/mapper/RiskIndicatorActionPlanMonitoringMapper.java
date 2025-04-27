package tz.go.psssf.risk.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.RiskIndicatorActionPlanMonitoringDTO;
import tz.go.psssf.risk.entity.RiskIndicatorActionPlanMonitoring;
import tz.go.psssf.risk.pojo.RiskIndicatorActionPlanMonitoringPojo;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "cdi", uses = {
    MeasurementMapper.class // Include the Measurement Mapper
})
public interface RiskIndicatorActionPlanMonitoringMapper {
    RiskIndicatorActionPlanMonitoringMapper INSTANCE = Mappers.getMapper(RiskIndicatorActionPlanMonitoringMapper.class);

    DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSS");

    @Mapping(target = "measurementId", source = "measurement.id")
    @Mapping(target = "startDatetime", expression = "java(fromDateTimeToString(entity.getStartDatetime()))")
    @Mapping(target = "endDatetime", expression = "java(fromDateTimeToString(entity.getEndDatetime()))")
    @Mapping(target = "riskIndicatorActionPlanId", source = "riskIndicatorActionPlan.id") // Map the parent ID
    RiskIndicatorActionPlanMonitoringDTO toDTO(RiskIndicatorActionPlanMonitoring entity);

    @Mapping(target = "measurement.id", source = "measurementId")
    @Mapping(target = "startDatetime", expression = "java(fromStringToDateTime(dto.getStartDatetime()))")
    @Mapping(target = "endDatetime", expression = "java(fromStringToDateTime(dto.getEndDatetime()))")
    @Mapping(target = "riskIndicatorActionPlan.id", source = "riskIndicatorActionPlanId") // Map the parent ID
    RiskIndicatorActionPlanMonitoring toEntity(RiskIndicatorActionPlanMonitoringDTO dto);

    @Mapping(target = "measurement", source = "measurement")
    RiskIndicatorActionPlanMonitoringPojo toPojo(RiskIndicatorActionPlanMonitoring entity);

    RiskIndicatorActionPlanMonitoring toEntity(RiskIndicatorActionPlanMonitoringPojo pojo);

    void updateEntityFromPojo(RiskIndicatorActionPlanMonitoringPojo pojo, @MappingTarget RiskIndicatorActionPlanMonitoring entity);

    void updateEntityFromDTO(RiskIndicatorActionPlanMonitoringDTO dto, @MappingTarget RiskIndicatorActionPlanMonitoring entity);

    // Custom mapping methods for LocalDateTime
    default LocalDateTime fromStringToDateTime(String dateString) {
        return LocalDateTime.parse(dateString, FORMATTER);
    }

    default String fromDateTimeToString(LocalDateTime dateTime) {
        return dateTime.format(FORMATTER);
    }
}
