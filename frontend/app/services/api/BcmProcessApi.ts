import axios from 'axios';
import {
    BcmProcessDTO,
    BcmProcessPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of BCM processes with optional filters
export const getBcmProcessList = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmProcessPojo>> => {
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
    const url = `${API_V1}/bcm/process/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmProcessPojo> }>(url);
    return response.data.data;
};

// Get a single BCM process by ID
export const getBcmProcessById = async (
    id: string
): Promise<BcmProcessPojo> => {
    const url = `${API_V1}/bcm/process/${id}`;
    const response = await axios.get<ApiResponse<BcmProcessPojo | null>>(url);

    const data = response.data.data;

    if (!data) {
        throw new Error('BCM process not found.');
    }

    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmProcessPojo;
};

// Add a new BCM process
export const addBcmProcess = async (
    process: BcmProcessDTO
): Promise<ApiResponse<BcmProcessDTO>> => {
    const response = await axios.post<ApiResponse<BcmProcessDTO>>(
        `${API_V1}/bcm/process`,
        process
    );
    return response.data;
};

// Update an existing BCM process
export const updateBcmProcess = async (
    id: string,
    process: Partial<BcmProcessDTO>
): Promise<ApiResponse<BcmProcessDTO>> => {
    const response = await axios.put<ApiResponse<BcmProcessDTO>>(
        `${API_V1}/bcm/process/${id}`,
        process
    );
    return response.data;
};

// Delete a BCM process
export const deleteBcmProcess = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/process/${id}`);
};
