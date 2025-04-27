import axios from 'axios';
import {
    RegulatoryComplianceMatrixSectionDTO,
    RegulatoryComplianceMatrixSectionPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of compliance matrix sections with optional filters
export const getRegulatoryComplianceMatrixSections = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<RegulatoryComplianceMatrixSectionPojo>> => {
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
    const url = `${API_V1}/compliance/matrix-section/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<RegulatoryComplianceMatrixSectionPojo> }>(url);
    return response.data.data;
};

// Get a single compliance matrix section by ID
export const getRegulatoryComplianceMatrixSectionById = async (
    id: string
): Promise<RegulatoryComplianceMatrixSectionPojo> => {
    const url = `${API_V1}/compliance/matrix-section/${id}`;
    const response = await axios.get<ApiResponse<RegulatoryComplianceMatrixSectionPojo | null>>(url);

    if (!response.data.data) {
        throw new Error('Compliance Matrix Section not found.');
    }

    if (Array.isArray(response.data.data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return response.data.data as RegulatoryComplianceMatrixSectionPojo;
};

// Add a new compliance matrix section
export const addRegulatoryComplianceMatrixSection = async (
    section: RegulatoryComplianceMatrixSectionDTO
): Promise<ApiResponse<RegulatoryComplianceMatrixSectionDTO>> => {
    const response = await axios.post<ApiResponse<RegulatoryComplianceMatrixSectionDTO>>(
        `${API_V1}/compliance/matrix-section`,
        section
    );
    return response.data;
};

// Update an existing compliance matrix section
export const updateRegulatoryComplianceMatrixSection = async (
    id: string,
    section: Partial<RegulatoryComplianceMatrixSectionDTO>
): Promise<ApiResponse<RegulatoryComplianceMatrixSectionDTO>> => {
    const response = await axios.put<ApiResponse<RegulatoryComplianceMatrixSectionDTO>>(
        `${API_V1}/compliance/matrix-section/${id}`,
        section
    );
    return response.data;
};

// Delete a compliance matrix section
export const deleteRegulatoryComplianceMatrixSection = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/compliance/matrix-section/${id}`);
};
