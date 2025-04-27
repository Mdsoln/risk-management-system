package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.entity.Department;
import tz.go.psssf.risk.entity.Role;
import tz.go.psssf.risk.entity.User;
import tz.go.psssf.risk.entity.UserType;
import tz.go.psssf.risk.repository.DepartmentRepository;
import tz.go.psssf.risk.repository.RoleRepository;
import tz.go.psssf.risk.repository.UserRepository;
import tz.go.psssf.risk.repository.UserTypeRepository;

import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.HashSet;

@ApplicationScoped
public class UserSeeder {

    @Inject
    UserRepository userRepository;

    @Inject
    DepartmentRepository departmentRepository;

    @Inject
    UserTypeRepository userTypeRepository;

    @Inject
    RoleRepository roleRepository;

    @Inject
    Logger log;

    private Random random = new Random();

    @Transactional
    public void seed() {
        List<Department> departments = departmentRepository.listAll();
        if (departments.isEmpty()) {
            log.warn("No departments found. User seeding skipped.");
            return;
        }

        for (Department department : departments) {
            generateDepartmentUsers(department);
        }

        log.info("User seeding completed successfully.");
    }

    private void generateDepartmentUsers(Department department) {
        generateUser(department, "DIRECTOR", "Director", "Smith", "Director", "Director", department.getName() + " Office", Set.of("DIRECTOR"));
        generateUser(department, "MANAGER", "Manager", "Jones", "Manager", "Manager", department.getName() + " Office", Set.of("MANAGER"));
        generateUser(department, "CHAMPION", "Champion", "Brown", "Officer", "Officer", department.getName() + " Office", Set.of("CHAMPION"));
        generateUser(department, "MEMBER", "Member", "Johnson", "Officer", "Officer", department.getName() + " Office", Set.of("MEMBER"));
    }

    private void generateUser(Department department, String userTypeCode, String firstNamePrefix, String lastNamePrefix, String jobTitle, String position, String office, Set<String> roleCodes) {
        UserType userType = userTypeRepository.find("code", userTypeCode).firstResult();
        if (userType == null) {
            log.warn("UserType with code " + userTypeCode + " not found, skipping generation for department " + department.getName());
            return;
        }

        User user = new User();
        user.setFirstName(firstNamePrefix + " " + department.getCode());
        user.setMiddleName(generateMiddleName());
        user.setLastName(lastNamePrefix);
        user.setEmail(generateUniqueEmail(firstNamePrefix, department));
        user.setMobile(generateUniqueMobile());
        user.setPhone(generatePhone());
        user.setNin(generateNin());
        user.setPassword("password123"); // Default password meeting the constraints
        user.setUserType(userType);
        user.setJobTitle(jobTitle);
        user.setPosition(position);
        user.setOffice(office);
        user.setDepartment(department);

        // Assign roles to the user based on role codes
        Set<Role> roles = new HashSet<>();
        for (String roleCode : roleCodes) {
            Role role = roleRepository.find("code", roleCode).firstResult();
            if (role != null) {
                roles.add(role);
            } else {
                log.warn("Role with code " + roleCode + " not found, skipping role assignment for user " + user.getEmail());
            }
        }
        user.setRoles(roles);

        userRepository.persist(user);
        log.info("Generated user: " + user.getFirstName() + " " + user.getLastName() + " with roles " + roleCodes + " for department: " + department.getCode());
    }

    private String generateMiddleName() {
        return "MiddleName"; // Use a static value or customize logic to generate middle names
    }

    private String generateUniqueEmail(String firstNamePrefix, Department department) {
        String email;
        do {
            email = firstNamePrefix.toLowerCase().replace(" ", ".") + "." + department.getCode().toLowerCase() + random.nextInt(1000) + "@psssf.go.tz";
        } while (userRepository.find("email", email).firstResult() != null);
        return email;
    }

    private String generateUniqueMobile() {
        String mobile;
        do {
            mobile = "+2557" + (100000000 + random.nextInt(900000000));
        } while (userRepository.find("mobile", mobile).firstResult() != null);
        return mobile;
    }

    private String generatePhone() {
        return "+255700000000"; // Static phone value or generate similarly to mobile
    }

    private String generateNin() {
        StringBuilder ninBuilder = new StringBuilder();
        while (ninBuilder.length() < 20) {
            ninBuilder.append(random.nextInt(10));
        }
        return ninBuilder.toString();
    }
}
