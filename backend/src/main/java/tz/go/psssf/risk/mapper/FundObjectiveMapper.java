package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.FundObjectiveDTO;
import tz.go.psssf.risk.entity.FundObjective;
import tz.go.psssf.risk.pojo.FundObjectivePojo;

@Mapper(componentModel = "jakarta", uses = {BusinessProcessMapper.class, DepartmentMapper.class})
public interface FundObjectiveMapper {
    FundObjectiveMapper INSTANCE = Mappers.getMapper(FundObjectiveMapper.class);

    FundObjectiveDTO toDTO(FundObjective fundObjective);

    FundObjective toEntity(FundObjectiveDTO fundObjectiveDTO);

    void updateEntityFromDTO(FundObjectiveDTO dto, @MappingTarget FundObjective entity);

    FundObjectivePojo toPojo(FundObjective entity);

    FundObjective toEntity(FundObjectivePojo pojo);

    void updateEntityFromPojo(FundObjectivePojo pojo, @MappingTarget FundObjective entity);
}
