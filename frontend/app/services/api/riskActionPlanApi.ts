import axios from 'axios';
import { RiskActionPlan, ApiResponse, RiskActionPlanDto, PaginationResult } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of risk action plans with optional filters
export const getRiskActionPlans = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<RiskActionPlan>> => {
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
    const url = `${API_V1}/risk-action-plan/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<RiskActionPlan> }>(url);
    return response.data.data;
};

// Get a single risk action plan by ID
export const getRiskActionPlanById = async (id: string): Promise<RiskActionPlan> => {
    const url = `${API_V1}/risk-action-plan/${id}`;
    const response = await axios.get<ApiResponse<RiskActionPlan>>(url);
    return response.data.data as RiskActionPlan;
};

// Add a new risk action plan
export const addRiskActionPlan = async (riskActionPlan: Omit<RiskActionPlanDto, 'id'>): Promise<ApiResponse<RiskActionPlanDto>> => {
    try {
        const response = await axios.post<ApiResponse<RiskActionPlanDto>>(`${API_V1}/risk-action-plan`, riskActionPlan);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Update an existing risk action plan
export const updateRiskActionPlan = async (id: string, riskActionPlan: Partial<RiskActionPlanDto>): Promise<ApiResponse<RiskActionPlanDto>> => {
    try {
        const response = await axios.put<ApiResponse<RiskActionPlanDto>>(`${API_V1}/risk-action-plan/${id}`, riskActionPlan);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a risk action plan
export const deleteRiskActionPlan = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-action-plan/${id}`);
};
