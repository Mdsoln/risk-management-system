package tz.go.psssf.risk.helper;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import tz.go.psssf.risk.response.PaginatedResponse;

import java.util.List;

public class PaginationHelper {

    public static <T> PaginatedResponse<T> toPageInfo(PanacheQuery<T> query) {
        int currentPage = query.page().index;
        int pageSize = query.page().size;
        long totalRecords = query.count();
        int totalPages = (int) Math.ceil((double) totalRecords / pageSize);
        
        boolean hasNext = query.hasNextPage();
        boolean hasPrevious = query.hasPreviousPage();
//        T firstResult = query.firstResult();
        List<T> entities = query.list();

        return new PaginatedResponse<>(
                currentPage,
                totalPages,
                totalRecords,
                pageSize,
                hasPrevious,
                hasNext,
//                firstResult,
                entities
        );
    }
    
    
    public static <T> long countQuery(PanacheQuery<T> query) {
        return query.count();
    }

    public static int calculateTotalPages(long totalCount, int size) {
        return (int) Math.ceil((double) totalCount / size);
    }
}
