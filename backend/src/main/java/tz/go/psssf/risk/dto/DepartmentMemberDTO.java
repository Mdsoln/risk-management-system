package tz.go.psssf.risk.dto;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class DepartmentMemberDTO {

    @NotNull
    private String userId;

    @NotNull
    private String departmentOwnerId;
}
