package tz.go.psssf.risk.bcm.service;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.bcm.dto.BcmPhoneDirectoryDTO;
import tz.go.psssf.risk.bcm.entity.BcmPhoneDirectory;
import tz.go.psssf.risk.bcm.mapper.BcmPhoneDirectoryMapper;
import tz.go.psssf.risk.bcm.pojo.BcmPhoneDirectoryPojo;
import tz.go.psssf.risk.bcm.repository.BcmPhoneDirectoryRepository;
import tz.go.psssf.risk.helper.CustomQueryHelper;
import tz.go.psssf.risk.helper.PaginationHelper;
import tz.go.psssf.risk.helper.ResponseHelper;
import tz.go.psssf.risk.response.PaginatedResponse;
import tz.go.psssf.risk.response.ResponseWrapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class BcmPhoneDirectoryService {

    @Inject
    Logger log;

    @Inject
    BcmPhoneDirectoryRepository repository;

    @Inject
    BcmPhoneDirectoryMapper mapper;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    // Searchable fields
    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("roleName", "phoneNumber");
    private static final Set<String> VALID_SORT_FIELDS = new HashSet<>(Arrays.asList("roleName", "phoneNumber", "createdAt"));
    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Arrays.asList("createdAt", "updatedAt"));

    private static final Map<String, String> SORT_FIELD_MAPPINGS = new HashMap<>();

    static {
        SORT_FIELD_MAPPINGS.put("roleName", "roleName");
        SORT_FIELD_MAPPINGS.put("phoneNumber", "phoneNumber");
        SORT_FIELD_MAPPINGS.put("createdAt", "createdAt");
    }

    public ResponseWrapper<PaginatedResponse<BcmPhoneDirectoryPojo>> findWithPaginationSortingFiltering(
            int page, int size, List<String> sort, String sortDirection, String searchKeyword,
            LocalDateTime startDate, LocalDateTime endDate, String filterDateBy) {

        try {
            CustomQueryHelper<BcmPhoneDirectory> customQueryHelper = new CustomQueryHelper<>();
            PanacheQuery<BcmPhoneDirectory> query = customQueryHelper.findWithPaginationSortingFiltering(
                    repository,
                    BcmPhoneDirectory.class, page, size, sort, sortDirection, searchKeyword,
                    SEARCHABLE_FIELDS, startDate, endDate, filterDateBy, VALID_SORT_FIELDS, VALID_DATE_FIELDS,
                    SORT_FIELD_MAPPINGS);

            PaginatedResponse<BcmPhoneDirectory> paginatedResponse = PaginationHelper.toPageInfo(query);

            List<BcmPhoneDirectoryPojo> pojos = paginatedResponse.getItems().stream()
                    .map(mapper::toPojo)
                    .collect(Collectors.toList());

            PaginatedResponse<BcmPhoneDirectoryPojo> pojoPaginatedResponse = new PaginatedResponse<>(
                    paginatedResponse.getCurrentPage(),
                    paginatedResponse.getTotalPages(),
                    paginatedResponse.getTotalItems(),
                    paginatedResponse.getPageSize(),
                    paginatedResponse.isHasPrevious(),
                    paginatedResponse.isHasNext(),
                    pojos
            );

            return ResponseHelper.createPaginatedResponse(pojoPaginatedResponse.getItems(),
                    pojoPaginatedResponse.getCurrentPage(), pojoPaginatedResponse.getTotalItems(),
                    pojoPaginatedResponse.getPageSize());

        } catch (Exception e) {
            log.error("Error during pagination and filtering", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    // **Add this missing findById method**
    public ResponseWrapper<BcmPhoneDirectoryPojo> findById(String id) {
        try {
            BcmPhoneDirectory entity = repository.findById(id); // Ensure this method exists in the repository
            if (entity == null) {
                return ResponseHelper.createNotFoundResponse();
            }
            return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
        } catch (Exception e) {
            log.error("Error finding BcmPhoneDirectory by ID", e);
            return ResponseHelper.createErrorResponse(e);
        }
    }

    @Transactional
    public ResponseWrapper<BcmPhoneDirectoryPojo> create(@Valid BcmPhoneDirectoryDTO dto) {
        BcmPhoneDirectory entity = mapper.toEntity(dto);
        repository.persist(entity);
        return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
    }

    @Transactional
    public ResponseWrapper<BcmPhoneDirectoryPojo> update(String id, @Valid BcmPhoneDirectoryDTO dto) {
        BcmPhoneDirectory entity = repository.findById(id);
        if (entity == null) return ResponseHelper.createNotFoundResponse();

        mapper.updateEntityFromDTO(dto, entity);
        repository.persist(entity);
        return ResponseHelper.createSuccessResponse(mapper.toPojo(entity));
    }

    @Transactional
    public ResponseWrapper<Void> delete(String id) {
        BcmPhoneDirectory entity = repository.findById(id);
        if (entity == null) return ResponseHelper.createNotFoundResponse();
        repository.delete(entity);
        return ResponseHelper.createSuccessResponse(null);
    }
}
