package tz.go.psssf.risk.seeder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import tz.go.psssf.risk.entity.BusinessProcess;
import tz.go.psssf.risk.entity.Department;
import tz.go.psssf.risk.entity.FundObjective;
import tz.go.psssf.risk.helper.SeederHelper;
import tz.go.psssf.risk.repository.BusinessProcessRepository;
import tz.go.psssf.risk.repository.DepartmentRepository;
import tz.go.psssf.risk.repository.FundObjectiveRepository;

import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped
public class BusinessProcessSeeder {

    @Inject
    BusinessProcessRepository businessProcessRepository;

    @Inject
    FundObjectiveRepository fundObjectiveRepository;

    @Inject
    DepartmentRepository departmentRepository;

    @Transactional
    public void seed() {
        try {
            Long count = businessProcessRepository.count();
            if (count == 0) {
                List<FundObjective> fundObjectives = fundObjectiveRepository.listAll();
                List<Department> departments = departmentRepository.listAll();

                if (fundObjectives.isEmpty()) {
                    throw new RuntimeException("No FundObjectives found to link with Business Processes.");
                }

                if (departments.isEmpty()) {
                    throw new RuntimeException("No Departments found to link with Business Processes.");
                }

                // Reduce the number of business processes to a more reasonable amount
                int numberOfBusinessProcesses = 100;
                // Use a batch size to commit in smaller chunks
                int batchSize = 10;

                for (int i = 1; i <= numberOfBusinessProcesses; i++) {
                    BusinessProcess businessProcess = new BusinessProcess();
                    businessProcess.setName("Business Process " + i);
                    businessProcess.setDescription(SeederHelper.generateDescription(100)); // Shorter description
                    businessProcess.setFundObjective(fundObjectives.get(i % fundObjectives.size()));
                    businessProcess.setBusinessProcessOwnerDepartment(departments.get(i % departments.size()));
                    businessProcess.setStartDateTime(LocalDateTime.now().minusDays(1));
                    businessProcess.setEndDateTime(LocalDateTime.now().plusDays(30));

                    businessProcessRepository.persist(businessProcess);

                    // Flush and clear the persistence context periodically to avoid memory issues
                    if (i % batchSize == 0) {
                        businessProcessRepository.getEntityManager().flush();
                        businessProcessRepository.getEntityManager().clear();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
