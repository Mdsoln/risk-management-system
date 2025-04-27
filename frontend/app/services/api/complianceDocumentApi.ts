import axios from 'axios';
import {
    ComplianceDocumentDTO,
    ComplianceDocumentPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of compliance documents with optional filters
export const getComplianceDocuments = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<ComplianceDocumentPojo>> => {
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
    const url = `${API_V1}/compliance/document/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<ComplianceDocumentPojo> }>(url);
    return response.data.data;
};

// Get a single compliance document by ID
export const getComplianceDocumentById = async (
    id: string
): Promise<ComplianceDocumentPojo> => {
    const url = `${API_V1}/compliance/document/${id}`;
    const response = await axios.get<ApiResponse<ComplianceDocumentPojo | null>>(url);

    // Validate if data is null or invalid
    if (!response.data.data) {
        throw new Error('Compliance Document not found.');
    }

    // Ensure data is not an array
    if (Array.isArray(response.data.data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return response.data.data as ComplianceDocumentPojo; // Return safe type
};


// Add a new compliance document
export const addComplianceDocument = async (
    document: ComplianceDocumentDTO
): Promise<ApiResponse<ComplianceDocumentDTO>> => {
    const response = await axios.post<ApiResponse<ComplianceDocumentDTO>>(
        `${API_V1}/compliance/document`,
        document
    );
    return response.data;
};

// Update an existing compliance document
export const updateComplianceDocument = async (
    id: string,
    document: Partial<ComplianceDocumentDTO>
): Promise<ApiResponse<ComplianceDocumentDTO>> => {
    const response = await axios.put<ApiResponse<ComplianceDocumentDTO>>(
        `${API_V1}/compliance/document/${id}`,
        document
    );
    return response.data;
};

// Delete a compliance document
export const deleteComplianceDocument = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/compliance/document/${id}`);
};
