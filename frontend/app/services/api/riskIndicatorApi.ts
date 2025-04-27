import axios from 'axios';
import { RiskIndicator, ApiResponse, RiskIndicatorDto, PaginationResult } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of risk indicators with optional filters
export const getRiskIndicators = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<RiskIndicator>> => {
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
    const url = `${API_V1}/risk-indicator/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<RiskIndicator> }>(url);
    return response.data.data;
};

// Get a single risk indicator by ID
export const getRiskIndicatorById = async (id: string): Promise<RiskIndicator> => {
    const url = `${API_V1}/risk-indicator/${id}`;
    const response = await axios.get<ApiResponse<RiskIndicator>>(url);
    return response.data.data as RiskIndicator;
};

// Add a new risk indicator
export const addRiskIndicator = async (riskIndicator: Omit<RiskIndicatorDto, 'id'>): Promise<ApiResponse<RiskIndicatorDto>> => {
    try {
        const response = await axios.post<ApiResponse<RiskIndicatorDto>>(`${API_V1}/risk-indicator`, riskIndicator);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Update an existing risk indicator
export const updateRiskIndicator = async (id: string, riskIndicator: Partial<RiskIndicatorDto>): Promise<ApiResponse<RiskIndicatorDto>> => {
    try {
        const response = await axios.put<ApiResponse<RiskIndicatorDto>>(`${API_V1}/risk-indicator/${id}`, riskIndicator);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a risk indicator
export const deleteRiskIndicator = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-indicator/${id}`);
};
