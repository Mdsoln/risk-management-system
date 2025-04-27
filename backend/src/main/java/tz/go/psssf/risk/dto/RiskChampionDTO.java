//package tz.go.psssf.risk.dto;
//
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class RiskChampionDTO {
//    private String championName;
//    private String championEmail;
//    private String championPhone;
//    private String departmentOwnerId;
//    private String nin; 
//}
package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class RiskChampionDTO {

    @NotNull
    private String userId;

    @NotNull
    private String departmentOwnerId;
}
