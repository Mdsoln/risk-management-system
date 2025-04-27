package tz.go.psssf.risk.helper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import tz.go.psssf.risk.entity.RiskChampion;
import tz.go.psssf.risk.entity.RiskOwner;
import tz.go.psssf.risk.entity.User;
import tz.go.psssf.risk.repository.RiskChampionRepository;
import tz.go.psssf.risk.repository.RiskOwnerRepository;
import tz.go.psssf.risk.repository.UserRepository;

@ApplicationScoped
public class LoggedInUserHelper {

    @Inject
    RiskChampionRepository riskChampionRepository;

    @Inject
    RiskOwnerRepository riskOwnerRepository;
    
    @Inject
    UserRepository userRepository;
    
    public User getLoggedInUser() {
        // For testing purposes, return a User from Users NIN ""20199243768825047518""
    	User userObj =  userRepository.find("nin", "20199243768825047518").firstResult();
    	System.out.println("########### userObj: "+ userObj.getNin());

        return userObj;
    }

    public RiskChampion getLoggedInRiskChampion() {
        // For testing purposes, return a RiskChampion from department code "D6"
        return riskChampionRepository.find("departmentOwner.departmentDirector.department.code", "D6").firstResult();
    }

//    public RiskOwner getLoggedInRiskOwner() {
//        // For testing purposes, return a DepartmentOwner from department code "D6"
//        return departmentOwnerRepository.find("departmentDirector.department.code", "D6").firstResult();
//    }
}
