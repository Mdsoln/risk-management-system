import axios from 'axios';
import { ApiResponse, Likelihood } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of likelihoods
export const getLikelihoods = async (): Promise<Likelihood[]> => {
    const url = `${API_V1}/likelihood`;
    const response = await axios.get<ApiResponse<Likelihood[] | Likelihood[][]>>(url);
    let data = response.data.data ?? [];

    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as Likelihood[];
    }

    return data as Likelihood[];
};

// Get a single likelihood by ID
export const getLikelihoodById = async (id: string): Promise<Likelihood> => {
    const url = `${API_V1}/likelihood/${id}`;
    const response = await axios.get<ApiResponse<Likelihood>>(url);
    if (response.data.data === null || Array.isArray(response.data.data)) {
        throw new Error('Likelihood not found');
    }
    return response.data.data as Likelihood;
};

// Add a new likelihood
export const addLikelihood = async (likelihood: Omit<Likelihood, 'id'>): Promise<Likelihood> => {
    const response = await axios.post<ApiResponse<Likelihood>>(`${API_V1}/likelihood`, likelihood);
    return response.data.data as Likelihood;
};

// Update an existing likelihood
export const updateLikelihood = async (id: string, likelihood: Partial<Likelihood>): Promise<Likelihood> => {
    try {
        const response = await axios.put<ApiResponse<Likelihood>>(`${API_V1}/likelihood/${id}`, likelihood);
        return response.data.data as Likelihood;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a likelihood
export const deleteLikelihood = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/likelihood/${id}`);
};
