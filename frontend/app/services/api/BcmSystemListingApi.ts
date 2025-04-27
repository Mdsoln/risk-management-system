import axios from 'axios';
import {
    BcmSystemListingDTO,
    BcmSystemListingPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of system listings with optional filters
export const getBcmSystemListings = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmSystemListingPojo>> => {
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
    const url = `${API_V1}/bcm/system-listing/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmSystemListingPojo> }>(url);
    return response.data.data; // Return paginated data directly
};

// Get a single system listing by ID
export const getBcmSystemListingById = async (
    id: string
): Promise<BcmSystemListingPojo> => {
    const url = `${API_V1}/bcm/system-listing/${id}`;
    const response = await axios.get<ApiResponse<BcmSystemListingPojo | null>>(url);

    const data = response.data.data;

    // Validate if the data is null
    if (!data) {
        throw new Error('System Listing not found.');
    }

    // Ensure the data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmSystemListingPojo; // Safe type return
};

// Add a new system listing
export const addBcmSystemListing = async (
    listing: BcmSystemListingDTO
): Promise<ApiResponse<BcmSystemListingDTO>> => {
    const response = await axios.post<ApiResponse<BcmSystemListingDTO>>(
        `${API_V1}/bcm/system-listing`,
        listing
    );
    return response.data;
};

// Update an existing system listing
export const updateBcmSystemListing = async (
    id: string,
    listing: Partial<BcmSystemListingDTO>
): Promise<ApiResponse<BcmSystemListingDTO>> => {
    const response = await axios.put<ApiResponse<BcmSystemListingDTO>>(
        `${API_V1}/bcm/system-listing/${id}`,
        listing
    );
    return response.data;
};

// Delete a system listing
export const deleteBcmSystemListing = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/system-listing/${id}`);
};
