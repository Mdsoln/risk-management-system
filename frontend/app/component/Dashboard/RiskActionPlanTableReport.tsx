import React from 'react';
import { Table, Card, Row, Col } from 'antd';

const data = [
    { action: 'Mitigate environmental risk', responsible: 'Investment Management unit', status: 'Ongoing', targetCompletion: '2024-10-01', completionPercentage: 60 },
    { action: 'Review SaaS data protection', responsible: 'Telephone Operator', status: 'Completed', targetCompletion: '2024-09-15', completionPercentage: 100 },
    // Add more rows as needed...
];

const RiskActionPlanTableReport: React.FC = () => {
    return (
        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            <Col span={24}>
                <Card title="Risk Action Plan Report">
                    <Table
                        dataSource={data}
                        columns={[
                            { title: 'Action', dataIndex: 'action', key: 'action' },
                            { title: 'Responsible', dataIndex: 'responsible', key: 'responsible' },
                            { title: 'Status', dataIndex: 'status', key: 'status' },
                            { title: 'Target Completion Date', dataIndex: 'targetCompletion', key: 'targetCompletion' },
                            { title: 'Completion Percentage (%)', dataIndex: 'completionPercentage', key: 'completionPercentage' },
                        ]}
                        pagination={false} // Turn off pagination if not needed
                        size="small" // Set the table size to small
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default RiskActionPlanTableReport;