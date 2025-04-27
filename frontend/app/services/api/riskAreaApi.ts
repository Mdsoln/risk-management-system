// riskAreaApi.ts
import axios from 'axios';
import { ApiResponse, RiskArea } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of risk areas
export const getRiskAreas = async (): Promise<RiskArea[]> => {
    const url = `${API_V1}/risk-area`;
    const response = await axios.get<ApiResponse<RiskArea[] | RiskArea[][]>>(url);
    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as RiskArea[];
    }

    return data as RiskArea[];
};

// Get a single risk area by ID
export const getRiskAreaById = async (id: string): Promise<RiskArea> => {
    const url = `${API_V1}/risk-area/${id}`;
    const response = await axios.get<ApiResponse<RiskArea>>(url);
    if (response.data.data === null || Array.isArray(response.data.data)) {
        throw new Error('Risk area not found');
    }
    return response.data.data as RiskArea;
};

// Add a new risk area
export const addRiskArea = async (riskArea: Omit<RiskArea, 'id'>): Promise<RiskArea> => {
    const response = await axios.post<ApiResponse<RiskArea>>(`${API_V1}/risk-area`, riskArea);
    return response.data.data as RiskArea;
};

// Update an existing risk area
export const updateRiskArea = async (id: string, riskArea: Partial<RiskArea>): Promise<RiskArea> => {
    try {
        const response = await axios.put<ApiResponse<RiskArea>>(`${API_V1}/risk-area/${id}`, riskArea);
        return response.data.data as RiskArea;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a risk area
export const deleteRiskArea = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-area/${id}`);
};
