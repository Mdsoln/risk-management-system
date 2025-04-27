import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Table, Modal, Skeleton, Empty, Card } from 'antd';
import { RiskWithActionPlans, RiskActionPlanMonitoringDto } from '@/app/types/api';
import { getRisksReadyForMonitoring, riskActionPlanMonitoringReporting } from '@/app/services/api/riskApi';
import styles from './RiskActionPlanMonitoringListForm.module.css';

const { TextArea } = Input;

const RiskActionPlanMonitoringListForm: React.FC = () => {
    const [risksWithActionPlans, setRisksWithActionPlans] = useState<RiskWithActionPlans[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [form] = Form.useForm();

    const fetchRisks = async () => {
        try {
            const data = await getRisksReadyForMonitoring();
            setRisksWithActionPlans(data);
        } catch (error) {
            Modal.error({
                title: 'Error',
                content: 'Failed to fetch risks ready for monitoring',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRisks();
    }, []);

    const renderActionPlans = (actionPlans: RiskWithActionPlans['actionPlans'], riskId: string) => {
        return actionPlans.map((actionPlan, index) => (
            <tr key={actionPlan.id} className={styles.customTableRow}>
                <td>{index + 1}</td>
                <td>{actionPlan.name}</td>
                <td>
                    <Form.Item
                        name={`comment-${riskId}-${actionPlan.id}`}
                        rules={[{ required: true, message: 'Please enter a comment' }]}
                    >
                        <TextArea placeholder="Enter your comment" rows={1} className={styles.customTextArea} />
                    </Form.Item>
                </td>
                <td>
                    <Form.Item
                        name={`monitoringDatetime-${riskId}-${actionPlan.id}`}
                        rules={[{ required: true, message: 'Please select a date and time' }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                </td>
            </tr>
        ));
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const monitoringData: RiskActionPlanMonitoringDto[] = [];

            risksWithActionPlans.forEach(risk => {
                risk.actionPlans.forEach(actionPlan => {
                    monitoringData.push({
                        riskActionPlanId: actionPlan.id,
                        comment: values[`comment-${risk.risk.id}-${actionPlan.id}`],
                        monitoringDatetime: values[`monitoringDatetime-${risk.risk.id}-${actionPlan.id}`].format("YYYY-MM-DDTHH:mm:ss"),
                    });
                });
            });

            await riskActionPlanMonitoringReporting(monitoringData);

            Modal.success({
                title: 'Success',
                content: 'Monitoring data submitted successfully',
            });

            // Reload data after successful submission
            setLoading(true);
            await fetchRisks();
            setLoading(false);

        } catch (error) {
            console.log('Validation or submission failed:', error);
            Modal.error({
                title: 'Error',
                content: 'Failed to submit monitoring data',
            });
        }
    };

    return (
        <Skeleton active loading={loading}>
            {risksWithActionPlans.length > 0 ? (
                <Form form={form} onFinish={handleSubmit}>
                    {risksWithActionPlans.map((riskWithActionPlans, index) => (
                        <div key={riskWithActionPlans.risk.id}>
                            <div style={{ padding: '10px', marginBottom: '6px', backgroundColor: "#fafafa" }}>
                                {`${index + 1}. ${riskWithActionPlans.risk.name}`}
                            </div>
                            <Table
                                columns={[
                                    { title: 'No', dataIndex: 'no', key: 'no' },
                                    { title: 'Action Plan Name', dataIndex: 'name', key: 'name' },
                                    { title: 'Monitoring Comment', dataIndex: 'comment', key: 'comment' },
                                    { title: 'Monitoring Date', dataIndex: 'monitoringDatetime', key: 'monitoringDatetime' },
                                ]}
                                dataSource={riskWithActionPlans.actionPlans.map((actionPlan, actionIndex) => ({
                                    key: actionPlan.id,
                                    no: actionIndex + 1,
                                    name: actionPlan.name,
                                    comment: (
                                        <Form.Item
                                            name={`comment-${riskWithActionPlans.risk.id}-${actionPlan.id}`}
                                            rules={[{ required: true, message: 'Please enter a comment' }]}
                                        >
                                            <TextArea
                                                placeholder="Enter your comment"
                                                rows={1}
                                                className={styles.customTextArea}
                                            />
                                        </Form.Item>
                                    ),
                                    monitoringDatetime: (
                                        <Form.Item
                                            name={`monitoringDatetime-${riskWithActionPlans.risk.id}-${actionPlan.id}`}
                                            rules={[{ required: true, message: 'Please select a date and time' }]}
                                        >
                                            <DatePicker showTime />
                                        </Form.Item>
                                    ),
                                }))}
                                pagination={false}
                                size="small"
                                rowClassName={() => styles.customTableRow}
                            />
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <Button type="primary" htmlType="submit">
                            Submit Monitoring Data
                        </Button>
                    </div>
                </Form>
            ) : (
                <Empty description="No data available" />
            )}
        </Skeleton>
    );
};

export default RiskActionPlanMonitoringListForm;
