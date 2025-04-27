import axios from 'axios';
import {
    ComplianceEntityCategoryDTO,
    ComplianceEntityCategoryPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch paginated list
export const getComplianceEntityCategories = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<ComplianceEntityCategoryPojo>> => {
    const params: Record<string, any> = {
        page,
        size,
        filterDateBy,
        sortDirection,
    };

    if (searchKeyword) params.searchKeyword = searchKeyword;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (sort.length > 0) params.sort = sort;

    const queryParams = new URLSearchParams(params as any).toString();
    const url = `${API_V1}/compliance/entity-category/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<ComplianceEntityCategoryPojo> }>(url);
    return response.data.data;
};

// Get by ID
export const getComplianceEntityCategoryById = async (
    id: string
): Promise<ComplianceEntityCategoryPojo> => {
    const url = `${API_V1}/compliance/entity-category/${id}`;
    const response = await axios.get<ApiResponse<ComplianceEntityCategoryPojo | null>>(url);

    // Check if response.data.data is null or invalid
    if (!response.data.data) {
        throw new Error('Compliance Entity Category not found.');
    }

    // Validate if it's the correct type
    if (Array.isArray(response.data.data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return response.data.data as ComplianceEntityCategoryPojo; // Safely cast the type
};


// Add new category
export const addComplianceEntityCategory = async (
    category: ComplianceEntityCategoryDTO
): Promise<ApiResponse<ComplianceEntityCategoryDTO>> => {
    const response = await axios.post<ApiResponse<ComplianceEntityCategoryDTO>>(
        `${API_V1}/compliance/entity-category`,
        category
    );
    return response.data;
};

// Update category
export const updateComplianceEntityCategory = async (
    id: string,
    category: Partial<ComplianceEntityCategoryDTO>
): Promise<ApiResponse<ComplianceEntityCategoryDTO>> => {
    const response = await axios.put<ApiResponse<ComplianceEntityCategoryDTO>>(
        `${API_V1}/compliance/entity-category/${id}`,
        category
    );
    return response.data;
};

// Delete category
export const deleteComplianceEntityCategory = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/compliance/entity-category/${id}`);
};
