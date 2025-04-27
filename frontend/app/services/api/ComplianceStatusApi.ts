import axios from 'axios';
import {
    ComplianceStatusDTO,
    ComplianceStatusPojo,
    ApiResponse,
} from '@/app/types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch all compliance statuses
export const getComplianceStatuses = async (): Promise<ComplianceStatusPojo[]> => {
    const url = `${API_V1}/compliance/status/list`;
    const response = await axios.get<ApiResponse<ComplianceStatusPojo[]>>(url);
    return response.data.data as ComplianceStatusPojo[];
};

// Get compliance status by ID
export const getComplianceStatusById = async (
    id: string
): Promise<ComplianceStatusPojo> => {
    const url = `${API_V1}/compliance/status/${id}`;
    const response = await axios.get<ApiResponse<ComplianceStatusPojo>>(url);
    return response.data.data as ComplianceStatusPojo;
};

// Add a new compliance status
export const addComplianceStatus = async (
    status: Omit<ComplianceStatusDTO, 'id'>
): Promise<ApiResponse<ComplianceStatusDTO>> => {
    const response = await axios.post<ApiResponse<ComplianceStatusDTO>>(
        `${API_V1}/compliance/status`,
        status
    );
    return response.data;
};

// Update an existing compliance status
export const updateComplianceStatus = async (
    id: string,
    status: Partial<ComplianceStatusDTO>
): Promise<ApiResponse<ComplianceStatusDTO>> => {
    const response = await axios.put<ApiResponse<ComplianceStatusDTO>>(
        `${API_V1}/compliance/status/${id}`,
        status
    );
    return response.data;
};

// Delete a compliance status
export const deleteComplianceStatus = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/compliance/status/${id}`);
};