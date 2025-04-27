import axios from 'axios';
import {
    ComplianceDocumentCategoryDTO,
    ComplianceDocumentCategoryPojo,
    PaginationResult,
    ApiResponse,
} from '@/app/types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch paginated list of compliance document categories
export const getComplianceDocumentCategories = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<ComplianceDocumentCategoryPojo>> => {
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
    const url = `${API_V1}/compliance/document-category/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<ComplianceDocumentCategoryPojo> }>(url);
    return response.data.data;
};

// Get compliance document category by ID
export const getComplianceDocumentCategoryById = async (
    id: string
): Promise<ComplianceDocumentCategoryPojo> => {
    const url = `${API_V1}/compliance/document-category/${id}`;
    const response = await axios.get<ApiResponse<ComplianceDocumentCategoryPojo>>(url);
    return response.data.data as ComplianceDocumentCategoryPojo;
};

// Add a new compliance document category
export const addComplianceDocumentCategory = async (
    category: Omit<ComplianceDocumentCategoryDTO, 'id'>
): Promise<ApiResponse<ComplianceDocumentCategoryDTO>> => {
    const response = await axios.post<ApiResponse<ComplianceDocumentCategoryDTO>>(
        `${API_V1}/compliance/document-category`,
        category
    );
    return response.data;
};

// Update an existing compliance document category
export const updateComplianceDocumentCategory = async (
    id: string,
    category: Partial<ComplianceDocumentCategoryDTO>
): Promise<ApiResponse<ComplianceDocumentCategoryDTO>> => {
    const response = await axios.put<ApiResponse<ComplianceDocumentCategoryDTO>>(
        `${API_V1}/compliance/document-category/${id}`,
        category
    );
    return response.data;
};

// Delete a compliance document category
export const deleteComplianceDocumentCategory = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/compliance/document-category/${id}`);
};
