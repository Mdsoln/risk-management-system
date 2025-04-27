import axios from 'axios';
import { RiskIndicatorActionPlanDto, ApiResponse } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a single Risk Indicator Action Plan by ID
export const getRiskIndicatorActionPlanById = async (id: string): Promise<RiskIndicatorActionPlanDto> => {
    const url = `${API_V1}/risk-indicator-action-plan/${id}`;
    const response = await axios.get<ApiResponse<RiskIndicatorActionPlanDto>>(url);
    return response.data.data as RiskIndicatorActionPlanDto;
};

// Add a new Risk Indicator Action Plan
export const addRiskIndicatorActionPlan = async (
    riskIndicatorActionPlan: Omit<RiskIndicatorActionPlanDto, 'id'>
): Promise<ApiResponse<RiskIndicatorActionPlanDto>> => {
    try {
        const response = await axios.post<ApiResponse<RiskIndicatorActionPlanDto>>(
            `${API_V1}/risk-indicator-action-plan`,
            riskIndicatorActionPlan
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Update an existing Risk Indicator Action Plan
export const updateRiskIndicatorActionPlan = async (
    id: string,
    riskIndicatorActionPlan: Partial<RiskIndicatorActionPlanDto>
): Promise<ApiResponse<RiskIndicatorActionPlanDto>> => {
    try {
        const response = await axios.put<ApiResponse<RiskIndicatorActionPlanDto>>(
            `${API_V1}/risk-indicator-action-plan/${id}`,
            riskIndicatorActionPlan
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a Risk Indicator Action Plan
export const deleteRiskIndicatorActionPlan = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-indicator-action-plan/${id}`);
};
