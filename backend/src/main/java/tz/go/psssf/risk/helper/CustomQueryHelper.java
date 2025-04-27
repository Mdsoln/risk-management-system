package tz.go.psssf.risk.helper;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Parameters;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.lang.reflect.Field;

public class CustomQueryHelper<T> {

    private static final int MIN_SIZE = 1;
    private static final int MAX_SIZE = 100;
    private static final String DEFAULT_SORT_DIRECTION = "desc";
    private static final List<String> DEFAULT_SORT_FIELDS = Arrays.asList("createdAt");

    public PanacheQuery<T> findWithPaginationSortingFiltering(
            PanacheRepositoryBase<T, ?> repository,
            Class<T> entityClass,
            int page,
            int size,
            List<String> sort,
            String sortDirection,
            String searchKeyword,
            List<String> searchableFields,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String filterDateBy,
            Set<String> validSortFields,
            Set<String> validDateFields,
            Map<String, String> sortFieldMappings) {

        validateSize(size);
        validateSort(sort, validSortFields);
        if (sortDirection == null) {
            sortDirection = DEFAULT_SORT_DIRECTION;
        }
        validateSortDirection(sortDirection);
        validateDateField(filterDateBy, validDateFields);

        // Validate and assign default sort fields
        List<String> validatedSortFields = validateAndAssignDefaultSort(sort, entityClass, sortFieldMappings,
                validSortFields);

        StringBuilder query = new StringBuilder("FROM " + entityClass.getSimpleName() + " c");
        Map<String, Object> params = new HashMap<>();
        boolean hasWhereClause = false;

        if (searchKeyword != null && !searchKeyword.isEmpty() && !searchableFields.isEmpty()) {
            query.append(" WHERE ");
            hasWhereClause = true;
            query.append(buildSearchClause(searchKeyword, searchableFields, params));
        }

        if (startDate != null) {
            query.append(hasWhereClause ? " AND " : " WHERE ");
            hasWhereClause = true;
            query.append("c.").append(filterDateBy).append(" >= :startDate");
            params.put("startDate", startDate);
        }

        if (endDate != null) {
            query.append(hasWhereClause ? " AND " : " WHERE ");
            if (startDate != null && startDate.equals(endDate)) {
                endDate = endDate.plus(1, ChronoUnit.SECONDS).minusNanos(1);
            }
            query.append("c.").append(filterDateBy).append(" <= :endDate");
            params.put("endDate", endDate);
        }

        final String finalSortDirection = sortDirection;
        String sortClause = validatedSortFields.stream()
                .map(field -> "c." + field + " " + finalSortDirection)
                .collect(Collectors.joining(", "));
        query.append(" ORDER BY ").append(sortClause);

        return buildPanacheQuery(repository, query.toString(), params).page(Page.of(page, size));
    }

    private void validateSize(int size) {
        if (size < MIN_SIZE || size > MAX_SIZE) {
            throw new IllegalArgumentException("Size must be between " + MIN_SIZE + " and " + MAX_SIZE);
        }
    }

    private void validateSort(List<String> sort, Set<String> validSortFields) {
        if (sort == null || sort.isEmpty()) {
            throw new IllegalArgumentException("Sort parameter cannot be null or empty");
        }
        for (String sortField : sort) {
            if (!validSortFields.contains(sortField)) {
                throw new IllegalArgumentException("Invalid sort parameter: " + sortField);
            }
        }
    }

    private void validateSortDirection(String sortDirection) {
        if (!"asc".equalsIgnoreCase(sortDirection) && !"desc".equalsIgnoreCase(sortDirection)) {
            throw new IllegalArgumentException("Invalid sort direction: " + sortDirection);
        }
    }

    private void validateDateField(String dateField, Set<String> validDateFields) {
        if (!validDateFields.contains(dateField)) {
            throw new IllegalArgumentException("Invalid date field: " + dateField);
        }
    }

    private String buildSearchClause(String searchKeyword, List<String> searchableFields, Map<String, Object> params) {
        params.put("searchKeyword", "%" + searchKeyword + "%");
        return searchableFields.stream()
                .map(field -> "c." + field + " LIKE :searchKeyword")
                .collect(Collectors.joining(" OR ", "(", ")"));
    }

    private PanacheQuery<T> buildPanacheQuery(PanacheRepositoryBase<T, ?> repository, String query,
            Map<String, Object> params) {
        if (params.isEmpty()) {
            return repository.find(query);
        } else {
            Parameters parameterObject = Parameters.with(params.entrySet().iterator().next().getKey(),
                    params.entrySet().iterator().next().getValue());
            for (Map.Entry<String, Object> entry : params.entrySet()) {
                parameterObject.and(entry.getKey(), entry.getValue());
            }
            return repository.find(query, parameterObject);
        }
    }

   

    public List<String> validateAndAssignDefaultSort(List<String> sort, Class<?> entityClass,
            Map<String, String> sortFieldMappings, Set<String> validSortFields) {
        if (sort == null || sort.isEmpty()) {
            return new ArrayList<>(DEFAULT_SORT_FIELDS);
        }

        // Get all fields of the entity class and its superclasses
        Set<String> entityFields = new HashSet<>();
        Class<?> clazz = entityClass;
        while (clazz != null && clazz != Object.class) {
            for (Field field : clazz.getDeclaredFields()) {
                entityFields.add(field.getName());
            }
            clazz = clazz.getSuperclass();
        }

        // Map generic sort fields to specific entity fields if mappings are provided
        List<String> validatedSortFields = new ArrayList<>();
        for (String sortField : sort) {
            if (sortFieldMappings.containsKey(sortField)) {
                String mappedField = sortFieldMappings.get(sortField);
                if (entityFields.contains(mappedField) && validSortFields.contains(mappedField)) {
                    validatedSortFields.add(mappedField);
                } else {
                    throw new IllegalArgumentException("Invalid sort parameter: " + sortField);
                }
            } else {
                if (entityFields.contains(sortField) && validSortFields.contains(sortField)
                        || sortField.equalsIgnoreCase("id")) {
                    validatedSortFields.add(sortField);
                } else {
                    throw new IllegalArgumentException("Invalid sort fields: " + sortField);
                }
            }
        }

        return validatedSortFields;
    }
}
