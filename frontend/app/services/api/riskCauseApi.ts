import axios from 'axios';
import { RiskCause, ApiResponse, RiskCauseDto, PaginationResult } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of risk causes with optional filters
export const getRiskCauses = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<RiskCause>> => {
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
    const url = `${API_V1}/risk-cause/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<RiskCause> }>(url);
    return response.data.data;
};

// Get a single risk cause by ID
export const getRiskCauseById = async (id: string): Promise<RiskCause> => {
    const url = `${API_V1}/risk-cause/${id}`;
    const response = await axios.get<ApiResponse<RiskCause>>(url);
    return response.data.data as RiskCause;
};

// Add a new risk cause
export const addRiskCause = async (riskCause: Omit<RiskCauseDto, 'id'>): Promise<ApiResponse<RiskCauseDto>> => {
    try {
        const response = await axios.post<ApiResponse<RiskCauseDto>>(`${API_V1}/risk-cause`, riskCause);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Update an existing risk cause
export const updateRiskCause = async (id: string, riskCause: Partial<RiskCauseDto>): Promise<ApiResponse<RiskCauseDto>> => {
    try {
        const response = await axios.put<ApiResponse<RiskCauseDto>>(`${API_V1}/risk-cause/${id}`, riskCause);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a risk cause
export const deleteRiskCause = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-cause/${id}`);
};
