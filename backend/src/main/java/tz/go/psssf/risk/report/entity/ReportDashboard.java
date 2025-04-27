package tz.go.psssf.risk.report.entity;

import java.util.Map;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
//import tz.go.psssf.risk.helper.JsonConverter;

@Getter
@Setter
@Entity
@Table(name = "report_dashboard")
public class ReportDashboard extends BaseEntity {

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "code", nullable = false, length = 255, unique = true)
    private String code;

    @Column(name = "payload", columnDefinition = "TEXT")
    private String payload; 
    
 
}