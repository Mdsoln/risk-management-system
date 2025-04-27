package tz.go.psssf.risk.bcm.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BcmBattleBoxItemPojo {
    private String id;
    private String itemName;
    private String description;
    private int quantity;
    private String location;
    private String lastUpdated;
    private String responsiblePerson;
}
