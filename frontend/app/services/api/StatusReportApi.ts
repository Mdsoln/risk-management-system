import axios from 'axios';
import {
    StatusReportDTO,
    StatusReportPojo,
    PaginationResult,
    ApiResponse,
} from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of status reports with optional filters
export const getStatusReportList = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<StatusReportPojo>> => {
    const params: Record<string, any> = {
        page,
        size,
        filterDateBy,
        sortDirection,
    };

    if (searchKeyword) params.searchKeyword = searchKeyword;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (sort.length > 0) params.sort = sort;

    const queryParams = new URLSearchParams(params as any).toString();
    const url = `${API_V1}/bcm/status-report/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<StatusReportPojo> }>(url);
    return response.data.data; // Return paginated data directly
};

// Get a single status report by ID
export const getStatusReportById = async (
    id: string
): Promise<StatusReportPojo> => {
    const url = `${API_V1}/bcm/status-report/${id}`;
    const response = await axios.get<ApiResponse<StatusReportPojo | null>>(url);

    const data = response.data.data;

    if (!data) {
        throw new Error('Status report not found.');
    }

    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as StatusReportPojo;
};

// Add a new status report
export const addStatusReport = async (
    report: StatusReportDTO
): Promise<ApiResponse<StatusReportDTO>> => {
    const response = await axios.post<ApiResponse<StatusReportDTO>>(
        `${API_V1}/bcm/status-report`,
        report
    );
    return response.data;
};

// Update an existing status report
export const updateStatusReport = async (
    id: string,
    report: Partial<StatusReportDTO>
): Promise<ApiResponse<StatusReportDTO>> => {
    const response = await axios.put<ApiResponse<StatusReportDTO>>(
        `${API_V1}/bcm/status-report/${id}`,
        report
    );
    return response.data;
};

// Delete a status report
export const deleteStatusReport = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/status-report/${id}`);
};
