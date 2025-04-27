package tz.go.psssf.risk.bcm.pojo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BcmResourceAcquisitionPojo {
    private String id;
    private String resource;
    private int qtyNeeded;
    private int qtyAvailable;
    private int qtyToGet;
    private String source;
    private boolean done;
}
