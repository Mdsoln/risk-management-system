import axios from 'axios';
import { ApiResponse, Measurement } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of measurements
export const getMeasurements = async (): Promise<Measurement[]> => {
    const url = `${API_V1}/measurements`;
    const response = await axios.get<ApiResponse<Measurement[] | Measurement[][]>>(url);

    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as Measurement[];
    }
    return data as Measurement[];
};
