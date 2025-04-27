// components/ChartsSection.tsx
import React from 'react';
import { Row, Col, Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const controlMeasuresData = [
    { month: 'Jul', percentage: 0 },
    { month: 'Aug', percentage: 12.5 },
    { month: 'Sep', percentage: 12.5 },
    // Add more data points...
];

const riskData = [
    { name: 'Different Authority', inherent: 25, residual: 20, future: 18 },
    { name: 'Access Control Gap', inherent: 15, residual: 12, future: 10 },
    // Add more data points...
];

const ChartsSection: React.FC = () => {
    return (
        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            <Col xs={24} lg={12}>
                <Card title="Control Measures Implemented">
                    <LineChart width={400} height={300} data={controlMeasuresData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="percentage" stroke="#8884d8" />
                    </LineChart>
                </Card>
            </Col>
            <Col xs={24} lg={12}>
                <Card title="Inherent vs Current Residual Risk">
                    <BarChart width={400} height={300} data={riskData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="inherent" fill="#8884d8" />
                        <Bar dataKey="residual" fill="#82ca9d" />
                        <Bar dataKey="future" fill="#ffc658" />
                    </BarChart>
                </Card>
            </Col>
        </Row>
    );
};

export default ChartsSection;