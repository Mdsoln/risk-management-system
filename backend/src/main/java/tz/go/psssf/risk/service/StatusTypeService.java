package tz.go.psssf.risk.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.dto.StatusTypeDTO;
import tz.go.psssf.risk.entity.StatusType;
import tz.go.psssf.risk.mapper.StatusTypeMapper;
import tz.go.psssf.risk.pojo.StatusTypePojo;
import tz.go.psssf.risk.repository.StatusTypeRepository;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class StatusTypeService {

    @Inject
    Logger log;

    @Inject
    StatusTypeRepository statusTypeRepository;

    @Inject
    StatusTypeMapper statusTypeMapper;

    public ResponseWrapper<List<StatusTypePojo>> listAll() {
        try {
            List<StatusType> entities = statusTypeRepository.listAll();
            List<StatusTypePojo> pojos = entities.stream()
                    .map(statusTypeMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all StatusTypes", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<StatusTypePojo>> listByType(String type) {
        try {
            List<StatusType> entities = statusTypeRepository.find("type", type).list();
            List<StatusTypePojo> pojos = entities.stream()
                    .map(statusTypeMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing StatusTypes by type", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<StatusTypePojo> findById(String id) {
        try {
            StatusType entity = statusTypeRepository.findById(id);
            if (entity != null) {
                StatusTypePojo pojo = statusTypeMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding StatusType by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<StatusTypePojo> create(StatusTypeDTO dto) {
        try {
            StatusType entity = statusTypeMapper.toEntity(dto);
            statusTypeRepository.persist(entity);
            StatusTypePojo pojo = statusTypeMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(pojo);
        } catch (Exception e) {
            log.error("Error during creating StatusType", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<StatusTypePojo> update(String id, StatusTypeDTO dto) {
        try {
            StatusType entity = statusTypeRepository.findById(id);
            if (entity != null) {
                statusTypeMapper.toEntity(dto);  // Update the entity with values from DTO
                statusTypeRepository.persist(entity);
                StatusTypePojo pojo = statusTypeMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating StatusType", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            StatusType entity = statusTypeRepository.findById(id);
            if (entity != null) {
                statusTypeRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting StatusType", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
