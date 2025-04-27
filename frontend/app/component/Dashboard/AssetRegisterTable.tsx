// components/AssetRegisterTable.tsx
import React from 'react';
import { Table, Card, Row, Col } from 'antd';

const data = [
    { name: 'Environmental Data', responsible: 'Ola Pedersen', priority: 'High', assetType: 'Information', controlsImplemented: 60, actionsImplemented: 55 },
    { name: 'SaaS Customer Data', responsible: 'Anne Liu', priority: 'Medium', assetType: 'Information', controlsImplemented: 80, actionsImplemented: 55 },
    // Add more rows as needed...
];

const AssetRegisterTable: React.FC = () => {
    return (
        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            <Col span={24}>
                <Card title="Asset Register">
                    <Table
                        dataSource={data}
                        columns={[
                            { title: 'Name', dataIndex: 'name', key: 'name' },
                            { title: 'Responsible', dataIndex: 'responsible', key: 'responsible' },
                            { title: 'Priority', dataIndex: 'priority', key: 'priority' },
                            { title: 'Asset Type', dataIndex: 'assetType', key: 'assetType' },
                            { title: 'Controls Implemented (%)', dataIndex: 'controlsImplemented', key: 'controlsImplemented' },
                            { title: 'Actions Implemented (%)', dataIndex: 'actionsImplemented', key: 'actionsImplemented' },
                        ]}
                        pagination={false} // Turn off pagination if not needed
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default AssetRegisterTable;