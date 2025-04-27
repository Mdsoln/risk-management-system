package tz.go.psssf.risk.workflow.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import jakarta.validation.constraints.NotNull;

import tz.go.psssf.risk.entity.BaseEntity;
import tz.go.psssf.risk.entity.User;

import java.time.LocalDateTime;

@Getter
@Setter
@Audited
@Entity
@Table(name = "workflow_log")
public class WorkflowLog extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "workflow_entity_id", nullable = false)
    private WorkflowEntity workflowEntity;

    @ManyToOne
    @JoinColumn(name = "workflow_level_id", nullable = false)
    private WorkflowLevel workflowLevel;

    @ManyToOne
    @JoinColumn(name = "previous_status_id", nullable = false)
    private WorkflowStatusType previousStatus;

    @ManyToOne
    @JoinColumn(name = "new_status_id", nullable = false)
    private WorkflowStatusType newStatus;

    @NotNull(message = "User cannot be null")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;
}
