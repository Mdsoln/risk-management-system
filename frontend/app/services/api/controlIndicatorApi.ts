import axios from 'axios';
import { ControlIndicator, ApiResponse, ControlIndicatorDto, PaginationResult } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of control indicators with optional filters
export const getControlIndicators = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<ControlIndicator>> => {
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
    const url = `${API_V1}/control-indicator/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<ControlIndicator> }>(url);
    return response.data.data;
};

// Get a single control indicator by ID
export const getControlIndicatorById = async (id: string): Promise<ControlIndicator> => {
    const url = `${API_V1}/control-indicator/${id}`;
    const response = await axios.get<ApiResponse<ControlIndicator>>(url);
    return response.data.data as ControlIndicator;
};

// Add a new control indicator
export const addControlIndicator = async (controlIndicator: Omit<ControlIndicatorDto, 'id'>): Promise<ApiResponse<ControlIndicatorDto>> => {
    try {
        const response = await axios.post<ApiResponse<ControlIndicatorDto>>(`${API_V1}/control-indicator`, controlIndicator);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Update an existing control indicator
export const updateControlIndicator = async (id: string, controlIndicator: Partial<ControlIndicatorDto>): Promise<ApiResponse<ControlIndicatorDto>> => {
    try {
        const response = await axios.put<ApiResponse<ControlIndicatorDto>>(`${API_V1}/control-indicator/${id}`, controlIndicator);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a control indicator
export const deleteControlIndicator = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/control-indicator/${id}`);
};
