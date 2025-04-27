package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.ThresholdCategoryDTO;
import tz.go.psssf.risk.entity.ThresholdCategory;
import tz.go.psssf.risk.pojo.ThresholdCategoryPojo;

@Mapper(componentModel = "cdi")
public interface ThresholdCategoryMapper {
    ThresholdCategoryMapper INSTANCE = Mappers.getMapper(ThresholdCategoryMapper.class);

    ThresholdCategoryDTO toDTO(ThresholdCategory thresholdCategory);

    ThresholdCategory toEntity(ThresholdCategoryDTO thresholdCategoryDTO);

    void updateEntityFromDTO(ThresholdCategoryDTO dto, @MappingTarget ThresholdCategory entity);

    ThresholdCategoryPojo toPojo(ThresholdCategory entity);

    ThresholdCategory toEntity(ThresholdCategoryPojo pojo);

    void updateEntityFromPojo(ThresholdCategoryPojo pojo, @MappingTarget ThresholdCategory entity);
}
