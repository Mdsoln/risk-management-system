import axios from 'axios';
import {
    BcmResourceAcquisitionDTO,
    BcmResourceAcquisitionPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of BCM resource acquisitions with optional filters
export const getBcmResourceAcquisitions = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmResourceAcquisitionPojo>> => {
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
    const url = `${API_V1}/bcm/resource-acquisition/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmResourceAcquisitionPojo> }>(url);
    return response.data.data; // Return paginated data directly
};

// Get a single resource acquisition by ID
export const getBcmResourceAcquisitionById = async (
    id: string
): Promise<BcmResourceAcquisitionPojo> => {
    const url = `${API_V1}/bcm/resource-acquisition/${id}`;
    const response = await axios.get<ApiResponse<BcmResourceAcquisitionPojo | null>>(url);

    const data = response.data.data;

    // Validate if the data is null
    if (!data) {
        throw new Error('Resource Acquisition not found.');
    }

    // Ensure the data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmResourceAcquisitionPojo; // Safe type return
};

// Add a new resource acquisition
export const addBcmResourceAcquisition = async (
    resource: BcmResourceAcquisitionDTO
): Promise<ApiResponse<BcmResourceAcquisitionDTO>> => {
    const response = await axios.post<ApiResponse<BcmResourceAcquisitionDTO>>(
        `${API_V1}/bcm/resource-acquisition`,
        resource
    );
    return response.data;
};

// Update an existing resource acquisition
export const updateBcmResourceAcquisition = async (
    id: string,
    resource: Partial<BcmResourceAcquisitionDTO>
): Promise<ApiResponse<BcmResourceAcquisitionDTO>> => {
    const response = await axios.put<ApiResponse<BcmResourceAcquisitionDTO>>(
        `${API_V1}/bcm/resource-acquisition/${id}`,
        resource
    );
    return response.data;
};

// Delete a resource acquisition
export const deleteBcmResourceAcquisition = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/resource-acquisition/${id}`);
};
