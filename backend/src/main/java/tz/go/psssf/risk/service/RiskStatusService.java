package tz.go.psssf.risk.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import org.hibernate.Session;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.entity.RiskStatus;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.repository.RiskStatusRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class RiskStatusService {

    @Inject
    Logger log;

    @Inject
    RiskStatusRepository riskStatusRepository;

    public ResponseWrapper<List<RiskStatus>> listAll() {
        try {
            List<RiskStatus> entities = riskStatusRepository.listAll();
            return ResponseHelper.createSuccessResponse(entities);
        } catch (Exception e) {
            log.error("Error during listing all RiskStatuses", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<RiskStatus>> listByType(String type) {
        try {
            List<RiskStatus> entities = riskStatusRepository.find("type", type).list();
            return ResponseHelper.createSuccessResponse(entities);
        } catch (Exception e) {
            log.error("Error during listing RiskStatuses by type", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
