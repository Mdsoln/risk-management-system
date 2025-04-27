import axios from 'axios';
import { RiskOpportunity, ApiResponse, RiskOpportunityDto, PaginationResult } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of risk opportunities with optional filters
export const getRiskOpportunities = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<RiskOpportunity>> => {
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
    const url = `${API_V1}/risk-opportunity/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<RiskOpportunity> }>(url);
    return response.data.data;
};

// Get a single risk opportunity by ID
export const getRiskOpportunityById = async (id: string): Promise<RiskOpportunity> => {
    const url = `${API_V1}/risk-opportunity/${id}`;
    const response = await axios.get<ApiResponse<RiskOpportunity>>(url);
    return response.data.data as RiskOpportunity;
};

// Add a new risk opportunity
export const addRiskOpportunity = async (riskOpportunity: Omit<RiskOpportunityDto, 'id'>): Promise<ApiResponse<RiskOpportunityDto>> => {
    try {
        const response = await axios.post<ApiResponse<RiskOpportunityDto>>(`${API_V1}/risk-opportunity`, riskOpportunity);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Update an existing risk opportunity
export const updateRiskOpportunity = async (id: string, riskOpportunity: Partial<RiskOpportunityDto>): Promise<ApiResponse<RiskOpportunityDto>> => {
    try {
        const response = await axios.put<ApiResponse<RiskOpportunityDto>>(`${API_V1}/risk-opportunity/${id}`, riskOpportunity);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a risk opportunity
export const deleteRiskOpportunity = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-opportunity/${id}`);
};
