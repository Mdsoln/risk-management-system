import React from 'react';
import { Table } from 'antd';
import { RightCircleFilled, DownCircleFilled } from '@ant-design/icons';
import { RiskActionPlan } from '@/app/types/api';
import ReadMore from '../Shared/ReadMore';
import styles from './RiskActionPlanTableView.module.css';

interface RiskActionPlanTableViewProps {
    riskActionPlans: RiskActionPlan[];
}

const RiskActionPlanTableView: React.FC<RiskActionPlanTableViewProps> = ({ riskActionPlans }) => {
    const columns = [
        {
            title: <div className={styles.customHeader}>#</div>,
            dataIndex: 'index',
            key: 'index',
            render: (text: any, record: any, index: number) => index + 1,
            className: styles.customIndex
        },
        {
            title: <div className={`${styles.customHeaderLeft} ${styles.customHeader}`}>Action Plan Name</div>,
            dataIndex: 'name',
            key: 'name',
            className: styles.customName
        },
        {
            title: <div className={styles.customHeader}>Start Date</div>,
            dataIndex: 'startDatetime',
            key: 'startDatetime',
            render: (text: string, record: RiskActionPlan) => record.startDatetime,
            className: styles.customStartDate
        },
        {
            title: <div className={styles.customHeader}>End Date</div>,
            dataIndex: 'endDatetime',
            key: 'endDatetime',
            render: (text: string, record: RiskActionPlan) => record.endDatetime,
            className: styles.customEndDate
        },
    ];

    return (
        <Table
            dataSource={riskActionPlans}
            columns={columns}
            rowKey="id"
            pagination={false}
            className={styles.customTable}
            size="small"
            expandable={{
                expandedRowRender: (record: RiskActionPlan) => (
                    <div className={styles.descriptionContentTable}>
                        <table className={styles.descriptionTable}>
                            <tbody>
                                <tr>
                                    <th style={{ width: '15%' }}>Description</th>
                                    <td><ReadMore text={record.description} noOfChar={500} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ),
                expandIcon: ({ expanded, onExpand, record }) =>
                    expanded ? (
                        <DownCircleFilled onClick={e => onExpand(record, e)} />
                    ) : (
                        <RightCircleFilled onClick={e => onExpand(record, e)} />
                    )
            }}
        />
    );
};

export default RiskActionPlanTableView;
