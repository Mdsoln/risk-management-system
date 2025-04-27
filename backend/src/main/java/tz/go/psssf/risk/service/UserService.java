package tz.go.psssf.risk.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;

import org.jboss.logging.Logger;

import tz.go.psssf.risk.dto.UserDTO;
import tz.go.psssf.risk.entity.User;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.mapper.UserMapper;
import tz.go.psssf.risk.pojo.UserPojo;
import tz.go.psssf.risk.repository.UserRepository;
import tz.go.psssf.risk.response.ResponseWrapper;

@ApplicationScoped
public class UserService {

    @Inject
    Logger log;

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper userMapper;

    public ResponseWrapper<UserPojo> findById(String id) {
        try {
            User user = userRepository.findById(id);
            if (user != null) {
                UserPojo pojo = userMapper.toPojo(user);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding User by id", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<UserPojo> create(@Valid UserDTO userDTO) {
        try {
            User entity = userMapper.toEntity(userDTO);
            userRepository.persist(entity);
            UserPojo resultPojo = userMapper.toPojo(entity);
            return ResponseHelper.createSuccessResponse(resultPojo);
        } catch (ConstraintViolationException e) {
            log.error("Constraint violation error", e);
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during creating User", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<UserPojo> update(String id, @Valid UserDTO userDTO) {
        try {
            User entity = userRepository.findById(id);
            if (entity != null) {
                userMapper.updateEntityFromDTO(userDTO, entity);
                UserPojo resultPojo = userMapper.toPojo(entity);
                return ResponseHelper.createSuccessResponse(resultPojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (ConstraintViolationException e) {
            log.error("Constraint violation error", e);
            return ResponseHelper.createConstraintViolationErrorResponse(e);
        } catch (Exception e) {
            log.error("Error during updating User", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        try {
            User entity = userRepository.findById(id);
            if (entity != null) {
                userRepository.delete(entity);
                return ResponseHelper.createSuccessResponse(null);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error during deleting User", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<List<UserPojo>> listAll() {
        try {
            List<User> entities = userRepository.listAll();
            List<UserPojo> pojos = entities.stream()
                    .map(userMapper::toPojo)
                    .collect(Collectors.toList());
            return ResponseHelper.createSuccessResponse(pojos);
        } catch (Exception e) {
            log.error("Error during listing all Users", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    public ResponseWrapper<UserPojo> findByNin(String nin) {
        try {
            User user = userRepository.find("nin", nin).firstResult();
            if (user != null) {
                UserPojo pojo = userMapper.toPojo(user);
                return ResponseHelper.createSuccessResponse(pojo);
            } else {
                return ResponseHelper.createNotFoundResponse();
            }
        } catch (Exception e) {
            log.error("Error finding User by NIN", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }
}
