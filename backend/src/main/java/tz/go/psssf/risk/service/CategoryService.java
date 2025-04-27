//package tz.go.psssf.risk.service;
//
//import tz.go.psssf.risk.constants.ResponseConstants;
//import tz.go.psssf.risk.dto.CategoryDTO;
//import tz.go.psssf.risk.entity.Category;
//import tz.go.psssf.risk.enums.RecordStatus;
//import tz.go.psssf.risk.mapper.CategoryMapper;
//import tz.go.psssf.risk.mapper.SubCategoryMapper;
//import tz.go.psssf.risk.repository.CategoryRepository;
//import tz.go.psssf.risk.repository.SubCategoryRepository;
//import tz.go.psssf.risk.response.ResponseWrapper;
//import io.quarkus.hibernate.orm.panache.PanacheQuery;
//import io.quarkus.panache.common.Parameters;
//import io.smallrye.mutiny.Uni;
//import jakarta.enterprise.context.ApplicationScoped;
//import jakarta.inject.Inject;
//import jakarta.persistence.PersistenceException;
//import jakarta.transaction.Transactional;
//import jakarta.validation.ConstraintViolation;
//import jakarta.validation.ConstraintViolationException;
//import jakarta.ws.rs.WebApplicationException;
//
//import java.time.LocalDateTime;
//import java.time.temporal.ChronoUnit;
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import org.jboss.logging.Logger;
//@ApplicationScoped
//public class CategoryService {
//	
//	@Inject
//	Logger log; 
//
//	@Inject
//	CategoryRepository categoryRepository;
//
//	public List<Category> findAll() {
//		return categoryRepository.listAll();
//	}
//
//	public ResponseWrapper<Category> findById(String id) {
//
//		try {
//			Category category = categoryRepository.findById(id);
//			if (category != null) {
//				return ResponseWrapper.createForObject(ResponseConstants.SUCCESS_CODE,
//						ResponseConstants.SUCCESS_MESSAGE, category);
//			} else {
//				return ResponseWrapper.createForObject(ResponseConstants.NOT_FOUND_CODE,
//						ResponseConstants.NOT_FOUND_MESSAGE, null);
//			}
//
//		} catch (Exception e) {
//			// TODO: handle exception
//			log.error(e);
//			return ResponseWrapper.createWithErrors(ResponseConstants.INTERNAL_SERVER_ERROR_CODE,
//					ResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE, null, e.getMessage());
//		}
//
//	}
//	
//	
//	@Transactional
//	public ResponseWrapper<Category> create(CategoryDTO categoryDTO) {
//	    try {
//	        Category category = CategoryMapper.INSTANCE.toEntity(categoryDTO); // mapping   
//	        categoryRepository.persist(category);
//	        return ResponseWrapper.createForObject(ResponseConstants.SUCCESS_CODE,
//	                ResponseConstants.SUCCESS_MESSAGE, category);
//	    } catch (PersistenceException e) {
//	        log.error("Database error: ", e);
//	        return ResponseWrapper.createWithErrors(ResponseConstants.INTERNAL_SERVER_ERROR_CODE,
//	                ResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE, null, "Database error occurred");
//	    } catch (Exception e) {
//	        log.error("Unexpected error: ", e);
//	        return ResponseWrapper.createWithErrors(ResponseConstants.INTERNAL_SERVER_ERROR_CODE,
//	                ResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE, null, e.getMessage());
//	    }
//	}
//	
//
//
//	@Transactional
//	public  ResponseWrapper<Category>  update(String id, CategoryDTO categoryDTO) {
//		
//		
//		
//		 try {
//			 Category category = categoryRepository.findById(id);
//				
//				if (category != null) {
//					category = CategoryMapper.INSTANCE.toEntity(categoryDTO); // mapping
//					category.persist(); // To update the entity
//					return ResponseWrapper.createForObject(ResponseConstants.SUCCESS_CODE,
//			                ResponseConstants.SUCCESS_MESSAGE, category);
//				}else {
//					return ResponseWrapper.createForObject(ResponseConstants.NOT_FOUND_CODE,
//							ResponseConstants.NOT_FOUND_MESSAGE, null);
//				}
//
//		        
//		    } catch (PersistenceException e) {
//		        log.error("Database error: ", e);
//		        return ResponseWrapper.createWithErrors(ResponseConstants.INTERNAL_SERVER_ERROR_CODE,
//		                ResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE, null, "Database error occurred");
//		    } catch (Exception e) {
//		        log.error("Unexpected error: ", e);
//		        return ResponseWrapper.createWithErrors(ResponseConstants.INTERNAL_SERVER_ERROR_CODE,
//		                ResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE, null, e.getMessage());
//		    }
//
//	}
//
//	@Transactional
//	public ResponseWrapper<Category>  delete(String id) {
//
//		 try {
//			 Category category = categoryRepository.findById(id);
//				
//				if (category != null) {
//					CategoryDTO categoryDTO = CategoryMapper.INSTANCE.toDTO(category);
//					category = CategoryMapper.INSTANCE.toEntity(categoryDTO); // mapping
//					category.setStatus(RecordStatus.DELETED);
//					category.persist(); // To update the entity
//					
//					
//					// then set DELETED to all sub-category
//					return ResponseWrapper.createForObject(ResponseConstants.SUCCESS_CODE,
//			                ResponseConstants.SUCCESS_MESSAGE, category);
//				}else {
//					return ResponseWrapper.createForObject(ResponseConstants.NOT_FOUND_CODE,
//							ResponseConstants.NOT_FOUND_MESSAGE, null);
//				}
//
//		        
//		    } catch (PersistenceException e) {
//		        log.error("Database error: ", e);
//		        return ResponseWrapper.createWithErrors(ResponseConstants.INTERNAL_SERVER_ERROR_CODE,
//		                ResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE, null, "Database error occurred");
//		    } catch (Exception e) {
//		        log.error("Unexpected error: ", e);
//		        return ResponseWrapper.createWithErrors(ResponseConstants.INTERNAL_SERVER_ERROR_CODE,
//		                ResponseConstants.INTERNAL_SERVER_ERROR_MESSAGE, null, e.getMessage());
//		    }
//	}
//	
//	 private static final List<String> VALID_SORT_FIELDS = Arrays.asList("name", "id", "createdAt");
//    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("name"); // Add actual searchable fields here
//    private static final int MIN_SIZE = 1;
//    private static final int MAX_SIZE = 100;
//    private static final Set<String> VALID_DATE_FIELDS = new HashSet<>(Set.of("createdAt", "updatedAt"));
//
//
//public PanacheQuery<Category> findWithPaginationSortingFiltering(int page, int size, String sort, String searchKeyword, String sortDirection, LocalDateTime startDate, LocalDateTime endDate, String dateField) {
//    // Validate the size parameter
//    if (size < MIN_SIZE || size > MAX_SIZE) {
//        throw new IllegalArgumentException("Size must be between " + MIN_SIZE + " and " + MAX_SIZE);
//    }
//
//    // Validate the sort parameter
//    if (sort == null || !VALID_SORT_FIELDS.contains(sort)) {
//        throw new IllegalArgumentException("Invalid sort parameter: " + sort);
//    }
//
//    // Validate the sort direction
//    if (!"asc".equalsIgnoreCase(sortDirection) && !"desc".equalsIgnoreCase(sortDirection)) {
//        throw new IllegalArgumentException("Invalid sort direction: " + sortDirection);
//    }
//
//    // Validate the date field parameter
//    if (!VALID_DATE_FIELDS.contains(dateField)) {
//        throw new IllegalArgumentException("Invalid date field: " + dateField);
//    }
//
//    StringBuilder query = new StringBuilder("FROM Category c");
//    Map<String, Object> params = new HashMap<>();
//
//    boolean hasWhereClause = false;
//
//    if (searchKeyword != null && !searchKeyword.isEmpty()) {
//        query.append(" WHERE ");
//        hasWhereClause = true;
//        query.append("(");
//        for (int i = 0; i < SEARCHABLE_FIELDS.size(); i++) {
//            String field = SEARCHABLE_FIELDS.get(i);
//            if (i > 0) {
//                query.append(" OR ");
//            }
//            query.append("c.").append(field).append(" LIKE :searchKeyword");
//        }
//        query.append(")");
//        params.put("searchKeyword", "%" + searchKeyword + "%");
//    }
//
//    if (startDate != null) {
//        if (!hasWhereClause) {
//            query.append(" WHERE ");
//            hasWhereClause = true;
//        } else {
//            query.append(" AND ");
//        }
//        if (endDate != null && startDate.equals(endDate)) {
//            // Adjust endDate to include the full second
//            endDate = endDate.plus(1, ChronoUnit.SECONDS).minusNanos(1);
//        }
//        query.append("c.").append(dateField).append(" >= :startDate");
//        params.put("startDate", startDate);
//    }
//
//    if (endDate != null) {
//        if (!hasWhereClause) {
//            query.append(" WHERE ");
//            hasWhereClause = true;
//        } else {
//            query.append(" AND ");
//        }
//        query.append("c.").append(dateField).append(" <= :endDate");
//        params.put("endDate", endDate);
//    }
//
//    query.append(" ORDER BY c.").append(sort).append(" ").append(sortDirection);
//
//    PanacheQuery<Category> panacheQuery;
//    if (params.isEmpty()) {
//        panacheQuery = Category.find(query.toString());
//    } else {
//        Parameters parameterObject = Parameters.with(params.entrySet().iterator().next().getKey(), params.entrySet().iterator().next().getValue());
//        for (Map.Entry<String, Object> entry : params.entrySet()) {
//            parameterObject.and(entry.getKey(), entry.getValue());
//        }
//        panacheQuery = Category.find(query.toString(), parameterObject);
//    }
//    return panacheQuery.page(page, size);
//}
//    
////	public PanacheQuery<Category> findWithPaginationSortingFiltering(int page, int size, String sort, String searchKeyword, String sortDirection) {
////        // Validate the sort parameter
////		
////		if (size < MIN_SIZE || size > MAX_SIZE) {
////            throw new IllegalArgumentException("Size must be between " + MIN_SIZE + " and " + MAX_SIZE);
////        }
////		
////        if (sort == null || !VALID_SORT_FIELDS.contains(sort)) {
////            throw new IllegalArgumentException("Invalid sort parameter: " + sort);
////        }
////
////        // Validate the sort direction
////        if (!"asc".equalsIgnoreCase(sortDirection) && !"desc".equalsIgnoreCase(sortDirection)) {
////            throw new IllegalArgumentException("Invalid sort direction: " + sortDirection);
////        }
////
////        StringBuilder query = new StringBuilder("FROM Category c");
////        Map<String, Object> params = new HashMap<>();
////
////        if (searchKeyword != null && !searchKeyword.isEmpty()) {
////            query.append(" WHERE ");
////            query.append("(");
////            for (int i = 0; i < SEARCHABLE_FIELDS.size(); i++) {
////                String field = SEARCHABLE_FIELDS.get(i);
////                if (i > 0) {
////                    query.append(" OR ");
////                }
////                query.append("c.").append(field).append(" LIKE :searchKeyword");
////            }
////            query.append(")");
////            params.put("searchKeyword", "%" + searchKeyword + "%");
////        }
////
////        query.append(" ORDER BY c.").append(sort).append(" ").append(sortDirection);
////
////        PanacheQuery<Category> panacheQuery;
////        if (params.isEmpty()) {
////            panacheQuery = Category.find(query.toString());
////        } else {
////            Parameters parameterObject = Parameters.with(params.entrySet().iterator().next().getKey(), params.entrySet().iterator().next().getValue());
////            for (Map.Entry<String, Object> entry : params.entrySet()) {
////                parameterObject.and(entry.getKey(), entry.getValue());
////            }
////            panacheQuery = Category.find(query.toString(), parameterObject);
////        }
////        return panacheQuery.page(page, size);
////    }
//
//}