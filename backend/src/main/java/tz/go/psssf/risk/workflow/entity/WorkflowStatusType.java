package tz.go.psssf.risk.workflow.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;

import org.hibernate.envers.Audited;

@Getter
@Setter
@Audited
@Entity
@Table(name = "workflow_status_type")
public class WorkflowStatusType extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Code cannot be null")
    @NotBlank(message = "Code cannot be blank")
    @Size(max = 50, message = "Code cannot exceed 50 characters")
    @Column(name = "code", unique = true)
    private String code;

    @NotNull(message = "Color cannot be null")
    @NotBlank(message = "Color cannot be blank")
    @Size(max = 7, message = "Color code cannot exceed 7 characters")
    @Column(name = "color")
    private String color;

    @ManyToOne
    @JoinColumn(name = "workflow_id", nullable = false)
    private Workflow workflow;
}
