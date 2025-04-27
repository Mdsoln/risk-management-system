package tz.go.psssf.risk.seeder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.entity.Department;
import tz.go.psssf.risk.entity.Directorate;
import tz.go.psssf.risk.repository.DepartmentRepository;
import tz.go.psssf.risk.repository.DirectorateRepository;

import java.io.IOException;
import java.io.InputStream;

@ApplicationScoped
public class DepartmentSeeder {

    @Inject
    DepartmentRepository departmentRepository;

    @Inject
    DirectorateRepository directorateRepository;

    @Inject
    Logger log;

    @Transactional
    public void seed() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule()); // Register the JavaTimeModule for LocalDateTime

        try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                .getResourceAsStream("data/department-seed-data.json")) {

            if (inputStream == null) {
                throw new IOException("File department-seed-data.json not found");
            }

            JsonNode rootNode = mapper.readTree(inputStream);

            for (JsonNode departmentNode : rootNode) {
                // Extract the directorate code from the JSON
                String directorateCode = departmentNode.get("directorateCode").asText();
                
                // Find the corresponding Directorate entity using the directorate code
                Directorate directorate = directorateRepository.find("code", directorateCode).firstResult();
                
                if (directorate == null) {
                    throw new IllegalArgumentException("Directorate with code " + directorateCode + " not found.");
                }

                // Remove the directorateCode field from the JSON node before conversion
                ((ObjectNode) departmentNode).remove("directorateCode");

                // Convert the remaining JSON node to a Department entity
                Department department = mapper.convertValue(departmentNode, Department.class);
                
                // Manually set the directorate in the Department entity
                department.setDirectorate(directorate);

                // Generate department code if it is missing
                if (department.getCode() == null || department.getCode().isBlank()) {
                    department.setCode(generateDepartmentCode(directorate));
                    log.warn("Department code was blank. Set to: " + department.getCode());
                }

                // Log the department details for debugging
                log.info("Processing Department: " + department.getName() + " with code: " + department.getCode());

                // Create or update the department in the database
                createOrUpdateDepartment(department);
            }

            log.info("Department seeding completed successfully.");
        } catch (IOException e) {
            log.error("Error during department seeding", e);
        }
    }

    private void createOrUpdateDepartment(Department department) {
        if (department.getDescription() == null || department.getDescription().isBlank()) {
            // Use a default description or pull from the Directorate
            department.setDescription(department.getDirectorate().getDescription() + " Department");
            
            log.warn("Department description was blank. Set to: " + department.getDescription());
        }
        if (department.getName() == null || department.getName().isBlank()) {
            throw new IllegalArgumentException("Department name cannot be null or blank");
        }
        if (department.getDirectorate() == null) {
            throw new IllegalArgumentException("Department must have an associated Directorate");
        }

        Department existingDepartment = departmentRepository.find("code", department.getCode()).firstResult();
        if (existingDepartment != null) {
            existingDepartment.setDescription(department.getDescription());
            existingDepartment.setName(department.getName());
            existingDepartment.setReference(department.getReference());
            existingDepartment.setDirectorate(department.getDirectorate());
            departmentRepository.getEntityManager().merge(existingDepartment);
        } else {
            departmentRepository.persist(department);
        }
    }

    private String generateDepartmentCode(Directorate directorate) {
        // Get the number of departments in the same directorate
        long count = departmentRepository.count("directorate.id", directorate.getId());
        // Generate a unique code by appending a number to the directorate's code
        return directorate.getCode() +"-"+ String.format("%03d", count + 1);  // E.g., DPI001, DG002
    }
}
