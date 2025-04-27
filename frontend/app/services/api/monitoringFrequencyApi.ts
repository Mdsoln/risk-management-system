import axios from 'axios';
import { ApiResponse, MonitoringFrequency } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of monitoring frequencies
export const getMonitoringFrequencies = async (): Promise<MonitoringFrequency[]> => {
    const url = `${API_V1}/monitoring-frequency`;
    const response = await axios.get<ApiResponse<MonitoringFrequency[] | MonitoringFrequency[][]>>(url);

    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as MonitoringFrequency[];
    }
    // console.log(data)
    return data as MonitoringFrequency[];
};

// Get a single monitoring frequency by ID
export const getMonitoringFrequencyById = async (id: string): Promise<MonitoringFrequency> => {
    const url = `${API_V1}/monitoring-frequency/${id}`;
    const response = await axios.get<ApiResponse<MonitoringFrequency>>(url);
    if (response.data.data === null || Array.isArray(response.data.data)) {
        throw new Error('Monitoring frequency not found');
    }
    return response.data.data as MonitoringFrequency;
};

// Add a new monitoring frequency
export const addMonitoringFrequency = async (frequency: Omit<MonitoringFrequency, 'id'>): Promise<MonitoringFrequency> => {
    const response = await axios.post<ApiResponse<MonitoringFrequency>>(`${API_V1}/monitoring-frequency`, frequency);
    return response.data.data as MonitoringFrequency;
};

// Update an existing monitoring frequency
export const updateMonitoringFrequency = async (id: string, frequency: Partial<MonitoringFrequency>): Promise<MonitoringFrequency> => {
    try {
        const response = await axios.put<ApiResponse<MonitoringFrequency>>(`${API_V1}/monitoring-frequency/${id}`, frequency);
        return response.data.data as MonitoringFrequency;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a monitoring frequency
export const deleteMonitoringFrequency = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/monitoring-frequency/${id}`);
};
