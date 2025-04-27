// comparisonOperatorApi.ts
import axios from 'axios';
import { ApiResponse, ComparisonOperator } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of comparison operators
export const getComparisonOperators = async (): Promise<ComparisonOperator[]> => {
    const url = `${API_V1}/comparison-operator`;
    const response = await axios.get<ApiResponse<ComparisonOperator[] | ComparisonOperator[][]>>(url);
    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as ComparisonOperator[];
    }

    return data as ComparisonOperator[];
};

// Get a single comparison operator by ID
export const getComparisonOperatorById = async (id: string): Promise<ComparisonOperator> => {
    const url = `${API_V1}/comparison-operator/${id}`;
    const response = await axios.get<ApiResponse<ComparisonOperator>>(url);
    if (response.data.data === null || Array.isArray(response.data.data)) {
        throw new Error('Comparison operator not found');
    }
    return response.data.data as ComparisonOperator;
};

// Add a new comparison operator
export const addComparisonOperator = async (comparisonOperator: Omit<ComparisonOperator, 'id'>): Promise<ComparisonOperator> => {
    const response = await axios.post<ApiResponse<ComparisonOperator>>(`${API_V1}/comparison-operator`, comparisonOperator);
    return response.data.data as ComparisonOperator;
};

// Update an existing comparison operator
export const updateComparisonOperator = async (id: string, comparisonOperator: Partial<ComparisonOperator>): Promise<ComparisonOperator> => {
    try {
        const response = await axios.put<ApiResponse<ComparisonOperator>>(`${API_V1}/comparison-operator/${id}`, comparisonOperator);
        return response.data.data as ComparisonOperator;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a comparison operator
export const deleteComparisonOperator = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/comparison-operator/${id}`);
};
