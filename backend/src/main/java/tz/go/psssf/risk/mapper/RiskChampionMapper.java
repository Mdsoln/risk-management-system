//package tz.go.psssf.risk.mapper;
//
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//import org.mapstruct.MappingTarget;
//import org.mapstruct.factory.Mappers;
//import tz.go.psssf.risk.dto.RiskChampionDTO;
//import tz.go.psssf.risk.entity.RiskChampion;
//import tz.go.psssf.risk.pojo.RiskChampionPojo;
//
//@Mapper(componentModel = "cdi", uses = {DepartmentOwnerMapper.class})
//public interface RiskChampionMapper {
//    RiskChampionMapper INSTANCE = Mappers.getMapper(RiskChampionMapper.class);
//
//    @Mapping(target = "departmentOwnerId", source = "departmentOwner.id")
//    RiskChampionDTO toDTO(RiskChampion riskChampion);
//
//    @Mapping(target = "departmentOwner.id", source = "departmentOwnerId")
//    RiskChampion toEntity(RiskChampionDTO riskChampionDTO);
//
//    void updateEntityFromDTO(RiskChampionDTO dto, @MappingTarget RiskChampion entity);
//
//    @Mapping(target = "departmentOwner", source = "departmentOwner")
//    RiskChampionPojo toPojo(RiskChampion entity);
//
//    @Mapping(target = "departmentOwner", source = "departmentOwner")
//    RiskChampion toEntity(RiskChampionPojo pojo);
//
//    void updateEntityFromPojo(RiskChampionPojo pojo, @MappingTarget RiskChampion entity);
//}



package tz.go.psssf.risk.mapper;

import org.mapstruct.*;

import jakarta.inject.Inject;
import tz.go.psssf.risk.dto.RiskChampionDTO;
import tz.go.psssf.risk.entity.RiskChampion;
import tz.go.psssf.risk.entity.User;
import tz.go.psssf.risk.pojo.RiskChampionPojo;
import tz.go.psssf.risk.repository.UserRepository;

@Mapper(componentModel = "cdi", uses = {UserMapper.class})
public abstract class RiskChampionMapper {

    @Inject
    UserRepository userRepository;

    @Mapping(target = "user", source = "userId", qualifiedByName = "mapUserIdToUser")
    public abstract RiskChampion toEntity(RiskChampionDTO dto);

    public abstract RiskChampionDTO toDTO(RiskChampion entity);

    public abstract RiskChampionPojo toPojo(RiskChampion entity);

    @Mapping(target = "user", source = "userId", qualifiedByName = "mapUserIdToUser")
    public abstract void updateEntityFromDTO(RiskChampionDTO dto, @MappingTarget RiskChampion entity);

    @Named("mapUserIdToUser")
    protected User mapUserIdToUser(String userId) {
        return userRepository.findById(userId);
    }
}



