package tz.go.psssf.risk.entity;

import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.helper.RiskCalculationHelper;
import tz.go.psssf.risk.report.event.listener.RiskEntityListener;

import org.hibernate.annotations.FilterDef;
import org.hibernate.envers.Audited;

import com.google.gson.annotations.Expose;

import jakarta.inject.Inject;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.ParamDef;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Audited
@Entity
@Table(name = "risk")
@EntityListeners(RiskEntityListener.class) 
@FilterDef(name = "activeFilter", parameters = @ParamDef(name = "status", type = String.class))
public class Risk extends BaseEntity {

	
    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 20, message = "Name must be at least 20 characters long")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 100, message = "Description must be at least 100 characters long")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @OneToOne(mappedBy = "risk", cascade = CascadeType.ALL, orphanRemoval = true)
    private RiskAssessmentStatus riskAssessmentStatus;

    @ManyToOne
    @JoinColumn(name = "risk_area_id", nullable = false)
    private RiskArea riskArea;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @ManyToOne
    @JoinColumn(name = "business_process_id", nullable = false)
    private BusinessProcess businessProcess;

    @ManyToOne
    @JoinColumn(name = "inherent_risk_id", nullable = false)
    private InherentRisk inherentRisk;

    @ManyToOne
    @JoinColumn(name = "residual_risk_id", nullable = false)
    private ResidualRisk residualRisk;

    @OneToMany(mappedBy = "risk")
    @Filter(name = "activeFilter", condition = "status = :status")
    private List<RiskIndicator> riskIndicators = new ArrayList<>();

    @OneToMany(mappedBy = "risk")
    @Filter(name = "activeFilter", condition = "status = :status")
    private List<RiskControl> riskControls = new ArrayList<>();

    @OneToMany(mappedBy = "risk")
    private List<RiskCause> riskCauses = new ArrayList<>();

    @OneToMany(mappedBy = "risk")
    private List<RiskOpportunity> riskOpportunities = new ArrayList<>();
    
    @OneToMany(mappedBy = "risk")
    @Filter(name = "activeFilter", condition = "status = :status")
    private List<RiskActionPlan> riskActionPlans = new ArrayList<>();

    @Transient
    private RiskCalculationHelper.RiskMatrixResult riskMatrixResult;

    @Transient
    private RiskCalculationHelper.RiskMatrixResult inherentRiskMatrixResult;

    @Transient
    private RiskCalculationHelper.RiskMatrixResult residualRiskMatrixResult;

    @PostLoad
    public void calculateRiskMatrices() {
        this.inherentRiskMatrixResult = RiskCalculationHelper.calculateInherentRiskMatrix(this);
        this.residualRiskMatrixResult = RiskCalculationHelper.calculateResidualRiskMatrix(this);
    }

    public void setRiskAssessmentStatus(RiskAssessmentStatus riskAssessmentStatus) {
        this.riskAssessmentStatus = riskAssessmentStatus;
        if (riskAssessmentStatus != null && riskAssessmentStatus.getRisk() != this) {
            riskAssessmentStatus.setRisk(this, false);
        }
    }
    
   
}
