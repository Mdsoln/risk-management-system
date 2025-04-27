package tz.go.psssf.risk.seeder;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.Permission;
import tz.go.psssf.risk.entity.Role;
import tz.go.psssf.risk.entity.User;
import tz.go.psssf.risk.entity.UserType;
import tz.go.psssf.risk.repository.PermissionRepository;
import tz.go.psssf.risk.repository.RoleRepository;
import tz.go.psssf.risk.repository.UserRepository;
import tz.go.psssf.risk.repository.UserTypeRepository;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class RoleAndPermissionsSeeder {

    @Inject
    RoleRepository roleRepository;

    @Inject
    PermissionRepository permissionRepository;

    @Inject
    UserRepository userRepository;

    @Inject
    UserTypeRepository userTypeRepository;

    @Transactional
    public void seed() {
        ObjectMapper mapper = new ObjectMapper();

        try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                .getResourceAsStream("data/role-and-permission-seed-data.json")) {

            if (inputStream == null) {
                throw new IOException("File role-and-permission-seed-data.json not found");
            }

            List<Role> roles = mapper.readValue(inputStream,
                    mapper.getTypeFactory().constructCollectionType(List.class, Role.class));

            for (Role role : roles) {
                // Step 1: Persist all permissions associated with the role
                Set<Permission> persistedPermissions = new HashSet<>();
                for (Permission permission : role.getPermissions()) {
                    Permission existingPermission = permissionRepository.find("code", permission.getCode()).firstResult();
                    if (existingPermission != null) {
                        persistedPermissions.add(existingPermission);
                    } else {
                        permissionRepository.persist(permission);
                        persistedPermissions.add(permission);
                    }
                }
                role.setPermissions(persistedPermissions);

                // Step 2: Persist the role
                Role existingRole = roleRepository.find("code", role.getCode()).firstResult();
                if (existingRole != null) {
                    role.setId(existingRole.getId());
                    roleRepository.getEntityManager().merge(role);
                } else {
                    roleRepository.persist(role);
                }
            }

            // Step 3: Assign roles to users based on UserType
            assignRolesToUsers();

            System.out.println("Role and Permissions seeding completed successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void assignRolesToUsers() {
        // Iterate through all roles
        List<Role> allRoles = roleRepository.listAll();
        for (Role role : allRoles) {
            // Retrieve the corresponding UserType
            UserType userType = userTypeRepository.find("code", role.getCode()).firstResult();
            if (userType != null) {
                // Assign this role to all users with this UserType
                List<User> users = userRepository.find("userType", userType).list();
                for (User user : users) {
                    user.getRoles().add(role);
                    userRepository.getEntityManager().merge(user);
                }
            } else {
                System.out.println("No UserType found for Role code: " + role.getCode());
            }
        }
    }
}
