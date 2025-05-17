package tz.go.psssf.risk.bcm.mapper;

import org.mapstruct.*;
import tz.go.psssf.risk.bcm.dto.BcmBattleBoxItemDTO;
import tz.go.psssf.risk.bcm.entity.BcmBattleBoxItem;
import tz.go.psssf.risk.bcm.pojo.BcmBattleBoxItemPojo;

@Mapper(componentModel = "jakarta")
public interface BcmBattleBoxItemMapper {

    BcmBattleBoxItemDTO toDTO(BcmBattleBoxItem item);

    BcmBattleBoxItem toEntity(BcmBattleBoxItemDTO dto);

    BcmBattleBoxItemPojo toPojo(BcmBattleBoxItem item);

    // Update Method
    void updateEntityFromDTO(BcmBattleBoxItemDTO dto, @MappingTarget BcmBattleBoxItem entity);
}
