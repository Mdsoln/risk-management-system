import axios from 'axios';
import { RiskControl, ApiResponse, RiskControlDto, PaginationResult } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of risk controls with optional filters
export const getRiskControls = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<RiskControl>> => {
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
    const url = `${API_V1}/risk-control/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<RiskControl> }>(url);
    return response.data.data;
};

// Get a single risk control by ID
export const getRiskControlById = async (id: string): Promise<RiskControl> => {
    const url = `${API_V1}/risk-control/${id}`;
    const response = await axios.get<ApiResponse<RiskControl>>(url);
    return response.data.data as RiskControl;
};

// Add a new risk control
export const addRiskControl = async (riskControl: Omit<RiskControlDto, 'id'>): Promise<ApiResponse<RiskControlDto>> => {
    try {
        const response = await axios.post<ApiResponse<RiskControlDto>>(`${API_V1}/risk-control`, riskControl);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Update an existing risk control
export const updateRiskControl = async (id: string, riskControl: Partial<RiskControlDto>): Promise<ApiResponse<RiskControlDto>> => {
    try {
        const response = await axios.put<ApiResponse<RiskControlDto>>(`${API_V1}/risk-control/${id}`, riskControl);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a risk control
export const deleteRiskControl = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-control/${id}`);
};
