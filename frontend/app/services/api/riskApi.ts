import axios from 'axios';
import { Risk, PaginationResult, ApiResponse, RiskDto, RiskAssessmentHistoryDto, SimplifiedListRisk, RiskActionPlanMonitoringDto, RiskWithActionPlans } from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of risks with optional filters
export const getRisks = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<Risk>> => {
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
    const url = `${API_V1}/risk/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<Risk> }>(url);
    return response.data.data;
};

// Get a single risk by ID
export const getRiskById = async (id: string): Promise<Risk> => {
    const url = `${API_V1}/risk/${id}`;
    const response = await axios.get<ApiResponse<Risk>>(url);
    return response.data.data as Risk;
};

// Add a new risk
export const addRisk = async (risk: Omit<RiskDto, 'id'>): Promise<ApiResponse<RiskDto>> => {
    try {
        const response = await axios.post<ApiResponse<RiskDto>>(`${API_V1}/risk`, risk);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }

};

// Update an existing risk
export const updateRisk = async (id: string, risk: Partial<RiskDto>): Promise<ApiResponse<RiskDto>> => {
    try {
        const response = await axios.put<ApiResponse<RiskDto>>(`${API_V1}/risk/${id}`, risk);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a risk
export const deleteRisk = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk/${id}`);
};


// Submit a risk for assessment
export const submitForAssessmentApi = async (id: string): Promise<ApiResponse<Risk>> => {
    try {
        const url = `${API_V1}/risk/submit-for-assessment/${id}`;
        const response = await axios.put<ApiResponse<Risk>>(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Department owner review risk
export const departmentOwnerReviewRisk = async (id: string, riskAssessmentHistoryDto: RiskAssessmentHistoryDto): Promise<ApiResponse<Risk>> => {
    try {
        const url = `${API_V1}/risk/department-owner-risk-assessment/${id}`;
        const response = await axios.put<ApiResponse<Risk>>(url, riskAssessmentHistoryDto);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};


// Fetch risks ready for monitoring along with their action plans
export const getRisksReadyForMonitoring = async (): Promise<RiskWithActionPlans[]> => {
    const url = `${API_V1}/risk/ready-for-monitoring`;
    const response = await axios.get<ApiResponse<RiskWithActionPlans[] | RiskWithActionPlans[][]>>(url);

    // Ensure the data is not null
    const data = response.data.data;

    if (!data) {
        // If data is null, return an empty array or handle accordingly
        return [];
    }

    // Flatten the array if it is nested
    const flattenedData = Array.isArray(data[0]) ? (data as RiskWithActionPlans[][]).flat() : (data as RiskWithActionPlans[]);

    return flattenedData;
};

// Submit monitoring data for risk action plans
export const riskActionPlanMonitoringReporting = async (
    monitoringData: RiskActionPlanMonitoringDto[]
): Promise<ApiResponse<void>> => {
    try {
        console.log("monitoringData", monitoringData)

        const url = `${API_V1}/risk/risk-action-plan-monitoring-reporting`;
        const response = await axios.post<ApiResponse<void>>(url, monitoringData);
        console.log("response", response)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};
