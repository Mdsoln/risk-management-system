package tz.go.psssf.risk.bcm.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BcmUrgentResourcePojo {
    private String id;
    private String resourceName;
    private String description;
    private int quantity;
    private String category;
    private String location;
    private String responsiblePerson;
    private String contactNumber;
}
