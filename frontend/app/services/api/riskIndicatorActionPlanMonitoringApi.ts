import axios from 'axios';
import { RiskIndicatorActionPlanMonitoringDto, ApiResponse } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a single Risk Indicator Action Plan Monitoring by ID
export const getRiskIndicatorActionPlanMonitoringById = async (id: string): Promise<RiskIndicatorActionPlanMonitoringDto> => {
    const url = `${API_V1}/risk-indicator-action-plan-monitoring/${id}`;
    const response = await axios.get<ApiResponse<RiskIndicatorActionPlanMonitoringDto>>(url);
    return response.data.data as RiskIndicatorActionPlanMonitoringDto;
};

// Add a new Risk Indicator Action Plan Monitoring
export const addRiskIndicatorActionPlanMonitoring = async (
    monitoring: Omit<RiskIndicatorActionPlanMonitoringDto, 'id'>
): Promise<ApiResponse<RiskIndicatorActionPlanMonitoringDto>> => {
    try {
        const response = await axios.post<ApiResponse<RiskIndicatorActionPlanMonitoringDto>>(
            `${API_V1}/risk-indicator-action-plan-monitoring`,
            monitoring
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

// Update an existing Risk Indicator Action Plan Monitoring
export const updateRiskIndicatorActionPlanMonitoring = async (
    id: string,
    monitoring: Partial<RiskIndicatorActionPlanMonitoringDto>
): Promise<ApiResponse<RiskIndicatorActionPlanMonitoringDto>> => {
    try {
        const response = await axios.put<ApiResponse<RiskIndicatorActionPlanMonitoringDto>>(
            `${API_V1}/risk-indicator-action-plan-monitoring/${id}`,
            monitoring
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

// Delete a Risk Indicator Action Plan Monitoring
export const deleteRiskIndicatorActionPlanMonitoring = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-indicator-action-plan-monitoring/${id}`);
};
