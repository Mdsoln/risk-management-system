// thresholdCategoryApi.ts
import axios from 'axios';
import { ApiResponse, ThresholdCategory } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of threshold categories
export const getThresholdCategories = async (): Promise<ThresholdCategory[]> => {
    const url = `${API_V1}/threshold-category/high-and-low`;
    const response = await axios.get<ApiResponse<ThresholdCategory[] | ThresholdCategory[][]>>(url);
    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as ThresholdCategory[];
    }

    return data as ThresholdCategory[];
};

// Get a single threshold category by ID
export const getThresholdCategoryById = async (id: string): Promise<ThresholdCategory> => {
    const url = `${API_V1}/threshold-category/${id}`;
    const response = await axios.get<ApiResponse<ThresholdCategory>>(url);
    if (response.data.data === null || Array.isArray(response.data.data)) {
        throw new Error('Threshold category not found');
    }
    return response.data.data as ThresholdCategory;
};

// Add a new threshold category
export const addThresholdCategory = async (thresholdCategory: Omit<ThresholdCategory, 'id'>): Promise<ThresholdCategory> => {
    const response = await axios.post<ApiResponse<ThresholdCategory>>(`${API_V1}/threshold-category`, thresholdCategory);
    return response.data.data as ThresholdCategory;
};

// Update an existing threshold category
export const updateThresholdCategory = async (id: string, thresholdCategory: Partial<ThresholdCategory>): Promise<ThresholdCategory> => {
    try {
        const response = await axios.put<ApiResponse<ThresholdCategory>>(`${API_V1}/threshold-category/${id}`, thresholdCategory);
        return response.data.data as ThresholdCategory;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a threshold category
export const deleteThresholdCategory = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/threshold-category/${id}`);
};
