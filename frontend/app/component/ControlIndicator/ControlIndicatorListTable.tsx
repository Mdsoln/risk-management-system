import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddEditControlIndicatorForm from './AddEditControlIndicatorForm';
import { ControlIndicatorDto, MonitoringFrequency, Measurement, ErrorState } from '@/app/types/api';
import { getMonitoringFrequencies } from '@/app/services/api/monitoringFrequencyApi';
import { getMeasurements } from '@/app/services/api/measurementApi';

interface ControlIndicatorListTableProps {
    controlIndicators: ControlIndicatorDto[];
    onChange: (controlIndicators: ControlIndicatorDto[]) => void;
}

const ControlIndicatorListTable: React.FC<ControlIndicatorListTableProps> = ({ controlIndicators, onChange }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingControlIndicator, setEditingControlIndicator] = useState<ControlIndicatorDto | null>(null);
    const [frequencies, setFrequencies] = useState<MonitoringFrequency[]>([]);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [errorState, setErrorState] = useState<ErrorState | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [frequenciesData, measurementsData] = await Promise.all([
                    getMonitoringFrequencies(),
                    getMeasurements(),
                ]);
                setFrequencies(frequenciesData);
                setMeasurements(measurementsData);
            } catch (error) {
                message.error('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    const handleAdd = () => {
        setEditingControlIndicator(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record: ControlIndicatorDto) => {
        setEditingControlIndicator(record);
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        const updatedControlIndicators = controlIndicators.filter(item => item.id !== id);
        onChange(updatedControlIndicators);
    };

    const handleModalOk = async (values: Partial<ControlIndicatorDto>) => {
        console.log("handleModalOk values before", values)
        if (editingControlIndicator) {
            const updatedControlIndicators = controlIndicators.map(item => item.id === editingControlIndicator.id ? { ...editingControlIndicator, ...values } : item);
            onChange(updatedControlIndicators);
            console.log(" updatedControlIndicators ", updatedControlIndicators)

        } else {
            const newControlIndicator = { ...values } as ControlIndicatorDto;
            onChange([...controlIndicators, newControlIndicator]);
            console.log(" newControlIndicator ", newControlIndicator)
        }


        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Key Control Indicator',
            dataIndex: 'keyControlIndicator',
            key: 'keyControlIndicator',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
        },
        {
            title: 'Monitoring Frequency',
            dataIndex: 'monitoringFrequencyId',
            key: 'monitoringFrequencyId',
            render: (text: string) => frequencies.find(f => f.id === text)?.frequency || text,
        },
        {
            title: 'Measurement',
            dataIndex: 'measurementId',
            key: 'measurementId',
            render: (text: string) => measurements.find(m => m.id === text)?.name || text,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: ControlIndicatorDto) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id!)} />
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
                Add Control Indicator
            </Button>
            <Table columns={columns} dataSource={controlIndicators} rowKey="id" />

            <Modal
                title={editingControlIndicator ? 'Edit Control Indicator' : 'Add Control Indicator'}
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <AddEditControlIndicatorForm
                    initialValues={editingControlIndicator || {}}
                    onSubmit={handleModalOk}
                    onCancel={handleModalCancel}
                    context="table"
                    loading={false}
                />
            </Modal>
        </>
    );
};

export default ControlIndicatorListTable;
