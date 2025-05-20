// types/api.ts
export interface FundObjective {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    name: string;
    description: string;
    businessProcess: BusinessProcess[];
    startDateTime: string;
    endDateTime: string;
}

export interface BusinessProcess {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    name: string;
    description: string;
    fundObjective: FundObjective;
    risks: Risk[];
    businessProcessOwnerDepartment: Department;
    startDateTime: string;
    endDateTime: string;
    startDateBeforeDueDate: boolean;


}



export interface RiskCause {
    id: string;
    description: string;
    riskId: string;

    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
}

export interface RiskOpportunity {
    id: string;
    description: string;
    riskId: string;

    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
}

export interface RiskDto {
    id?: string;
    name: string;
    description: string;
    riskAreaId: string;
    departmentId: string;
    businessProcessId: string;
    inherentRiskLikelihoodId: string;
    residualRiskLikelihoodId: string;
    residualRiskImpactId: string;
    inherentRiskImpactId: string;
    riskIndicators?: RiskIndicatorDto[];
    riskControls?: RiskControlDto[];
    riskCauses?: RiskCauseDto[];
    riskOpportunities?: RiskOpportunityDto[];
    riskActionPlans?: RiskActionPlanDto[]
}

// Defining the structure for individual cells in the risk matrix
export interface RiskMatrixCell {
    level: string;  // e.g., risk level like 'Low', 'Moderate', 'High'
    color: string;  // Color representing the risk level (e.g., green, yellow, red)
    highlighted?: boolean;  // Optional, indicating whether the cell should be highlighted
}


// Defining the structure of the risk matrix result
export interface RiskMatrixResult {
    matrix: RiskMatrixCell[][];  // 2D array representing the risk matrix
    likelihoodScore: number;     // The overall likelihood score
    impactScore: number;         // The overall impact score
    impactScores: number[];      // Array of impact scores (e.g., [1, 2, 3, 4, 5])
    likelihoodScores: number[];  // Array of likelihood scores (e.g., [1, 2, 3, 4, 5])
}

export interface InherentRiskMatrixResult extends RiskMatrixResult { }

export interface ResidualRiskMatrixResult extends RiskMatrixResult { }

export interface Risk {
    id: string;
    name: string;
    description: string;
    riskArea: RiskArea;
    department: Department;
    businessProcess: BusinessProcess;
    inherentRisk: InherentRisk;
    residualRisk: ResidualRisk;
    riskIndicators: RiskIndicator[];
    riskControls: RiskControl[];
    riskCauses: RiskCause[];
    riskActionPlans: RiskActionPlan[];
    riskOpportunities: RiskOpportunity[];
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;

    residualRiskMatrixResult: ResidualRiskMatrixResult;
    inherentRiskMatrixResult: InherentRiskMatrixResult;

    riskAssessmentStatus: RiskAssessmentStatusWrapper
}



export interface RiskAreaCategory {
    id: string;
    name: string;
    description: string;
    code: string;
}

export interface RiskArea {
    id: string;
    name: string;
    description: string;
    code: string;
    riskAreaCategory: RiskAreaCategory;
}

export interface DepartmentOwner {
    id: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    department: Department;
}

export interface Department {
    id: string;
    name: string;
    description: string;
    code: string;
    reference?: string; // optional since it's nullable in the Java entity
}

export interface Directorate {
    id: string;
    name: string;
    description: string;
    code: string;
    reference?: string; // optional since it's nullable in the Java entity
    type: string;
    shortName: string;
    departments: Department[]; // array of Department objects
}



// risk owner begins

export interface Permission {
    id: string;
    code: string;
    name: string;
    description: string;
}

export interface Role {
    id: string;
    code: string;
    name: string;
    description: string;
    permissions: Permission[];
}

export interface UserType {
    id: string;
    name: string;
    description: string;
    code: string;
}

export interface ProfileDetails {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobile: string;
    phone: string;
    nin: string;
    jobTitle: string;
    position: string;
    office: string;
    status: string;
}

export interface RiskDepartmentOwner {
    id: string;
    user: User;

}
export interface User {
    id: string;
    nin: string;
    profileDetails: ProfileDetails;
    userType: UserType;
    roles: Role[];
    department: Department;
}
// export interface RiskOwner {
//     id: string;
//     name: string;
//     description: string;
//     code: string;
//     riskDepartmentOwners: RiskDepartmentOwner[]
// }


// risk owner ends

export interface RiskIndicator {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    indicator: string;
    description: string;
    purpose: string;
    risk: Risk;
    monitoringFrequency: MonitoringFrequency;
    measurement: Measurement;
    riskIndicatorThresholds: RiskIndicatorThreshold[]
    riskIndicatorActionPlanMonitoring: RiskIndicatorActionPlanMonitoring
}

export interface RiskIndicatorDto {
    id?: string;
    indicator: string;
    description: string;
    purpose: string;
    riskId: string;
    monitoringFrequencyId: string;
    measurementId: string;
    riskIndicatorThresholds: RiskIndicatorThresholdDto[];
    riskIndicatorActionPlans?: RiskIndicatorActionPlanDto[];


}


export interface RiskControlDto {
    id?: string;
    name: string;
    description: string;
    purpose: string;
    riskId: string;
    departmentId: string;
    controlIndicators: ControlIndicatorDto[];
}

export interface ControlIndicatorDto {
    id?: string;
    keyControlIndicator: string;
    description: string;
    purpose: string;
    riskControlId: string;
    monitoringFrequencyId: string;
    measurementId: string;
    controlIndicatorThresholds: ControlIndicatorThresholdDto[];
}


export interface MonitoringFrequency {
    id: string;
    frequency: string;
    frequencyDescription: string;
    code: string;
    level: number;
}




export interface MonitoringFrequency {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    frequency: string;
    frequencyDescription: string;
    code: string;
    level: number;
    controlIndicators: ControlIndicator[];
}


export interface RiskIndicatorThreshold {
    id: string;
    thresholdCategory: ThresholdCategory;
    comparisonConditions: ComparisonCondition[];
}
export interface ControlIndicatorThreshold {
    id: string;
    thresholdCategory: ThresholdCategory;
    comparisonConditions: ComparisonCondition[];
}


export interface ComparisonCondition {
    id: string;
    comparisonOperator: ComparisonOperator;
    bound: string;
}



export interface ComparisonConditionDto {
    id?: string;
    comparisonOperatorId: string;
    bound: string;
}

export interface ControlIndicatorThresholdDto {
    id?: string;
    thresholdCategoryId: string;
    comparisonConditions: ComparisonConditionDto[];
}

export interface RiskIndicatorThresholdDto {
    id?: string;
    thresholdCategoryId: string;
    comparisonConditions: ComparisonConditionDto[];
}


export interface RiskCauseDto {
    id?: string;
    description: string;
    riskId: string;
}


export interface RiskOpportunityDto {
    id?: string;
    description: string;
    riskId: string;
}

export interface ThresholdCategory {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    name: string;
    description: string;
    code: string;

}

export interface ControlIndicator {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    keyControlIndicator: string;
    description: string;
    purpose: string;
    riskControl: RiskControl;
    controlIndicatorDepartmentOwner: DepartmentOwner;
    monitoringFrequency: MonitoringFrequency;
    measurement: Measurement;
    controlIndicatorThresholds: ControlIndicatorThreshold[]
}

export interface RiskControl {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    name: string;
    description: string;
    purpose: string;
    risk: Risk;
    controlIndicators: ControlIndicator[];
    measurement: Measurement;
    department: Department;
}

export interface Measurement {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    name: string;
    description: string;
    code: string;
    comparisonOperators: ComparisonOperator[];
}

export interface ComparisonOperator {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    name: string;
    description: string;
    code: string;
    symbol: string;
    measurement: string;
}

export interface RiskCause {
    id: string;
    description: string;
    risk: string;
}

export interface RiskOpportunity {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    description: string;
    risk: string;
}

export interface RiskRating {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    likelihood: Likelihood;
    impact: Impact;
    inherentRiskRating: number;
    riskLevel: string;
    riskColor: string;
    riskDescription: string;
}

// export interface Likelihood {
//     id: string;
//     createdAt: string;
//     updatedAt: string;
//     createdBy: string;
//     updatedBy: string;
//     status: string;
//     likelihoodCategory: string;
//     categoryDefinition: string;
//     score: number;
// }

// export interface Impact {
//     id: string;
//     createdAt: string;
//     updatedAt: string;
//     createdBy: string;
//     updatedBy: string;
//     status: string;
//     severityRanking: string;
//     assessment: string;
//     score: number;
// }

export interface Likelihood {
    id: string;
    likelihoodCategory: string;
    categoryDefinition: string;
    score: number;
    colorName: string;
    color: string;
}

export interface Impact {
    id: string;
    severityRanking: string;
    assessment: string;
    score: number;
    colorName: string;
    color: string;
}
export interface InherentRisk {
    likelihood: Likelihood;
    impact: Impact;
    inherentRiskRating: number;
    riskLevel: string;
    riskColor: string;
    riskDescription: string;
}

export interface ResidualRisk {
    likelihood: Likelihood;
    impact: Impact;
    residualRiskRating: number;
    riskLevel: string;
    riskColor: string;
    riskDescription: string;
}

// RESPONSE

export interface ApiResponse<T> {
    code: string | number;
    message: string;
    data: T | T[] | null;
    errors: any;
    description: string;
    refId: string;
}

export interface PaginationResult<T> {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasPrevious: boolean;
    hasNext: boolean;
    items: T[];
}


export interface PaginationParams {
    startDate: string;
    endDate: string;
    filterDateBy: string;
    searchKeyword: string;
    page: number;
    size: number;
    sort?: string[]; // Make sort parameter optional
}

export interface FieldError {
    field: string;
    message: string;
}

export interface ErrorResponse {
    code: string;
    message: string;
    description?: string;
    refId?: string;
    errors?: FieldError[];
}

export interface ErrorState {
    message: string | null;
    description: string | null;
    errors: FieldError[] | null;
    refId: string | null;
    details?: string | null;  // Add details property
    stack?: string | null;    // Add stack property
}



export interface AxiosErrorResponse {
    response: {
        data: ErrorResponse;
    };
}


export interface RiskStatus {
    id: string;
    name: string;
    code: string;
    description: string;
    type: string;
    createdBy: string;
    createdAt: string;
}
export interface RiskChampion {
    id: string;
    championName: string;
    championEmail: string;
    championPhone: string;
    nin: string;
    departmentOwner: DepartmentOwner;
}

export interface RiskAssessmentLevel {
    id: string;
    name: string;
    description: string;
    current: boolean;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface RiskAssessmentHistory {
    id: string;
    riskStatus: RiskStatus;
    riskChampion: RiskChampion;
    departmentOwner: DepartmentOwner;
    riskAssessmentLevel: RiskAssessmentLevel;
    timestamp: string;
    performedBy: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface RiskAssessmentStatus {
    id: string;
    riskStatus: RiskStatus;
    riskAssessmentFlow: RiskAssessmentFlow;
    createdAt: string;
    updatedAt: string;
}

export interface RiskAssessmentFlow {
    id: string;
    riskAssessmentHistories: RiskAssessmentHistory[];
    riskAssessmentLevels: RiskAssessmentLevel[];
    riskAssessmentStatus: RiskAssessmentStatus;
}

export interface RiskAssessmentStatusWrapper {
    id: string;
    riskStatus: RiskStatus;
    riskAssessmentFlow: RiskAssessmentFlow;
    createdAt: string;
    updatedAt: string;
}

export interface RiskAssessmentHistoryDto {
    riskStatusId: string;
    comment: string;

}


// auth 
export interface LoginDto {
    nin: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken?: string;
    scope?: string;
}



export interface RiskIndicatorActionPlanMonitoring {
    id: string;
    startDatetime: string;
    endDatetime: string;
    value: string;
    measurement: Measurement;
}

export interface RiskIndicatorActionPlan {
    id: string;
    name: string;
    description: string;
    startDatetime: string;
    endDatetime: string;
    department: Department;
    riskIndicator: RiskIndicator;
    riskIndicatorActionPlanMonitoring: RiskIndicatorActionPlanMonitoring[];
}


export interface RiskIndicatorActionPlanMonitoringDto {
    id?: string;
    startDatetime: string;
    endDatetime: string;
    value: string;
    measurementId: string;
    riskIndicatorActionPlanId: string;
}

export interface RiskIndicatorActionPlanDto {
    id?: string;
    name: string;
    description: string;
    startDatetime: string;
    endDatetime: string;
    departmentId: string;
    riskIndicatorId: string;
    riskIndicatorActionPlanMonitoring: RiskIndicatorActionPlanMonitoringDto[];
}


// action plans
export interface RiskActionPlanMonitoring {
    id: string;
    comment: string;
    monitoringDatetime: string;
    riskActionPlan: RiskActionPlan;
}

export interface RiskActionPlan {
    id: string;
    name: string;
    description: string;
    startDatetime: string;
    endDatetime: string;
    risk: Risk; // Risk associated with this action plan
    riskActionPlanMonitoring: RiskActionPlanMonitoring[];
}

export interface RiskActionPlanMonitoringDto {
    id?: string;
    comment: string;
    monitoringDatetime: string;
    riskActionPlanId: string;
}

export interface RiskActionPlanDto {
    id?: string;
    name: string;
    description: string;
    startDatetime: string;
    endDatetime: string;
    riskId: string;
    riskActionPlanMonitoring: RiskActionPlanMonitoringDto[];
}



export interface SimplifiedListRisk {
    id: string;
    name: string;
}

export interface RiskWithActionPlans {
    risk: SimplifiedListRisk;
    actionPlans: SimplifiedRiskActionPlan[];
}

export interface SimplifiedRiskActionPlan {
    id: string;
    name: string;
    description: string;
    startDatetime: string; // ISO format date string
    endDatetime: string; // ISO format date string
}





// DTO for ComplianceEntityCategory
export interface ComplianceEntityCategoryDTO {
    id?: string; // Make id optional but explicitly typed
    code: string;
    name: string;
    description: string;
}

// Pojo for ComplianceEntityCategory
export interface ComplianceEntityCategoryPojo {
    id: string;
    code: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}


// Compliance Entity DTO
export interface ComplianceEntityDTO {
    id?: string; // Optional for edit
    name: string;
    description: string;
    categoryId: string; // Reference to ComplianceEntityCategory
}

// Compliance Entity Pojo
export interface ComplianceEntityPojo {
    id: string;
    name: string;
    description: string;
    category: ComplianceEntityCategoryPojo; // Associated category details
}


// ComplianceDocumentCategory Data Transfer Object (DTO)
export interface ComplianceDocumentCategoryDTO {
    id?: string;
    code: string;
    name: string;
    description: string;
}

// ComplianceDocumentCategory Plain Old Java Object (Pojo)
export interface ComplianceDocumentCategoryPojo {
    id: string;
    code: string;
    name: string;
    description: string;
}


// ComplianceDocumentDTO Type
// export interface ComplianceDocumentDTO {
//     id?: string;

//     name: string;
//     year: number;
//     description: string;
//     entityId: string;
//     documentCategoryId: string;
//     departmentId: string;
// }

// ComplianceDocumentPojo Type
// export interface ComplianceDocumentPojo {
//     id: string;
//     name: string;
//     year: number;
//     description: string;
//     entity: ComplianceEntityPojo;
//     documentCategory: ComplianceDocumentCategoryPojo;
//     department: DepartmentPojo;
// }

// DepartmentPojo Type
export interface DepartmentPojo {
    id: string;
    name: string;
    code: string;
    description: string;
}


// DTO for creating or updating BCM Resource Acquisition
export interface BcmResourceAcquisitionDTO {
    id?: string;

    resource: string;
    qtyNeeded: number;
    qtyAvailable: number;
    qtyToGet: number;
    source?: string;
    done: boolean;
}

// Pojo for displaying BCM Resource Acquisition details
export interface BcmResourceAcquisitionPojo {
    id: string;
    resource: string;
    qtyNeeded: number;
    qtyAvailable: number;
    qtyToGet: number;
    source?: string;
    done: boolean;
}


// DTO for creating and updating Damage Assessments
export interface BcmDamageAssessmentDTO {
    id?: string; // Optional for updates
    supplier: string;
    name: string;
    phoneWork?: string;
    phoneHome?: string;
    phoneMobile?: string;
}

// Read-only Pojo for displaying damage assessments
export interface BcmDamageAssessmentPojo {
    id: string;
    supplier: string;
    name: string;
    phoneWork: string;
    phoneHome: string;
    phoneMobile: string;
}

export interface BcmSystemListingDTO {
    id?: string; // Optional for create, required for update
    businessArea: string;
    applicationsAndDatabase?: string;
    telephones?: string;
    mobilePhones?: string;
    modem?: string;
    fax?: string;
    laserPrinter?: string;
    photocopier?: string;
    others?: string;
}

export interface BcmSystemListingPojo {
    id: string;
    businessArea: string;
    applicationsAndDatabase: string;
    telephones: string;
    mobilePhones: string;
    modem: string;
    fax: string;
    laserPrinter: string;
    photocopier: string;
    others: string;
}


export interface BcmPhoneDirectoryPojo {
    id: string;
    roleName: string;
    phoneNumber: string;
    room?: string; // Optional field
}

export interface BcmPhoneDirectoryDTO {
    id?: string; // Optional for create
    roleName: string;
    phoneNumber: string;
    room?: string; // Optional field
}


export interface BcmPhoneListPojo {
    id: string;
    roleOrName: string;
    phonesRequired: number;
    isdAccess: boolean;
    installedOk: boolean;
    testedOk: boolean;
    comments?: string;
}

export interface BcmPhoneListDTO {
    id?: string; // Optional for updates
    roleOrName: string;
    phonesRequired: number;
    isdAccess: boolean;
    installedOk: boolean;
    testedOk: boolean;
    comments?: string;
}

export interface BcmBattleBoxItemPojo {
    id: string;
    itemName: string;
    description?: string;
    quantity: number;
    location?: string;
    lastUpdated: string;
    responsiblePerson: string;
}

export interface BcmBattleBoxItemDTO {
    id?: string; // Optional for updates
    itemName: string;
    description?: string;
    quantity: number;
    location?: string;
    lastUpdated: string;
    responsiblePerson: string;
}


export interface BcmUrgentResourceDTO {
    id?: string; // Optional for updates
    resourceName: string;
    description?: string;
    quantity: number;
    category: string;
    location: string;
    responsiblePerson?: string;
    contactNumber?: string;
}

export interface BcmUrgentResourcePojo {
    id: string;
    resourceName: string;
    description?: string;
    quantity: number;
    category: string;
    location: string;
    responsiblePerson?: string;
    contactNumber?: string;
}

export interface BcmSupplierDTO {
    id?: string; // Optional for update operations
    name: string;
    phoneWork?: string;
    phoneHome?: string;
    phoneMobile?: string;
    description?: string;
}

export interface BcmSupplierPojo {
    id: string;
    name: string;
    phoneWork?: string;
    phoneHome?: string;
    phoneMobile?: string;
    description?: string;
}

export interface BcmStaffDTO {
    id?: string; // Optional for updates
    name: string;
    role: string;
    mobileNumber: string;
    location: string;
    alternateContactPerson?: string;
    alternateLocation?: string;
    nextOfKin?: string;
}

export interface BcmStaffPojo {
    id: string;
    name: string;
    role: string;
    mobileNumber: string;
    location: string;
    alternateContactPerson?: string;
    alternateLocation?: string;
    nextOfKin?: string;
}

export interface BcmProcessDTO {
    id?: string; // Optional for updates
    name: string; // Name of the process
    priorityRanking: number; // Priority ranking of the process
    rto: string; // Recovery Time Objective
    rpo: string; // Recovery Point Objective
    dependencies?: string; // Dependencies related to the process
    responsibleParties?: string; // Responsible parties for the process
    departmentId: string; // ID of the department responsible for the process
}

export interface BcmProcessPojo {
    id: string; // Unique ID of the process
    name: string; // Name of the process
    priorityRanking: number; // Priority ranking of the process
    rto: string; // Recovery Time Objective
    rpo: string; // Recovery Point Objective
    dependencies?: string; // Dependencies related to the process
    responsibleParties?: string; // Responsible parties for the process
    department: DepartmentPojo; // Department responsible for the process
}




export interface BcmSubProcessPojo {
    id: string; // Unique ID of the sub-process
    name: string; // Name of the sub-process
    priorityRanking: number; // Priority ranking of the sub-process
    rto: string; // Recovery Time Objective
    rpo: string; // Recovery Point Objective
    dependencies?: string; // Dependencies related to the sub-process
    responsibleParties?: string; // Responsible parties for the sub-process
    quantitativeImpact?: string; // Quantitative impact of the sub-process
    process: BcmProcessPojo; // Reference to the parent BCM process
}

export interface BcmSubProcessDTO {
    id?: string; // Optional for updates (included in frontend DTO)
    name: string; // Name of the sub-process
    priorityRanking: number; // Priority ranking of the sub-process
    rto: string; // Recovery Time Objective
    rpo: string; // Recovery Point Objective
    dependencies?: string; // Dependencies related to the sub-process
    responsibleParties?: string; // Responsible parties for the sub-process
    quantitativeImpact?: string; // Quantitative impact of the sub-process
    processId: string; // ID of the parent BCM process
}

export interface BcmImpactAssessmentPojo {
    id: string;
    impactType: string;
    severityLevel: number;
    timeToRecover: string;
    process: BcmProcessPojo; // Reference to BCM process
    subProcess?: BcmSubProcessPojo; // Optional reference to BCM sub-process
}

export interface BcmImpactAssessmentDTO {
    id?: string; // Optional for creation, required for updates
    impactType: string; // Impact Type
    severityLevel: number; // Severity Level
    timeToRecover: string; // Time to Recover
    processId: string; // ID of the associated process
    subProcessId?: string; // Optional ID of the associated sub-process
}

// In your @/app/types/api.ts (or similar) you might have:

export interface BcmDependencyDTO {
    id?: string; // optional if editing
    name: string;
    description?: string;
}

export interface BcmDependencyPojo {
    id: string;
    name: string;
    description?: string;
}

export interface StatusReportDTO {
    id?: string;
    departmentId: string; // Changed from businessUnit
    reportDate: string;
    reportTime: string;
    staff?: string;
    customers?: string;
    workInProgress?: string;
    financialImpact?: string;
    operatingConditions?: string;
}

export interface StatusReportPojo {
    id: string;
    reportDate: string;
    reportTime: string;
    staff?: string;
    customers?: string;
    workInProgress?: string;
    financialImpact?: string;
    operatingConditions?: string;
    department: { id: string; name: string }; // Changed to department
}


/**
 * DTO for Fund Objective
 */
export interface FundObjectiveDTO {
    id?: string;
    name: string;
    description: string;
    startDateTime: string; // ISO 8601 format
    endDateTime: string;   // ISO 8601 format
}

/**
 * Pojo for Fund Objective
 */
export interface FundObjectivePojo {
    id: string;
    name: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    businessProcesses: BusinessProcessPojo[]; // Relation to Business Processes
}
export interface BusinessProcessPojo {
    id: string;
    name: string;
    description: string;
    startDateTime: string; // ISO string format
    endDateTime: string;   // ISO string format
    fundObjective: FundObjectivePojo; // Reference to fund objective
    businessProcessOwnerDepartment: DepartmentPojo; // Added department reference

    // Audit fields
    createdAt: string; // ISO string format
    updatedAt: string; // ISO string format
    createdBy: string;
    updatedBy: string;

    // Record status
    status: RecordStatus;
}

export enum RecordStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    ARCHIVED = 'ARCHIVED'
}


// Simplified Fund Objective Pojo
export interface SimplifiedFundObjectivePojo {
    id: string;
    name: string;
    description: string;
}

// Simplified Department Pojo
export interface SimplifiedDepartmentPojo {
    id: string;
    name: string;
    code: string;
    description: string;
}

// Simplified Business Process Pojo
export interface SimplifiedBusinessProcessPojo {
    id: string;
    name: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    fundObjective: SimplifiedFundObjectivePojo;
    businessProcessOwnerDepartment: SimplifiedDepartmentPojo; // Added for consistency
}

// Business Process DTO
export interface BusinessProcessDTO {
    id?: string;
    name: string;
    description: string;
    fundObjectiveId: string;
    businessProcessOwnerDepartmentId: string; // Added for department
    startDateTime: string;
    endDateTime: string;
}



export interface RiskRegistryPojo {
    id: string;            // Unique identifier for the risk registry
    riskId: string;        // Associated risk ID
}
export interface RiskRegistryDTO {
    id?: string;           // Optional ID (used for editing existing records)
    riskId: string;        // Associated risk ID
}





// ---

export interface ComplianceStatusDTO {
    id?: string; // Optional for updates
    statusName: string;
    score: number; // 1.0, 0.5, or 0.0
    description: string;
}


export interface ComplianceStatusPojo {
    id: string;
    statusName: string;
    score: number; // 1.0, 0.5, or 0.0
    description: string;
}
export interface RegulatoryComplianceMatrixDTO {
    id?: string;
    itemNumber: string;
    details: string;
    departmentId: string;
    documentId?: string; // Added explicit documentId
    sections: RegulatoryComplianceMatrixSectionDTO[];
}



export interface RegulatoryComplianceMatrixPojo {
    id: string;
    itemNumber: string;
    details: string;
    department: DepartmentPojo;
    documentId?: string; // Added explicit documentId
    sections: RegulatoryComplianceMatrixSectionPojo[];
}


export interface RegulatoryComplianceMatrixSectionDTO {
    id?: string;
    itemNumber: string;
    details: string;
    complianceStatusId: string;
    comment?: string;
    recommendation?: string;
    matrixId: string; // Added explicit matrixId
}

export interface RegulatoryComplianceMatrixSectionPojo {
    id: string;
    itemNumber: string;
    details: string;
    comment?: string;
    recommendation?: string;
    complianceStatus: ComplianceStatusPojo;
    matrixId: string; // Added explicit matrixId
}



export interface ComplianceDocumentDTO {
    id?: string; // Optional for updates
    name: string;
    year: number;
    description: string;
    entityId: string; // ComplianceEntity ID
    documentCategoryId: string; // ComplianceDocumentCategory ID
    departmentId: string; // Department ID
    complianceMatrices: RegulatoryComplianceMatrixDTO[]; // List of RegulatoryComplianceMatrixDTO
}



export interface ComplianceDocumentPojo {
    id: string;
    name: string;
    year: number;
    description: string;
    entity: ComplianceEntityPojo; // Object Reference
    documentCategory: ComplianceDocumentCategoryPojo; // Object Reference
    department: DepartmentPojo; // Object Reference
    complianceMatrices: RegulatoryComplianceMatrixPojo[]; // One-to-Many Relationship
}

