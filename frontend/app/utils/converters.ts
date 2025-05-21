import { 
    BusinessProcess, 
    BusinessProcessPojo, 
    FundObjective, 
    FundObjectivePojo 
} from '@/app/types/api';

/**
 * Converts a BusinessProcessPojo to a BusinessProcess
 * @param pojo The BusinessProcessPojo to convert
 * @returns A BusinessProcess object
 */
export const convertPojoToBusinessProcess = (pojo: BusinessProcessPojo): BusinessProcess => {
    return {
        id: pojo.id,
        name: pojo.name,
        description: pojo.description,
        startDateTime: pojo.startDateTime,
        endDateTime: pojo.endDateTime,
        fundObjective: null as any, // This will be set properly when used in context
        businessProcessOwnerDepartment: pojo.businessProcessOwnerDepartment,
        // Add missing properties required by BusinessProcess
        risks: [], // Default to empty array
        startDateBeforeDueDate: true, // Default to true
        // Copy audit fields
        createdAt: pojo.createdAt,
        updatedAt: pojo.updatedAt,
        createdBy: pojo.createdBy,
        updatedBy: pojo.updatedBy,
        status: pojo.status,
    };
};

/**
 * Converts a FundObjectivePojo to a FundObjective
 * @param pojo The FundObjectivePojo to convert
 * @param currentData Optional current FundObjective data to preserve
 * @returns A FundObjective object
 */
export const convertPojoToFundObjective = (pojo: FundObjectivePojo, currentData?: FundObjective | null): FundObjective => {
    // Convert each BusinessProcessPojo to BusinessProcess
    const convertedBusinessProcesses = (pojo.businessProcesses || []).map(bp => convertPojoToBusinessProcess(bp));
    
    return {
        id: pojo.id,
        name: pojo.name,
        description: pojo.description,
        startDateTime: pojo.startDateTime,
        endDateTime: pojo.endDateTime,
        // Use converted business processes
        businessProcess: convertedBusinessProcesses,
        // Preserve existing audit fields if available, or use defaults
        createdAt: currentData?.createdAt || new Date().toISOString(),
        updatedAt: currentData?.updatedAt || new Date().toISOString(),
        createdBy: currentData?.createdBy || '',
        updatedBy: currentData?.updatedBy || '',
        status: currentData?.status || 'ACTIVE',
    };
};