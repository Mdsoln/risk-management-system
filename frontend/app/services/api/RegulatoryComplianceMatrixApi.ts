import axios from 'axios';
import {
    RegulatoryComplianceMatrixDTO,
    RegulatoryComplianceMatrixPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of Regulatory Compliance Matrices
export const getRegulatoryComplianceMatrices = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<RegulatoryComplianceMatrixPojo>> => {
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
    const url = `${API_V1}/compliance/matrix/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<RegulatoryComplianceMatrixPojo> }>(url);
    return response.data.data;
};

// Get a single Regulatory Compliance Matrix by ID
export const getRegulatoryComplianceMatrixById = async (
    id: string
): Promise<RegulatoryComplianceMatrixPojo> => {
    const url = `${API_V1}/compliance/matrix/${id}`;
    const response = await axios.get<ApiResponse<RegulatoryComplianceMatrixPojo | null>>(url);

    if (!response.data.data) {
        throw new Error('Compliance Matrix not found.');
    }

    if (Array.isArray(response.data.data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return response.data.data as RegulatoryComplianceMatrixPojo;
};

// Add a new Regulatory Compliance Matrix
export const addRegulatoryComplianceMatrix = async (
    matrix: RegulatoryComplianceMatrixDTO
): Promise<ApiResponse<RegulatoryComplianceMatrixDTO>> => {
    const response = await axios.post<ApiResponse<RegulatoryComplianceMatrixDTO>>(
        `${API_V1}/compliance/matrix`,
        matrix
    );
    return response.data;
};

// Update an existing Regulatory Compliance Matrix
export const updateRegulatoryComplianceMatrix = async (
    id: string,
    matrix: Partial<RegulatoryComplianceMatrixDTO>
): Promise<ApiResponse<RegulatoryComplianceMatrixDTO>> => {
    const response = await axios.put<ApiResponse<RegulatoryComplianceMatrixDTO>>(
        `${API_V1}/compliance/matrix/${id}`,
        matrix
    );
    return response.data;
};

// Delete a Regulatory Compliance Matrix
export const deleteRegulatoryComplianceMatrix = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/compliance/matrix/${id}`);
};
