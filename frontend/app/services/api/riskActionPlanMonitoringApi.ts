import axios from 'axios';
import { RiskActionPlanMonitoring, ApiResponse, RiskActionPlanMonitoringDto, PaginationResult } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of risk action plan monitorings with optional filters
export const getRiskActionPlanMonitorings = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<RiskActionPlanMonitoring>> => {
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
    const url = `${API_V1}/risk-action-plan-monitoring/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<RiskActionPlanMonitoring> }>(url);
    return response.data.data;
};

// Get a single risk action plan monitoring by ID
export const getRiskActionPlanMonitoringById = async (id: string): Promise<RiskActionPlanMonitoring> => {
    const url = `${API_V1}/risk-action-plan-monitoring/${id}`;
    const response = await axios.get<ApiResponse<RiskActionPlanMonitoring>>(url);
    return response.data.data as RiskActionPlanMonitoring;
};

// Add a new risk action plan monitoring
export const addRiskActionPlanMonitoring = async (riskActionPlanMonitoring: Omit<RiskActionPlanMonitoringDto, 'id'>): Promise<ApiResponse<RiskActionPlanMonitoringDto>> => {
    try {
        const response = await axios.post<ApiResponse<RiskActionPlanMonitoringDto>>(`${API_V1}/risk-action-plan-monitoring`, riskActionPlanMonitoring);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Update an existing risk action plan monitoring
export const updateRiskActionPlanMonitoring = async (id: string, riskActionPlanMonitoring: Partial<RiskActionPlanMonitoringDto>): Promise<ApiResponse<RiskActionPlanMonitoringDto>> => {
    try {
        const response = await axios.put<ApiResponse<RiskActionPlanMonitoringDto>>(`${API_V1}/risk-action-plan-monitoring/${id}`, riskActionPlanMonitoring);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a risk action plan monitoring
export const deleteRiskActionPlanMonitoring = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-action-plan-monitoring/${id}`);
};
