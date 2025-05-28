//package tz.go.psssf.risk.compliance.seeder;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.node.ObjectNode;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import jakarta.enterprise.context.ApplicationScoped;
//import jakarta.inject.Inject;
//import jakarta.transaction.Transactional;
//import org.jboss.logging.Logger;
//import tz.go.psssf.risk.compliance.entity.ComplianceDocument;
//import tz.go.psssf.risk.compliance.entity.ComplianceDocumentCategory;
//import tz.go.psssf.risk.compliance.entity.ComplianceEntity;
//import tz.go.psssf.risk.compliance.entity.ComplianceEntityCategory;
//import tz.go.psssf.risk.compliance.repository.ComplianceDocumentCategoryRepository;
//import tz.go.psssf.risk.compliance.repository.ComplianceDocumentRepository;
//import tz.go.psssf.risk.compliance.repository.ComplianceEntityCategoryRepository;
//import tz.go.psssf.risk.compliance.repository.ComplianceEntityRepository;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.Iterator;
//
//@ApplicationScoped
//public class ComplianceSeeder {
//
//    @Inject
//    Logger log;
//
//    @Inject
//    ComplianceDocumentRepository complianceDocumentRepository;
//
//    @Inject
//    ComplianceDocumentCategoryRepository complianceDocumentCategoryRepository;
//
//    @Inject
//    ComplianceEntityRepository complianceEntityRepository;
//
//    @Inject
//    ComplianceEntityCategoryRepository complianceEntityCategoryRepository;
//
//    @Transactional
//    public void seedComplianceData() {
//        log.info("Starting compliance data seeding...");
//
//        seedComplianceDocumentCategories();
//       // seedComplianceDocuments();
//        seedComplianceEntityCategories();
//       // seedComplianceEntities();
//
//        log.info("Compliance data seeding completed.");
//    }
//
//    private void seedComplianceDocumentCategories() {
//        seedData("data/compliance-document-category.json", ComplianceDocumentCategory.class, complianceDocumentCategoryRepository);
//    }
//
//    private void seedComplianceDocuments() {
//        seedData("data/compliance-document.json", ComplianceDocument.class, complianceDocumentRepository);
//    }
//
//    private void seedComplianceEntityCategories() {
//        seedData("data/compliance-entity-category.json", ComplianceEntityCategory.class, complianceEntityCategoryRepository);
//    }
//
//    private void seedComplianceEntities() {
//        seedData("data/compliance-entity.json", ComplianceEntity.class, complianceEntityRepository);
//    }
//
//    private <T> void seedData(String filePath, Class<T> entityClass, Object repository) {
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.registerModule(new JavaTimeModule()); // For LocalDateTime support
//
//        try (InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(filePath)) {
//            if (inputStream == null) {
//                throw new IOException("File not found: " + filePath);
//            }
//
//            JsonNode rootNode = mapper.readTree(inputStream);
//
//            for (JsonNode node : rootNode) {
//                T entity = mapper.convertValue(node, entityClass);
//                createOrUpdateEntity(entity, repository);
//            }
//
//            log.info("Seeded data from: " + filePath);
//        } catch (IOException e) {
//            log.error("Error seeding data from: " + filePath, e);
//        }
//    }
//
//    private <T> void createOrUpdateEntity(T entity, Object repository) {
//        try {
//            String code = (String) entity.getClass().getMethod("getCode").invoke(entity);
//            Object existingEntity = repository.getClass().getMethod("find", String.class, Object.class)
//                    .invoke(repository, "code", code);
//
//            if (existingEntity != null) {
//                repository.getClass().getMethod("persist", Object.class).invoke(repository, existingEntity);
//            } else {
//                repository.getClass().getMethod("persist", Object.class).invoke(repository, entity);
//            }
//        } catch (Exception e) {
//            log.error("Error saving entity: " + entity.toString(), e);
//        }
//    }
//}



package tz.go.psssf.risk.compliance.seeder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.compliance.entity.ComplianceDocumentCategory;
import tz.go.psssf.risk.compliance.entity.ComplianceEntityCategory;
import tz.go.psssf.risk.compliance.entity.ComplianceStatus;
import tz.go.psssf.risk.compliance.repository.ComplianceDocumentCategoryRepository;
import tz.go.psssf.risk.compliance.repository.ComplianceEntityCategoryRepository;
import tz.go.psssf.risk.compliance.repository.ComplianceStatusRepository;
import tz.go.psssf.risk.enums.RecordStatus;

import java.io.IOException;
import java.io.InputStream;

@ApplicationScoped
public class ComplianceSeeder {

    @Inject
    ComplianceDocumentCategoryRepository complianceDocumentCategoryRepository;

    @Inject
    ComplianceEntityCategoryRepository complianceEntityCategoryRepository;

    @Inject
    ComplianceStatusRepository complianceStatusRepository;

    @Inject
    Logger log;

    @Transactional
    public void seedComplianceData() {
        log.info("Starting Compliance Data Seeding...");
        seedComplianceDocumentCategories();
        seedComplianceEntityCategories(); // Added for Compliance Entity Categories
        seedComplianceStatuses(); // Added for Compliance Statuses
        log.info("Compliance Data Seeding Completed!");
    }

    private void seedComplianceDocumentCategories() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule()); // Handle LocalDateTime serialization

        try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
                .getResourceAsStream("data/compliance-document-category.json")) {

            if (inputStream == null) {
                throw new IOException("File compliance-document-category.json not found");
            }

            JsonNode rootNode = mapper.readTree(inputStream);

            for (JsonNode categoryNode : rootNode) {
                // Convert JSON node to ComplianceDocumentCategory entity
                ComplianceDocumentCategory documentCategory = 
                    mapper.convertValue(categoryNode, ComplianceDocumentCategory.class);

                // Validate data
                if (documentCategory.getCode() == null || documentCategory.getCode().isBlank()) {
                    throw new IllegalArgumentException("Code cannot be null or blank.");
                }
                if (documentCategory.getName() == null || documentCategory.getName().isBlank()) {
                    throw new IllegalArgumentException("Name cannot be null or blank.");
                }

                log.info("Processing Compliance Document Category: " + documentCategory.getName());

                // Check if the category already exists
                ComplianceDocumentCategory existingCategory = 
                    complianceDocumentCategoryRepository.find("code = ?1", documentCategory.getCode()).firstResult();

                if (existingCategory != null) {
                    // Update existing category
                    existingCategory.setName(documentCategory.getName());
                    existingCategory.setDescription(documentCategory.getDescription());
                    complianceDocumentCategoryRepository.getEntityManager().merge(existingCategory);
                    log.info("Updated existing Compliance Document Category: " + existingCategory.getName());
                } else {
                    // Create new category
                    complianceDocumentCategoryRepository.persist(documentCategory);
                    log.info("Created new Compliance Document Category: " + documentCategory.getName());
                }
            }

            log.info("Compliance Document Category seeding completed successfully.");
        } catch (IOException e) {
            log.error("Error reading compliance-document-category.json", e);
        } catch (Exception e) {
            log.error("Error saving Compliance Document Category", e);
        }
    }


	private void seedComplianceEntityCategories() {
	    ObjectMapper mapper = new ObjectMapper();
	    mapper.registerModule(new JavaTimeModule()); // Handle LocalDateTime serialization

	    try (InputStream inputStream = Thread.currentThread().getContextClassLoader()
	            .getResourceAsStream("data/compliance-entity-category.json")) {

	        if (inputStream == null) {
	            throw new IOException("File compliance-entity-category.json not found");
	        }

	        JsonNode rootNode = mapper.readTree(inputStream);

	        for (JsonNode categoryNode : rootNode) {
	            // Convert JSON node to ComplianceEntityCategory entity
	            ComplianceEntityCategory entityCategory = 
	                mapper.convertValue(categoryNode, ComplianceEntityCategory.class);

	            // Validate data
	            if (entityCategory.getCode() == null || entityCategory.getCode().isBlank()) {
	                throw new IllegalArgumentException("Code cannot be null or blank.");
	            }
	            if (entityCategory.getName() == null || entityCategory.getName().isBlank()) {
	                throw new IllegalArgumentException("Name cannot be null or blank.");
	            }

	            log.info("Processing Compliance Entity Category: " + entityCategory.getName());

	            // Check if the category already exists
	            ComplianceEntityCategory existingCategory = 
	                complianceEntityCategoryRepository.find("code = ?1", entityCategory.getCode()).firstResult();

	            if (existingCategory != null) {
	                // Update existing category
	                existingCategory.setName(entityCategory.getName());
	                existingCategory.setDescription(entityCategory.getDescription());
	                complianceEntityCategoryRepository.getEntityManager().merge(existingCategory);
	                log.info("Updated existing Compliance Entity Category: " + existingCategory.getName());
	            } else {
	                // Create new category
	                complianceEntityCategoryRepository.persist(entityCategory);
	                log.info("Created new Compliance Entity Category: " + entityCategory.getName());
	            }
	        }

	        log.info("Compliance Entity Category seeding completed successfully.");
	    } catch (IOException e) {
	        log.error("Error reading compliance-entity-category.json", e);
	    } catch (Exception e) {
	        log.error("Error saving Compliance Entity Category", e);
	    }
	}


    private void seedComplianceStatuses() {
        log.info("Starting Compliance Status seeding...");

        try {
            // Define the three compliance statuses
            ComplianceStatus fullCompliance = new ComplianceStatus();
            fullCompliance.setStatusName("Full Compliance");
            fullCompliance.setScore(1.0);
            fullCompliance.setDescription("Entity is fully compliant with all requirements and regulations.");
            fullCompliance.setStatus(RecordStatus.ACTIVE);

            ComplianceStatus partialCompliance = new ComplianceStatus();
            partialCompliance.setStatusName("Partial Compliance");
            partialCompliance.setScore(0.5);
            partialCompliance.setDescription("Entity is partially compliant with requirements and regulations, with some areas needing improvement.");
            partialCompliance.setStatus(RecordStatus.ACTIVE);

            ComplianceStatus nonCompliance = new ComplianceStatus();
            nonCompliance.setStatusName("Non-Compliance");
            nonCompliance.setScore(0.0);
            nonCompliance.setDescription("Entity is not compliant with requirements and regulations, requiring immediate corrective actions.");
            nonCompliance.setStatus(RecordStatus.ACTIVE);

            // Check if statuses already exist and create/update them
            createOrUpdateComplianceStatus(fullCompliance);
            createOrUpdateComplianceStatus(partialCompliance);
            createOrUpdateComplianceStatus(nonCompliance);

            log.info("Compliance Status seeding completed successfully.");
        } catch (Exception e) {
            log.error("Error seeding Compliance Statuses", e);
        }
    }

    private void createOrUpdateComplianceStatus(ComplianceStatus status) {
        // Check if a status with the same name already exists
        ComplianceStatus existingStatus = complianceStatusRepository.find("statusName", status.getStatusName()).firstResult();

        if (existingStatus != null) {
            // Update existing status
            existingStatus.setScore(status.getScore());
            existingStatus.setDescription(status.getDescription());
            existingStatus.setStatus(status.getStatus());
            complianceStatusRepository.getEntityManager().merge(existingStatus);
            log.info("Updated existing Compliance Status: " + existingStatus.getStatusName());
        } else {
            // Create new status
            complianceStatusRepository.persist(status);
            log.info("Created new Compliance Status: " + status.getStatusName());
        }
    }
}
