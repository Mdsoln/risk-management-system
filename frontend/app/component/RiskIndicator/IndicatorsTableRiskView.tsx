import React from 'react';
import { Table } from 'antd';
import { RightCircleFilled, DownCircleFilled } from '@ant-design/icons';
import { RiskIndicator } from '@/app/types/api';
import ReadMore from '../Shared/ReadMore';
import './IndicatorsTableRiskView.css';

interface IndicatorsTableRiskViewProps {
    riskIndicators: RiskIndicator[];
}

const IndicatorsTableRiskView: React.FC<IndicatorsTableRiskViewProps> = ({ riskIndicators }) => {
    const columns = [
        {
            title: <div className="custom-header">#</div>,
            dataIndex: 'index',
            key: 'index',
            render: (text: any, record: any, index: number) => index + 1,
            className: 'custom-index'
        },
        {
            title: <div className="custom-header-left">Key Risk Indicators</div>,
            dataIndex: 'indicator',
            key: 'indicator',
            className: 'custom-indicator custom-left'
        },
        {
            title: <div className="custom-header-center">Monitoring Frequency</div>,
            dataIndex: 'monitoringFrequency',
            key: 'monitoringFrequency',
            render: (text: string, record: RiskIndicator) => record.monitoringFrequency ? record.monitoringFrequency.frequency : '',
            className: 'custom-frequency'
        },
        {
            title: <div className="custom-header-center">Measure</div>,
            dataIndex: 'measurement',
            key: 'measurement',
            render: (text: string, record: RiskIndicator) => record.measurement ? record.measurement.name : '',
            className: 'custom-measure'
        },
        {
            title: <div className="custom-header-center custom-header-red">Red (H)</div>,
            dataIndex: 'red',
            key: 'red',
            render: (text: string, record: RiskIndicator) => (
                <div className="custom-cell custom-cell-red">
                    {record.riskIndicatorThresholds.filter(threshold => threshold.thresholdCategory.name === 'Red').map(threshold => (
                        <div key={threshold.id}>
                            {threshold.comparisonConditions.map(condition => `${condition.comparisonOperator.symbol} ${condition.bound}`).join(', ')}
                        </div>
                    ))}
                </div>
            ),
            className: 'custom-red'
        },
        {
            title: <div className="custom-header-center custom-header-amber">Amber (M)</div>,
            dataIndex: 'amber',
            key: 'amber',
            render: (text: string, record: RiskIndicator) => (
                <div className="custom-cell custom-cell-amber">
                    {record.riskIndicatorThresholds.filter(threshold => threshold.thresholdCategory.name === 'Amber').map(threshold => (
                        <div key={threshold.id}>
                            {threshold.comparisonConditions.map(condition => `${condition.comparisonOperator.symbol} ${condition.bound}`).join(', ')}
                        </div>
                    ))}
                </div>
            ),
            className: 'custom-amber'
        },
        {
            title: <div className="custom-header-center custom-header-green">Green (L)</div>,
            dataIndex: 'green',
            key: 'green',
            render: (text: string, record: RiskIndicator) => (
                <div className="custom-cell custom-cell-green">
                    {record.riskIndicatorThresholds.filter(threshold => threshold.thresholdCategory.name === 'Green').map(threshold => (
                        <div key={threshold.id}>
                            {threshold.comparisonConditions.map(condition => `${condition.comparisonOperator.symbol} ${condition.bound}`).join(', ')}
                        </div>
                    ))}
                </div>
            ),
            className: 'custom-green'
        }
    ];

    return (
        <Table
            dataSource={riskIndicators}
            columns={columns}
            rowKey="id"
            pagination={false}
            className="custom-table"
            size="small"
            expandable={{
                expandedRowRender: (record: RiskIndicator) => (
                    <div className='description-content-table'>
                        <table className="description-table">
                            <tbody>
                                <tr>
                                    <th style={{ width: '15%' }}>Description</th>
                                    <td><ReadMore text={record.description} noOfChar={500} /></td>
                                </tr>
                                <tr>
                                    <th style={{ width: '15%' }}>Purpose</th>
                                    <td><ReadMore text={record.purpose} noOfChar={500} /></td>
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

export default IndicatorsTableRiskView;
