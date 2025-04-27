import axios from 'axios';
import {
    BcmUrgentResourceDTO,
    BcmUrgentResourcePojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of urgent resources with optional filters
export const getBcmUrgentResources = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmUrgentResourcePojo>> => {
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
    const url = `${API_V1}/bcm/urgent-resource/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmUrgentResourcePojo> }>(url);
    return response.data.data;
};

// Get a single urgent resource by ID
export const getBcmUrgentResourceById = async (
    id: string
): Promise<BcmUrgentResourcePojo> => {
    const url = `${API_V1}/bcm/urgent-resource/${id}`;
    const response = await axios.get<ApiResponse<BcmUrgentResourcePojo | null>>(url);

    const data = response.data.data;

    // Validate if data is null or invalid
    if (!data) {
        throw new Error('Urgent Resource not found.');
    }

    // Ensure data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmUrgentResourcePojo; // Return valid data
};

// Add a new urgent resource
export const addBcmUrgentResource = async (
    resource: BcmUrgentResourceDTO
): Promise<ApiResponse<BcmUrgentResourceDTO>> => {
    const response = await axios.post<ApiResponse<BcmUrgentResourceDTO>>(
        `${API_V1}/bcm/urgent-resource`,
        resource
    );
    return response.data;
};

// Update an existing urgent resource
export const updateBcmUrgentResource = async (
    id: string,
    resource: Partial<BcmUrgentResourceDTO>
): Promise<ApiResponse<BcmUrgentResourceDTO>> => {
    const response = await axios.put<ApiResponse<BcmUrgentResourceDTO>>(
        `${API_V1}/bcm/urgent-resource/${id}`,
        resource
    );
    return response.data;
};

// Delete an urgent resource
export const deleteBcmUrgentResource = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/urgent-resource/${id}`);
};
