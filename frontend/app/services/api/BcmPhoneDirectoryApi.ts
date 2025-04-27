import axios from 'axios';
import {
    BcmPhoneDirectoryDTO,
    BcmPhoneDirectoryPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of BCM phone directory entries with optional filters
export const getBcmPhoneDirectories = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmPhoneDirectoryPojo>> => {
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
    const url = `${API_V1}/bcm/phone-directory/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmPhoneDirectoryPojo> }>(url);
    return response.data.data; // Return the paginated result
};

// Get a single phone directory entry by ID
export const getBcmPhoneDirectoryById = async (
    id: string
): Promise<BcmPhoneDirectoryPojo> => {
    const url = `${API_V1}/bcm/phone-directory/${id}`;
    const response = await axios.get<ApiResponse<BcmPhoneDirectoryPojo | null>>(url);

    const data = response.data.data;

    // Validate if the data is null
    if (!data) {
        throw new Error('Phone Directory entry not found.');
    }

    // Ensure the data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmPhoneDirectoryPojo; // Return the validated data
};

// Add a new phone directory entry
export const addBcmPhoneDirectory = async (
    entry: BcmPhoneDirectoryDTO
): Promise<ApiResponse<BcmPhoneDirectoryPojo>> => {
    const response = await axios.post<ApiResponse<BcmPhoneDirectoryPojo>>(
        `${API_V1}/bcm/phone-directory`,
        entry
    );
    return response.data;
};

// Update an existing phone directory entry
export const updateBcmPhoneDirectory = async (
    id: string,
    entry: Partial<BcmPhoneDirectoryDTO>
): Promise<ApiResponse<BcmPhoneDirectoryPojo>> => {
    const response = await axios.put<ApiResponse<BcmPhoneDirectoryPojo>>(
        `${API_V1}/bcm/phone-directory/${id}`,
        entry
    );
    return response.data;
};

// Delete a phone directory entry
export const deleteBcmPhoneDirectory = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/phone-directory/${id}`);
};
