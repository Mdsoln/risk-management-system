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
@Table(name = "workflow_level")
public class WorkflowLevel extends BaseEntity {

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Level cannot be null")
    @Column(name = "level")
    private int level;

    @ManyToOne
    @JoinColumn(name = "workflow_id", nullable = false)
    private Workflow workflow;

    @ManyToOne
    @JoinColumn(name = "next_level_id")
    private WorkflowLevel nextLevel;

    @ManyToOne
    @JoinColumn(name = "return_level_id")
    private WorkflowLevel returnLevel;

    @NotNull(message = "isFinal cannot be null")
    @Column(name = "is_final")
    private boolean isFinal;
}
