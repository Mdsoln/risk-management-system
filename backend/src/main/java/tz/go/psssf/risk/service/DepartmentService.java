package tz.go.psssf.risk.service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.DepartmentDTO;
import tz.go.psssf.risk.entity.Department;
import tz.go.psssf.risk.entity.Directorate;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.DepartmentMapper;
import tz.go.psssf.risk.mapper.DirectorateMapper;
import tz.go.psssf.risk.mapper.RiskOwnerMapper;
import tz.go.psssf.risk.pojo.DepartmentPojo;
import tz.go.psssf.risk.pojo.DirectoratePojo;
import tz.go.psssf.risk.pojo.RiskDepartmentOwnerPojo;
import tz.go.psssf.risk.pojo.RiskOwnerPojo;
import tz.go.psssf.risk.repository.DepartmentRepository;
import tz.go.psssf.risk.repository.DirectorateRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class DepartmentService {

    @Inject
    Logger log;

    @Inject
    DepartmentRepository departmentRepository;

    @Inject
    DepartmentMapper departmentMapper;

    @Inject
    DirectorateMapper directorateMapper;
    
    @Inject
    DirectorateRepository directorateRepository;

    public ResponseWrapper<DepartmentPojo> findById(String id) {
        try {
            Department department = departmentRepository.findById(id);
            if (department != null) {
                DepartmentPojo pojo = departmentMapper.toPojo(department);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding Department by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<DepartmentPojo> create(@Valid DepartmentDTO departmentDTO) {
        try {
            Department entity = departmentMapper.toEntity(departmentDTO);
            departmentRepository.persist(entity);
            DepartmentPojo resultPojo = departmentMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (Exception e) {
            log.error("Error during creating Department", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<DepartmentPojo> update(String id, @Valid DepartmentDTO departmentDTO) {
        try {
            Department entity = departmentRepository.findById(id);
            if (entity != null) {
                departmentMapper.updateEntityFromDTO(departmentDTO, entity);
                DepartmentPojo resultPojo = departmentMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during updating Department", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            Department entity = departmentRepository.findById(id);
            if (entity != null) {
                departmentRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting Department", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<DepartmentPojo>> listAll() {
        try {
            List<Department> entities = departmentRepository.listAll();
            List<DepartmentPojo> pojos = entities.stream()
                    .map(departmentMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all Departments", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
    
   
    public ResponseWrapper<List<DirectoratePojo>> listAllDirectoratesWithDepartments() {
        try {
            List<Directorate> directorates = directorateRepository.listAll();

            List<DirectoratePojo> directoratePojos = directorates.stream()
                .map(directorateMapper::toPojo)
                .collect(Collectors.toList());

            return ResponseHelper.createSuccessResponse(directoratePojos);
        } catch (Exception e) {
            log.error("Error during listing all Directorates with Departments", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }




}
