package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.StatusReportDTO;
import tz.go.psssf.risk.bcm.entity.StatusReport;
import tz.go.psssf.risk.bcm.pojo.StatusReportPojo;

//@Mapper(componentModel = "cdi")
//public interface StatusReportMapper {
//
//    StatusReportDTO toDTO(StatusReport statusReport);
//
//    StatusReport toEntity(StatusReportDTO dto);
//
//    StatusReportPojo toPojo(StatusReport statusReport);
//
//    // Update Method
//    void updateEntityFromDTO(StatusReportDTO dto, @MappingTarget StatusReport entity);
//}

@Mapper(componentModel = "cdi")
public interface StatusReportMapper {

    @Mapping(target = "departmentId", source = "department.id") // Map department ID
    StatusReportDTO toDTO(StatusReport statusReport);

    @Mapping(target = "department.id", source = "departmentId") // Map department ID
    StatusReport toEntity(StatusReportDTO dto);

    StatusReportPojo toPojo(StatusReport statusReport);

    void updateEntityFromDTO(StatusReportDTO dto, @MappingTarget StatusReport entity);
}
