
package tz.go.psssf.risk.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.entity.StatusType;


@ApplicationScoped
public class StatusTypeRepository implements PanacheRepositoryBase<StatusType, String> {
}