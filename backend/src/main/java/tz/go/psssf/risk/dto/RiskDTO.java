package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
public class RiskDTO {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 20, message = "Name must be at least 20 characters long")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    private String name;
    
    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 100, message = "Description must be at least 100 characters long")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;
    
    @NotNull(message = "Risk Area cannot be null")
    @NotBlank(message = "Risk Area cannot be blank")
    @Size(max = 255, message = "Risk Area cannot exceed 255 characters")
    private String riskAreaId;
    
    @NotNull(message = "Department cannot be null")
    @NotBlank(message = "Department cannot be blank")
    @Size(max = 255, message = "Department cannot exceed 255 characters")
    private String departmentId;
    
    @NotNull(message = "Business Process cannot be null")
    @NotBlank(message = "Business Process cannot be blank")
    private String businessProcessId;
    
    @NotNull(message = "Inherent Risk Likelihood cannot be null")
    @NotBlank(message = "Inherent Risk Likelihood cannot be blank")
    private String inherentRiskLikelihoodId;
    
    @NotNull(message = "Residual Risk Likelihood cannot be null")
    @NotBlank(message = "Residual Risk Likelihood cannot be blank")
    private String residualRiskLikelihoodId;
    
    @NotNull(message = "Inherent Risk Impact cannot be null")
    @NotBlank(message = "Inherent Risk Impact cannot be blank")
    private String inherentRiskImpactId;
    
    @NotNull(message = "Residual Risk Impact cannot be null")
    @NotBlank(message = "Residual Risk Impact cannot be blank")
    private String residualRiskImpactId;
    
    private List<RiskIndicatorDTO> riskIndicators;
    private List<RiskControlDTO> riskControls;

    private List<RiskCauseDTO> riskCauses;
    private List<RiskOpportunityDTO> riskOpportunities;
    
    private List<RiskActionPlanDTO> riskActionPlans;
}
