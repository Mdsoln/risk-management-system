package tz.go.psssf.risk.seeder;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.UserType;
import tz.go.psssf.risk.repository.UserTypeRepository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@ApplicationScoped
public class UserTypeSeeder {

    @Inject
    UserTypeRepository userTypeRepository;

    @Transactional
    public void seed() {
        ObjectMapper mapper = new ObjectMapper();
        
        try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                .getResourceAsStream("data/user-type-seed-data.json")) {

            if (inputStream == null) {
                throw new IOException("File user-type-seed-data.json not found");
            }

            List<UserType> userTypes = mapper.readValue(inputStream,
                    mapper.getTypeFactory().constructCollectionType(List.class, UserType.class));

            for (UserType userType : userTypes) {
                UserType existingUserType = userTypeRepository.find("code", userType.getCode()).firstResult();
                if (existingUserType != null) {
                    userType.setId(existingUserType.getId());
                    userTypeRepository.getEntityManager().merge(userType);
                } else {
                    userTypeRepository.persist(userType);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
