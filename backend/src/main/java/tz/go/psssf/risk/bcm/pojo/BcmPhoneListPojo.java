package tz.go.psssf.risk.bcm.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BcmPhoneListPojo {
    private String id;
    private String roleOrName;
    private int phonesRequired;
    private boolean isdAccess;
    private boolean installedOk;
    private boolean testedOk;
    private String comments;
}
