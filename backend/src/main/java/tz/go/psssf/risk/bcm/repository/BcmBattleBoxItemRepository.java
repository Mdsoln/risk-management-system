package tz.go.psssf.risk.bcm.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.bcm.entity.BcmBattleBoxItem;

@ApplicationScoped
public class BcmBattleBoxItemRepository implements PanacheRepositoryBase<BcmBattleBoxItem, String> {
}
