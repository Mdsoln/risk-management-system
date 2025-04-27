import axios from 'axios';
import {
    BcmStaffDTO,
    BcmStaffPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of staff members with optional filters
export const getBcmStaffList = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmStaffPojo>> => {
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
    const url = `${API_V1}/bcm/staff/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmStaffPojo> }>(url);
    return response.data.data; // Return paginated data directly
};

// Get a single staff member by ID
export const getBcmStaffById = async (
    id: string
): Promise<BcmStaffPojo> => {
    const url = `${API_V1}/bcm/staff/${id}`;
    const response = await axios.get<ApiResponse<BcmStaffPojo | null>>(url);

    const data = response.data.data;

    // Validate if the data is null
    if (!data) {
        throw new Error('Staff member not found.');
    }

    // Ensure the data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmStaffPojo; // Safe type return
};

// Add a new staff member
export const addBcmStaff = async (
    staff: BcmStaffDTO
): Promise<ApiResponse<BcmStaffDTO>> => {
    const response = await axios.post<ApiResponse<BcmStaffDTO>>(
        `${API_V1}/bcm/staff`,
        staff
    );
    return response.data;
};

// Update an existing staff member
export const updateBcmStaff = async (
    id: string,
    staff: Partial<BcmStaffDTO>
): Promise<ApiResponse<BcmStaffDTO>> => {
    const response = await axios.put<ApiResponse<BcmStaffDTO>>(
        `${API_V1}/bcm/staff/${id}`,
        staff
    );
    return response.data;
};

// Delete a staff member
export const deleteBcmStaff = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/staff/${id}`);
};
