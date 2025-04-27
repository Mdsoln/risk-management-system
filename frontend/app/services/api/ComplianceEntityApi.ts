import axios from 'axios';
import {
    ComplianceEntityDTO,
    ComplianceEntityPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch paginated list
export const getComplianceEntities = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<ComplianceEntityPojo>> => {
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
    const url = `${API_V1}/compliance/entity/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<ComplianceEntityPojo> }>(url);
    return response.data.data;
};

// Get compliance entity by ID
export const getComplianceEntityById = async (
    id: string
): Promise<ComplianceEntityPojo> => {
    const url = `${API_V1}/compliance/entity/${id}`;
    const response = await axios.get<ApiResponse<ComplianceEntityPojo | null>>(url);

    if (!response.data.data) {
        throw new Error('Compliance Entity not found.');
    }

    return response.data.data as ComplianceEntityPojo; // Ensure correct type
};

// Add new compliance entity
export const addComplianceEntity = async (
    entity: ComplianceEntityDTO
): Promise<ApiResponse<ComplianceEntityDTO>> => {
    const response = await axios.post<ApiResponse<ComplianceEntityDTO>>(
        `${API_V1}/compliance/entity`,
        entity
    );
    return response.data;
};

// Update existing compliance entity
export const updateComplianceEntity = async (
    id: string,
    entity: Partial<ComplianceEntityDTO>
): Promise<ApiResponse<ComplianceEntityDTO>> => {
    const response = await axios.put<ApiResponse<ComplianceEntityDTO>>(
        `${API_V1}/compliance/entity/${id}`,
        entity
    );
    return response.data;
};

// Delete compliance entity
export const deleteComplianceEntity = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/compliance/entity/${id}`);
};
