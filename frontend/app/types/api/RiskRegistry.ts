// riskRegistry.ts

// Interface for RiskRegistry
export interface RiskRegistry {
    id: number;
    name: string;
    description: string;
    category: string;
    likelihood: number;
    impact: number;
    mitigationPlan?: string;
    status?: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for RiskCategory
export interface RiskCategory {
    id: number;
    name: string;
    description: string;
}

// Interface for RiskMitigationPlan
export interface RiskMitigationPlan {
    id: number;
    riskId: number;
    plan: string;
    responsible: string;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
}

