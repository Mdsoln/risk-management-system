package tz.go.psssf.risk.mapper;
import org.mapstruct.Mapper;
import tz.go.psssf.risk.entity.Risk;
import tz.go.psssf.risk.pojo.SimplifiedListRiskPojo;

@Mapper(componentModel = "cdi")
public interface SimplifiedListRiskMapper {
    SimplifiedListRiskPojo toPojo(Risk risk);
}
