package tz.go.psssf.risk.workflow.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;

import org.hibernate.envers.Audited;

import java.time.LocalDateTime;

@Getter
@Setter
@Audited
@Entity
@Table(name = "workflow_entity")
public class WorkflowEntity extends BaseEntity {

    @Column(name = "entity_id", nullable = false)
    private Long entityId;

    @ManyToOne
    @JoinColumn(name = "workflow_id", nullable = false)
    private Workflow workflow;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
