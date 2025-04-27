package tz.go.psssf.risk.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaginatedResponse<T> {
//	private int page;
//    private int size;
//    private int totalPages;
//    private long totalCount;
//    private List<T> data;
//    
	
    private int currentPage;
    private int totalPages;
    private long totalItems;
    private int pageSize;
    private boolean hasPrevious;
    private boolean hasNext;
//    private T firstResult;
    private List<T> items;
   
    
}
