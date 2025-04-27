import axios from 'axios';
import { BcmSubProcessDTO, BcmSubProcessPojo, PaginationResult, ApiResponse } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of BCM sub-processes with optional filters
export const getBcmSubProcessList = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmSubProcessPojo>> => {
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
    const url = `${API_V1}/bcm/sub-process/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmSubProcessPojo> }>(url);
    return response.data.data; // Return paginated data directly
};

// Get a single BCM sub-process by ID
export const getBcmSubProcessById = async (
    id: string
): Promise<BcmSubProcessPojo> => {
    const url = `${API_V1}/bcm/sub-process/${id}`;
    const response = await axios.get<ApiResponse<BcmSubProcessPojo | null>>(url);

    const data = response.data.data;

    // Validate if the data is null
    if (!data) {
        throw new Error('BCM Sub-Process not found.');
    }

    // Ensure the data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmSubProcessPojo;
};

// Add a new BCM sub-process
export const addBcmSubProcess = async (
    process: BcmSubProcessDTO
): Promise<ApiResponse<BcmSubProcessDTO>> => {
    const response = await axios.post<ApiResponse<BcmSubProcessDTO>>(
        `${API_V1}/bcm/sub-process`,
        process
    );
    return response.data;
};

// Update an existing BCM sub-process
export const updateBcmSubProcess = async (
    id: string,
    process: Partial<BcmSubProcessDTO>
): Promise<ApiResponse<BcmSubProcessDTO>> => {
    const response = await axios.put<ApiResponse<BcmSubProcessDTO>>(
        `${API_V1}/bcm/sub-process/${id}`,
        process
    );
    return response.data;
};

// Delete a BCM sub-process
export const deleteBcmSubProcess = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/sub-process/${id}`);
};
