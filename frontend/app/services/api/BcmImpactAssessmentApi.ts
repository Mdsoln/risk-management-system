import axios from 'axios';
import { BcmImpactAssessmentDTO, BcmImpactAssessmentPojo, PaginationResult, ApiResponse } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of BCM impact assessments with optional filters
export const getBcmImpactAssessmentList = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmImpactAssessmentPojo>> => {
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
    const url = `${API_V1}/bcm/impact-assessment/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmImpactAssessmentPojo> }>(url);
    return response.data.data; // Return paginated data directly
};

// Get a single BCM impact assessment by ID
export const getBcmImpactAssessmentById = async (
    id: string
): Promise<BcmImpactAssessmentPojo> => {
    const url = `${API_V1}/bcm/impact-assessment/${id}`;
    const response = await axios.get<ApiResponse<BcmImpactAssessmentPojo | null>>(url);

    const data = response.data.data;

    // Validate if the data is null
    if (!data) {
        throw new Error('Impact assessment not found.');
    }

    // Ensure the data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmImpactAssessmentPojo;
};

// Add a new BCM impact assessment
export const addBcmImpactAssessment = async (
    assessment: BcmImpactAssessmentDTO
): Promise<ApiResponse<BcmImpactAssessmentDTO>> => {
    const response = await axios.post<ApiResponse<BcmImpactAssessmentDTO>>(
        `${API_V1}/bcm/impact-assessment`,
        assessment
    );
    return response.data;
};

// Update an existing BCM impact assessment
export const updateBcmImpactAssessment = async (
    id: string,
    assessment: Partial<BcmImpactAssessmentDTO>
): Promise<ApiResponse<BcmImpactAssessmentDTO>> => {
    const response = await axios.put<ApiResponse<BcmImpactAssessmentDTO>>(
        `${API_V1}/bcm/impact-assessment/${id}`,
        assessment
    );
    return response.data;
};

// Delete a BCM impact assessment
export const deleteBcmImpactAssessment = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/impact-assessment/${id}`);
};
