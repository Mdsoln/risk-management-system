import axios from 'axios';
import {
    BcmDamageAssessmentDTO,
    BcmDamageAssessmentPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of BCM damage assessments with optional filters
export const getBcmDamageAssessments = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmDamageAssessmentPojo>> => {
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
    const url = `${API_V1}/bcm/damage-assessment/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmDamageAssessmentPojo> }>(url);
    return response.data.data; // Return paginated data directly
};

// Get a single damage assessment by ID
export const getBcmDamageAssessmentById = async (
    id: string
): Promise<BcmDamageAssessmentPojo> => {
    const url = `${API_V1}/bcm/damage-assessment/${id}`;
    const response = await axios.get<ApiResponse<BcmDamageAssessmentPojo | null>>(url);

    const data = response.data.data;

    // Validate if the data is null
    if (!data) {
        throw new Error('Damage Assessment not found.');
    }

    // Ensure the data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmDamageAssessmentPojo; // Safe type return
};

// Add a new damage assessment
export const addBcmDamageAssessment = async (
    assessment: BcmDamageAssessmentDTO
): Promise<ApiResponse<BcmDamageAssessmentDTO>> => {
    const response = await axios.post<ApiResponse<BcmDamageAssessmentDTO>>(
        `${API_V1}/bcm/damage-assessment`,
        assessment
    );
    return response.data;
};

// Update an existing damage assessment
export const updateBcmDamageAssessment = async (
    id: string,
    assessment: Partial<BcmDamageAssessmentDTO>
): Promise<ApiResponse<BcmDamageAssessmentDTO>> => {
    const response = await axios.put<ApiResponse<BcmDamageAssessmentDTO>>(
        `${API_V1}/bcm/damage-assessment/${id}`,
        assessment
    );
    return response.data;
};

// Delete a damage assessment
export const deleteBcmDamageAssessment = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/damage-assessment/${id}`);
};
