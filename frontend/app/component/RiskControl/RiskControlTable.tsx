import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { RiskControlDto, MonitoringFrequency, Measurement } from '@/app/types/api';
import AddEditRiskControlForm from './AddEditRiskControlForm';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RiskControlTableProps {
    riskControls: RiskControlDto[];
    monitoringFrequencies: MonitoringFrequency[];
    measurements: Measurement[];
    onChange: (controls: RiskControlDto[]) => void;
}

const RiskControlTable: React.FC<RiskControlTableProps> = ({ riskControls, monitoringFrequencies, measurements, onChange }) => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentControl, setCurrentControl] = useState<Partial<RiskControlDto>>({});

    useEffect(() => {
        console.log("RiskControlTable riskControls", riskControls);
    }, [riskControls]);

    const handleAdd = () => {
        setCurrentControl({});
        setEditingIndex(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record: RiskControlDto, index: number) => {
        setCurrentControl(record);
        setEditingIndex(index);
        setIsModalVisible(true);
    };

    const handleDelete = (index: number) => {
        const newControls = riskControls.filter((_, i) => i !== index);
        onChange(newControls);
        message.success('Risk Control deleted successfully');
    };

    const handleSave = async (control: Partial<RiskControlDto>) => {
        console.log("control: ", control);
        if (editingIndex !== null) {
            const newControls = [...riskControls];
            newControls[editingIndex] = control as RiskControlDto;
            onChange(newControls);
            message.success('Risk Control updated successfully');
        } else {
            onChange([...riskControls, control as RiskControlDto]);
            message.success('Risk Control added successfully');
        }
        setIsModalVisible(false);
    };

    const expandedRowRender = (record: RiskControlDto) => {
        return (
            <div>
                <p><strong>Description:</strong></p>
                <ReactQuill value={record.description} readOnly theme="bubble" />
                <p><strong>Purpose:</strong></p>
                <ReactQuill value={record.purpose} readOnly theme="bubble" />
            </div>
        );
    };

    const columns = [
        {
            title: 'Control Name',
            dataIndex: 'name',
            key: 'name',
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
            render: (_: any, record: RiskControlDto, index: number) => (
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
                Add Risk Control
            </Button>
            <Table
                columns={columns}
                dataSource={riskControls}
                rowKey="id"
                expandable={{
                    expandedRowRender,
                    rowExpandable: record => record.description !== undefined && record.purpose !== undefined,
                }}
            />
            <Modal
                title={editingIndex !== null ? 'Edit Risk Control' : 'Add Risk Control'}
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                width="60%"
                style={{ top: 100 }}
            >
                <div style={{ height: '70vh', overflowY: 'auto' }}>
                    <AddEditRiskControlForm
                        initialValues={currentControl}
                        onSubmit={handleSave}
                        onCancel={() => setIsModalVisible(false)}
                        context="table"
                    />
                </div>
            </Modal>
        </>
    );
};

export default RiskControlTable;
