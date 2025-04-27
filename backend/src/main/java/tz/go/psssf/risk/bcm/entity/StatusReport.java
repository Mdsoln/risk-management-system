package tz.go.psssf.risk.bcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import tz.go.psssf.risk.entity.Department;

@Getter
@Setter
@Entity
@Table(name = "bcm_status_report")
public class StatusReport extends BaseEntity {


    
    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false) // Changed from business_unit
    private Department department; // Updated from businessUnit

    @Column(name = "report_date", nullable = false)
    private String reportDate;

    @Column(name = "report_time", nullable = false)
    private String reportTime;

    @Column(name = "staff", columnDefinition = "TEXT")
    private String staff;

    @Column(name = "customers", columnDefinition = "TEXT")
    private String customers;

    @Column(name = "work_in_progress", columnDefinition = "TEXT")
    private String workInProgress;

    @Column(name = "financial_impact", columnDefinition = "TEXT")
    private String financialImpact;

    @Column(name = "operating_conditions", columnDefinition = "TEXT")
    private String operatingConditions;
}
