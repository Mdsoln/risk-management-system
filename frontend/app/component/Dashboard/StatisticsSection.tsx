// components/StatisticsSection.tsx
import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';

const StatisticsSection: React.FC = () => {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="Risk Controls Completed" value="78.0%" />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="Ongoing Risk Controls" value="14" />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="Controls Implemented (%)" value="50.0%" />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="Controls Not Implemented" value="3" />
                </Card>
            </Col>
        </Row>
    );
};

export default StatisticsSection;