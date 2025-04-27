package tz.go.psssf.risk.compliance.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.compliance.entity.*;
import tz.go.psssf.risk.compliance.pojo.*;


@Mapper(componentModel = "cdi")
public interface SimplifiedComplianceEntityMapper {
    SimplifiedComplianceEntityPojo toPojo(ComplianceEntity entity);
}
