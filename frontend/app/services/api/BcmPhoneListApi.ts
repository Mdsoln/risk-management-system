import axios from 'axios';
import {
    BcmPhoneListDTO,
    BcmPhoneListPojo,
    PaginationResult,
    ApiResponse,
} from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch paginated list of phone lists
export const getBcmPhoneLists = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmPhoneListPojo>> => {
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
    const url = `${API_V1}/bcm/phone-list/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmPhoneListPojo> }>(url);
    return response.data.data; // Return paginated data directly
};

// Fetch a single phone list entry by ID
export const getBcmPhoneListById = async (
    id: string
): Promise<BcmPhoneListPojo> => {
    const url = `${API_V1}/bcm/phone-list/${id}`;
    const response = await axios.get<ApiResponse<BcmPhoneListPojo | null>>(url);

    const data = response.data.data;

    // Validate null or invalid response
    if (!data) {
        throw new Error('Phone list entry not found.');
    }

    // Ensure data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmPhoneListPojo; // Safe return type
};

// Add a new phone list entry
export const addBcmPhoneList = async (
    phoneList: BcmPhoneListDTO
): Promise<ApiResponse<BcmPhoneListDTO>> => {
    const response = await axios.post<ApiResponse<BcmPhoneListDTO>>(
        `${API_V1}/bcm/phone-list`,
        phoneList
    );
    return response.data;
};

// Update an existing phone list entry
export const updateBcmPhoneList = async (
    id: string,
    phoneList: Partial<BcmPhoneListDTO>
): Promise<ApiResponse<BcmPhoneListDTO>> => {
    const response = await axios.put<ApiResponse<BcmPhoneListDTO>>(
        `${API_V1}/bcm/phone-list/${id}`,
        phoneList
    );
    return response.data;
};

// Delete a phone list entry
export const deleteBcmPhoneList = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/phone-list/${id}`);
};
