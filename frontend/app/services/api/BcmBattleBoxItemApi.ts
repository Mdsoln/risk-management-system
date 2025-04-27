import axios from 'axios';
import {
    BcmBattleBoxItemDTO,
    BcmBattleBoxItemPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of Battle Box Items with optional filters
export const getBcmBattleBoxItems = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmBattleBoxItemPojo>> => {
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
    const url = `${API_V1}/bcm/battle-box-item/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmBattleBoxItemPojo> }>(url);
    return response.data.data;
};

// Get a single Battle Box Item by ID
export const getBcmBattleBoxItemById = async (
    id: string
): Promise<BcmBattleBoxItemPojo> => {
    const url = `${API_V1}/bcm/battle-box-item/${id}`;
    const response = await axios.get<ApiResponse<BcmBattleBoxItemPojo | null>>(url);

    const data = response.data.data;

    // Validate data is not null or an array
    if (!data) {
        throw new Error('Battle Box Item not found.');
    }
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmBattleBoxItemPojo; // Safe type return
};

// Add a new Battle Box Item
export const addBcmBattleBoxItem = async (
    item: BcmBattleBoxItemDTO
): Promise<ApiResponse<BcmBattleBoxItemDTO>> => {
    const response = await axios.post<ApiResponse<BcmBattleBoxItemDTO>>(
        `${API_V1}/bcm/battle-box-item`,
        item
    );
    return response.data;
};

// Update an existing Battle Box Item
export const updateBcmBattleBoxItem = async (
    id: string,
    item: Partial<BcmBattleBoxItemDTO>
): Promise<ApiResponse<BcmBattleBoxItemDTO>> => {
    const response = await axios.put<ApiResponse<BcmBattleBoxItemDTO>>(
        `${API_V1}/bcm/battle-box-item/${id}`,
        item
    );
    return response.data;
};

// Delete a Battle Box Item
export const deleteBcmBattleBoxItem = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/battle-box-item/${id}`);
};
