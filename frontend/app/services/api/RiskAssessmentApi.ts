import axios from 'axios';
import { ApiResponse, RiskStatus } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of risk statuses
export const getRiskStatuses = async (): Promise<RiskStatus[]> => {
    const url = `${API_V1}/risk-statuses`;
    const response = await axios.get<ApiResponse<RiskStatus[] | RiskStatus[][]>>(url);
    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as RiskStatus[];
    }

    return data as RiskStatus[];
};

// Fetch a list of risk statuses by type
export const getRiskStatusesByType = async (type: string): Promise<RiskStatus[]> => {
    const url = `${API_V1}/risk-statuses/type/${type}`;
    console.log("url:", url)
    const response = await axios.get<ApiResponse<RiskStatus[] | RiskStatus[][]>>(url);
    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as RiskStatus[];
    }

    return data as RiskStatus[];
};
