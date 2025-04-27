package tz.go.psssf.risk.workflow.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tz.go.psssf.risk.entity.BaseEntity;

import java.time.LocalDateTime;

import org.hibernate.envers.Audited;

@Getter
@Setter
@Audited
@Entity
@Table(name = "workflow_status")
public class WorkflowStatus extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "workflow_entity_id", nullable = false)
    private WorkflowEntity workflowEntity;

    @ManyToOne
    @JoinColumn(name = "workflow_status_type_id", nullable = false)
    private WorkflowStatusType workflowStatusType;

    @Column(name = "is_current", nullable = false)
    private boolean isCurrent;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
