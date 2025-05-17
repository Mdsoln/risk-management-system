package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.MonitoringFrequencyDTO;
import tz.go.psssf.risk.entity.MonitoringFrequency;
import tz.go.psssf.risk.pojo.MonitoringFrequencyPojo;

@Mapper(componentModel = "jakarta")
public interface MonitoringFrequencyMapper {
    MonitoringFrequencyMapper INSTANCE = Mappers.getMapper(MonitoringFrequencyMapper.class);

    MonitoringFrequencyDTO toDTO(MonitoringFrequency monitoringFrequency);

    MonitoringFrequency toEntity(MonitoringFrequencyDTO monitoringFrequencyDTO);

    void updateEntityFromDTO(MonitoringFrequencyDTO dto, @MappingTarget MonitoringFrequency entity);

    MonitoringFrequencyPojo toPojo(MonitoringFrequency entity);

    MonitoringFrequency toEntity(MonitoringFrequencyPojo pojo);

    void updateEntityFromPojo(MonitoringFrequencyPojo pojo, @MappingTarget MonitoringFrequency entity);
}
