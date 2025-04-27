import axios from 'axios';
import { ApiResponse, ResidualRisk } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of residual risks
export const getResidualRisks = async (): Promise<ResidualRisk[]> => {
    const url = `${API_V1}/residual-risk`;
    const response = await axios.get<ApiResponse<ResidualRisk[] | ResidualRisk[][]>>(url);
    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as ResidualRisk[];
    }

    return data as ResidualRisk[];
};

// Get a single residual risk by ID
export const getResidualRiskById = async (id: string): Promise<ResidualRisk> => {
    const url = `${API_V1}/residual-risk/${id}`;
    const response = await axios.get<ApiResponse<ResidualRisk>>(url);
    if (response.data.data === null || Array.isArray(response.data.data)) {
        throw new Error('Residual risk not found');
    }
    return response.data.data as ResidualRisk;
};

// Add a new residual risk
export const addResidualRisk = async (residualRisk: Omit<ResidualRisk, 'id'>): Promise<ResidualRisk> => {
    const response = await axios.post<ApiResponse<ResidualRisk>>(`${API_V1}/residual-risk`, residualRisk);
    return response.data.data as ResidualRisk;
};

// Update an existing residual risk
export const updateResidualRisk = async (id: string, residualRisk: Partial<ResidualRisk>): Promise<ResidualRisk> => {
    try {
        const response = await axios.put<ApiResponse<ResidualRisk>>(`${API_V1}/residual-risk/${id}`, residualRisk);
        return response.data.data as ResidualRisk;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a residual risk
export const deleteResidualRisk = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/residual-risk/${id}`);
};
