// BcmDependencyApi.ts

import axios from 'axios';
import {
    BcmDependencyDTO,
    BcmDependencyPojo,
    PaginationResult,
    ApiResponse,
} from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Get a paginated list of BCM dependencies
export const getBcmDependencies = async (
    page = 0,
    size = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmDependencyPojo>> => {
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
    const url = `${API_V1}/bcm/dependency/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmDependencyPojo> }>(url);
    return response.data.data;
};

// Get a single BCM dependency by ID
export const getBcmDependencyById = async (
    id: string
): Promise<BcmDependencyPojo> => {
    const url = `${API_V1}/bcm/dependency/${id}`;
    const response = await axios.get<ApiResponse<BcmDependencyPojo | null>>(url);

    const data = response.data.data;
    if (!data) {
        throw new Error('Dependency not found.');
    }
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: array instead of object.');
    }
    return data;
};

// Add a new BCM dependency
export const addBcmDependency = async (
    dependency: BcmDependencyDTO
): Promise<ApiResponse<BcmDependencyDTO>> => {
    const url = `${API_V1}/bcm/dependency`;
    const response = await axios.post<ApiResponse<BcmDependencyDTO>>(url, dependency);
    return response.data;
};

// Update an existing BCM dependency
export const updateBcmDependency = async (
    id: string,
    dependency: Partial<BcmDependencyDTO>
): Promise<ApiResponse<BcmDependencyDTO>> => {
    const url = `${API_V1}/bcm/dependency/${id}`;
    const response = await axios.put<ApiResponse<BcmDependencyDTO>>(url, dependency);
    return response.data;
};

// Delete a BCM dependency
export const deleteBcmDependency = async (id: string): Promise<void> => {
    const url = `${API_V1}/bcm/dependency/${id}`;
    await axios.delete(url);
};
