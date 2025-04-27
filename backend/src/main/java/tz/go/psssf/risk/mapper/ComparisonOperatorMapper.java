package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import tz.go.psssf.risk.dto.ComparisonOperatorDTO;
import tz.go.psssf.risk.entity.ComparisonOperator;
import tz.go.psssf.risk.pojo.ComparisonOperatorPojo;

@Mapper(componentModel = "cdi")
public interface ComparisonOperatorMapper {

    ComparisonOperatorDTO toDTO(ComparisonOperator comparisonOperator);

    ComparisonOperator toEntity(ComparisonOperatorDTO comparisonOperatorDTO);

    void updateEntityFromDTO(ComparisonOperatorDTO dto, @MappingTarget ComparisonOperator entity);

    ComparisonOperatorPojo toPojo(ComparisonOperator entity);

    ComparisonOperator toEntity(ComparisonOperatorPojo pojo);

    void updateEntityFromPojo(ComparisonOperatorPojo pojo, @MappingTarget ComparisonOperator entity);
}
