import axios from 'axios';
import { ApiResponse, InherentRisk } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of inherent risks
export const getInherentRisks = async (): Promise<InherentRisk[]> => {
    const url = `${API_V1}/inherent-risk`;
    const response = await axios.get<ApiResponse<InherentRisk[] | InherentRisk[][]>>(url);
    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as InherentRisk[];
    }

    return data as InherentRisk[];
};

// Get a single inherent risk by ID
export const getInherentRiskById = async (id: string): Promise<InherentRisk> => {
    const url = `${API_V1}/inherent-risk/${id}`;
    const response = await axios.get<ApiResponse<InherentRisk>>(url);
    if (response.data.data === null || Array.isArray(response.data.data)) {
        throw new Error('Inherent risk not found');
    }
    return response.data.data as InherentRisk;
};

// Add a new inherent risk
export const addInherentRisk = async (inherentRisk: Omit<InherentRisk, 'id'>): Promise<InherentRisk> => {
    const response = await axios.post<ApiResponse<InherentRisk>>(`${API_V1}/inherent-risk`, inherentRisk);
    return response.data.data as InherentRisk;
};

// Update an existing inherent risk
export const updateInherentRisk = async (id: string, inherentRisk: Partial<InherentRisk>): Promise<InherentRisk> => {
    try {
        const response = await axios.put<ApiResponse<InherentRisk>>(`${API_V1}/inherent-risk/${id}`, inherentRisk);
        return response.data.data as InherentRisk;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete an inherent risk
export const deleteInherentRisk = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/inherent-risk/${id}`);
};
