import React from 'react';
import { RiskMatrixResult } from '@/app/types/api'; // Import your existing RiskMatrixResult interface
import AggregatedRiskMatrix from './AggregatedRiskMatrix';
import { Card } from 'antd';

const residualRiskData: RiskMatrixResult = {
    matrix: [
        [
            { level: 'Moderate', color: '#ffff00', highlighted: false },
            { level: 'Major', color: '#ffcc00', highlighted: false },
            { level: 'Major', color: '#ffcc00', highlighted: false },
            { level: 'Extreme', color: '#ff0000', highlighted: false },
            { level: 'Extreme', color: '#ff0000', highlighted: false }
        ],
        [
            { level: 'Moderate', color: '#ffff00', highlighted: false },
            { level: 'Moderate', color: '#ffff00', highlighted: false },
            { level: 'Major', color: '#ffcc00', highlighted: false },
            { level: 'Major', color: '#ffcc00', highlighted: false },
            { level: 'Extreme', color: '#ff0000', highlighted: false }
        ],
        [
            { level: 'Minor', color: '#99ff99', highlighted: false },
            { level: 'Moderate', color: '#ffff00', highlighted: false },
            { level: 'Moderate', color: '#ffff00', highlighted: false },
            { level: 'Major', color: '#ffcc00', highlighted: false },
            { level: 'Major', color: '#ffcc00', highlighted: false }
        ],
        [
            { level: 'Minor', color: '#99ff99', highlighted: false },
            { level: 'Minor', color: '#99ff99', highlighted: false },
            { level: 'Moderate', color: '#ffff00', highlighted: false },
            { level: 'Moderate', color: '#ffff00', highlighted: false },
            { level: 'Major', color: '#ffcc00', highlighted: false }
        ],
        [
            { level: 'Negligible', color: '#00cc00', highlighted: false },
            { level: 'Minor', color: '#99ff99', highlighted: false },
            { level: 'Minor', color: '#99ff99', highlighted: false },
            { level: 'Moderate', color: '#ffff00', highlighted: false },
            { level: 'Moderate', color: '#ffff00', highlighted: false }
        ]
    ],
    likelihoodScore: 3,
    impactScore: 4,
    impactScores: [1, 2, 3, 4, 5],
    likelihoodScores: [1, 2, 3, 4, 5]
};

const AggregatedResidualRisk: React.FC = () => {
    return (
        <div>

            <Card title="Aggregated Residual Risk">

                <AggregatedRiskMatrix riskMatrixResult={residualRiskData} title="" />
            </Card>
        </div>
    );
};

export default AggregatedResidualRisk;