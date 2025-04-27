import axios from 'axios';
import { ApiResponse, Impact } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of impacts
export const getImpacts = async (): Promise<Impact[]> => {
    const url = `${API_V1}/impact`;
    const response = await axios.get<ApiResponse<Impact[] | Impact[][]>>(url);
    let data = response.data.data ?? [];

    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as Impact[];
    }

    return data as Impact[];
};

// Get a single impact by ID
export const getImpactById = async (id: string): Promise<Impact> => {
    const url = `${API_V1}/impact/${id}`;
    const response = await axios.get<ApiResponse<Impact>>(url);
    if (response.data.data === null || Array.isArray(response.data.data)) {
        throw new Error('Impact not found');
    }
    return response.data.data as Impact;
};

// Add a new impact
export const addImpact = async (impact: Omit<Impact, 'id'>): Promise<Impact> => {
    const response = await axios.post<ApiResponse<Impact>>(`${API_V1}/impact`, impact);
    return response.data.data as Impact;
};

// Update an existing impact
export const updateImpact = async (id: string, impact: Partial<Impact>): Promise<Impact> => {
    try {
        const response = await axios.put<ApiResponse<Impact>>(`${API_V1}/impact/${id}`, impact);
        return response.data.data as Impact;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete an impact
export const deleteImpact = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/impact/${id}`);
};
