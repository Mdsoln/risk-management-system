package tz.go.psssf.risk.bcm.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;
import jakarta.validation.constraints.*;

@Getter
@Setter
@Entity
@Table(name = "bcm_sub_process")
public class BcmSubProcess extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Priority Ranking cannot be null")
    @Column(name = "priority_ranking")
    private int priorityRanking;

    @NotNull(message = "RTO cannot be null")
    @Column(name = "rto")
    private String rto;

    @NotNull(message = "RPO cannot be null")
    @Column(name = "rpo")
    private String rpo;

    @Size(max = 500, message = "Dependencies cannot exceed 500 characters")
    @Column(name = "dependencies")
    private String dependencies;

    @Size(max = 500, message = "Responsible Parties cannot exceed 500 characters")
    @Column(name = "responsible_parties")
    private String responsibleParties;

    @Size(max = 500, message = "Quantitative Impact cannot exceed 500 characters")
    @Column(name = "quantitative_impact")
    private String quantitativeImpact;

    @ManyToOne
    @JoinColumn(name = "process_id", nullable = false)
    private BcmProcess process;
}
