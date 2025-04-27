package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tz.go.psssf.risk.dto.LikelihoodDTO;
import tz.go.psssf.risk.entity.Likelihood;
import tz.go.psssf.risk.pojo.LikelihoodPojo;

@Mapper(componentModel = "cdi")
public interface LikelihoodMapper {
    LikelihoodMapper INSTANCE = Mappers.getMapper(LikelihoodMapper.class);

    LikelihoodDTO toDTO(Likelihood likelihood);

    Likelihood toEntity(LikelihoodDTO likelihoodDTO);

    void updateEntityFromDTO(LikelihoodDTO dto, @MappingTarget Likelihood entity);

    LikelihoodPojo toPojo(Likelihood entity);

    Likelihood toEntity(LikelihoodPojo pojo);

    void updateEntityFromPojo(LikelihoodPojo pojo, @MappingTarget Likelihood entity);
}
