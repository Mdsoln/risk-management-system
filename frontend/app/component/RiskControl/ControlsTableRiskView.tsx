import React from 'react';
import { Table } from 'antd';
import { RightCircleFilled, DownCircleFilled } from '@ant-design/icons';
import { RiskControl, ControlIndicator } from '@/app/types/api';
import './ControlsTableRiskView.css';

interface ControlsTableRiskViewProps {
    riskControls: RiskControl[];
}

const ControlsTableRiskView: React.FC<ControlsTableRiskViewProps> = ({ riskControls }) => {
    const controlIndicatorColumns = [
        {
            title: <div className="custom-header">#</div>,
            dataIndex: 'index',
            key: 'index',
            render: (text: any, record: any, index: number) => index + 1,
            className: 'custom-index'
        },
        {
            title: <div className="custom-header-left">Key Control Indicator</div>,
            dataIndex: 'keyControlIndicator',
            key: 'keyControlIndicator',
            className: 'custom-keyControlIndicator'
        },
        {
            title: <div className="custom-header-center">Monitoring Frequency</div>,
            dataIndex: 'monitoringFrequency',
            key: 'monitoringFrequency',
            render: (text: string, record: ControlIndicator) => record.monitoringFrequency ? record.monitoringFrequency.frequency : '',
            className: 'custom-frequency'
        },
        {
            title: <div className="custom-header-center">Measure</div>,
            dataIndex: 'measurement',
            key: 'measurement',
            render: (text: string, record: ControlIndicator) => record.measurement ? record.measurement.name : '',
            className: 'custom-measure'
        },
        {
            title: <div className="custom-header-center custom-header-red">Red (H)</div>,
            dataIndex: 'red',
            key: 'red',
            render: (text: string, record: ControlIndicator) => (
                <div className="custom-cell custom-cell-red">
                    {record.controlIndicatorThresholds.filter(threshold => threshold.thresholdCategory.name === 'Red').map(threshold => (
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
            render: (text: string, record: ControlIndicator) => (
                <div className="custom-cell custom-cell-amber">
                    {record.controlIndicatorThresholds.filter(threshold => threshold.thresholdCategory.name === 'Amber').map(threshold => (
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
            render: (text: string, record: ControlIndicator) => (
                <div className="custom-cell custom-cell-green">
                    {record.controlIndicatorThresholds.filter(threshold => threshold.thresholdCategory.name === 'Green').map(threshold => (
                        <div key={threshold.id}>
                            {threshold.comparisonConditions.map(condition => `${condition.comparisonOperator.symbol} ${condition.bound}`).join(', ')}
                        </div>
                    ))}
                </div>
            ),
            className: 'custom-green'
        }
    ];

    const columns = [
        {
            title: <div className="custom-header">#</div>,
            dataIndex: 'index',
            key: 'index',
            render: (text: any, record: any, index: number) => index + 1,
            className: 'custom-index'
        },
        {
            title: <div className="custom-header-left">Control</div>,
            dataIndex: 'name',
            key: 'name',
            className: 'custom-name'
        }
    ];

    return (
        <Table
            dataSource={riskControls}
            columns={columns}
            rowKey="id"
            pagination={false}
            className="custom-table"
            size="small"
            expandable={{
                expandedRowRender: (record: RiskControl) => (
                    <>
                        <div className='description-content-table'>
                            <table className="description-table">
                                <tbody>
                                    <tr>
                                        <th style={{ width: '15%' }}>Description</th>
                                        <td>{record.description}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '15%' }}>Purpose</th>
                                        <td>{record.purpose}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Table
                            dataSource={record.controlIndicators}
                            columns={controlIndicatorColumns}
                            rowKey="id"
                            pagination={false}
                            className="custom-table"
                            size="small"
                        />
                    </>
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

export default ControlsTableRiskView;
