import React, { useRef, useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { RiskIndicatorDto, MonitoringFrequency, Measurement, RiskIndicatorActionPlanDto } from '@/app/types/api';
import AddEditRiskIndicatorModal from './AddEditRiskIndicatorModal';
import IndicatorActionPlanListTable from './IndicatorActionPlanListTable';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RiskIndicatorListTableProps {
    riskIndicators: RiskIndicatorDto[];
    monitoringFrequencies: MonitoringFrequency[];
    measurements: Measurement[];
    onChange: (indicators: RiskIndicatorDto[]) => void;
}

const RiskIndicatorListTable: React.FC<RiskIndicatorListTableProps> = ({ riskIndicators, monitoringFrequencies, measurements, onChange }) => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentIndicator, setCurrentIndicator] = useState<Partial<RiskIndicatorDto>>({});

    useEffect(() => {
        console.log("RiskIndicatorListTable riskIndicators", riskIndicators);
    }, [riskIndicators]);

    const handleAdd = () => {
        setCurrentIndicator({});
        setEditingIndex(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record: RiskIndicatorDto, index: number) => {
        setCurrentIndicator(record);
        setEditingIndex(index);
        setIsModalVisible(true);
    };

    const handleDelete = (index: number) => {
        const newIndicators = riskIndicators.filter((_, i) => i !== index);
        onChange(newIndicators);
        message.success('Risk Indicator deleted successfully');
    };

    const handleSave = async (indicator: Partial<RiskIndicatorDto>) => {
        console.log("indicator: ", indicator);
        if (editingIndex !== null) {
            const newIndicators = [...riskIndicators];
            newIndicators[editingIndex] = indicator as RiskIndicatorDto;
            onChange(newIndicators);
            message.success('Risk Indicator updated successfully');
        } else {
            onChange([...riskIndicators, indicator as RiskIndicatorDto]);
            message.success('Risk Indicator added successfully');
        }
        setIsModalVisible(false);
    };

    const handleActionPlanEdit = (updatedActionPlan: RiskIndicatorActionPlanDto, indicatorIndex: number) => {
        const updatedIndicators = [...riskIndicators];
        const indicator = updatedIndicators[indicatorIndex];
        indicator.riskIndicatorActionPlans = indicator.riskIndicatorActionPlans?.map(plan =>
            plan.id === updatedActionPlan.id ? updatedActionPlan : plan
        ) || [];
        onChange(updatedIndicators);
    };

    const handleActionPlanDelete = (actionPlanId: string, indicatorIndex: number) => {
        const updatedIndicators = [...riskIndicators];
        const indicator = updatedIndicators[indicatorIndex];
        indicator.riskIndicatorActionPlans = indicator.riskIndicatorActionPlans?.filter(plan => plan.id !== actionPlanId) || [];
        onChange(updatedIndicators);
    };

    const expandedRowRender = (record: RiskIndicatorDto, index: number) => {
        return (
            <div>
                <p><strong>Description:</strong></p>
                <ReactQuill value={record.description} readOnly theme="bubble" />
                <p><strong>Purpose:</strong></p>
                <ReactQuill value={record.purpose} readOnly theme="bubble" />

                {/* Integrate IndicatorActionPlanListTable here */}
                <IndicatorActionPlanListTable
                    actionPlans={record.riskIndicatorActionPlans || []}
                    onEdit={(updatedActionPlan) => handleActionPlanEdit(updatedActionPlan, index)}
                    onDelete={(actionPlanId) => handleActionPlanDelete(actionPlanId, index)}
                />
            </div>
        );
    };

    const columns = [
        {
            title: 'Indicator',
            dataIndex: 'indicator',
            key: 'indicator',
        },
        {
            title: 'Monitoring Frequency',
            dataIndex: 'monitoringFrequencyId',
            key: 'monitoringFrequencyId',
            render: (text: string) => {
                const frequency = monitoringFrequencies.find(freq => freq.id === text);
                return frequency ? frequency.frequency : text;
            },
        },
        {
            title: 'Measurement',
            dataIndex: 'measurementId',
            key: 'measurementId',
            render: (text: string) => {
                const measurement = measurements.find(meas => meas.id === text);
                return measurement ? measurement.name : text;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: RiskIndicatorDto, index: number) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record, index)} />
                    <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(index)}>
                        <Button icon={<DeleteOutlined />} style={{ marginLeft: '8px' }} />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="dashed" onClick={handleAdd} icon={<PlusOutlined />} style={{ marginBottom: '16px' }}>
                Add Risk Indicator
            </Button>
            <Table
                columns={columns}
                dataSource={riskIndicators}
                rowKey="id"
                expandable={{
                    expandedRowRender,
                    rowExpandable: record => record.description !== undefined && record.purpose !== undefined,
                }}
            />
            {isModalVisible && (
                <AddEditRiskIndicatorModal
                    visible={isModalVisible}
                    initialValues={currentIndicator}
                    onSubmit={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                    width="65%" // Pass width prop
                    height="65vh" // Pass height prop
                    data={{ customData: '' }} // Pass data prop
                />
            )}
        </>
    );
};

export default RiskIndicatorListTable;
