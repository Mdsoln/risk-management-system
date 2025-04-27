package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.MeasurementDTO;
import tz.go.psssf.risk.entity.Measurement;
import tz.go.psssf.risk.pojo.MeasurementPojo;

@Mapper(componentModel = "cdi")
public interface MeasurementMapper {
    MeasurementMapper INSTANCE = Mappers.getMapper(MeasurementMapper.class);

    MeasurementDTO toDTO(Measurement measurement);

    Measurement toEntity(MeasurementDTO measurementDTO);

    void updateEntityFromDTO(MeasurementDTO dto, @MappingTarget Measurement entity);

    MeasurementPojo toPojo(Measurement entity);

    Measurement toEntity(MeasurementPojo pojo);

    void updateEntityFromPojo(MeasurementPojo pojo, @MappingTarget Measurement entity);
}
