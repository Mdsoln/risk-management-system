import React from 'react';
import { Table } from 'antd';
import { RightCircleFilled, DownCircleFilled } from '@ant-design/icons';
import { RiskOpportunity } from '@/app/types/api';
import './OpportunitiesTableRiskView.css';

interface OpportunitiesTableRiskViewProps {
    riskOpportunities: RiskOpportunity[];
}

const OpportunitiesTableRiskView: React.FC<OpportunitiesTableRiskViewProps> = ({ riskOpportunities }) => {
    const columns = [
        {
            title: <div className="custom-header">#</div>,
            dataIndex: 'index',
            key: 'index',
            render: (text: any, record: any, index: number) => index + 1,
            className: 'custom-index'
        },
        {
            title: <div className="custom-header-left">Opportunity Description</div>,
            dataIndex: 'description',
            key: 'description',
            className: 'custom-description'
        }
    ];

    return (
        <Table
            dataSource={riskOpportunities}
            columns={columns}
            rowKey="id"
            pagination={false}
            className="custom-table"
            size="small"
            expandable={{
                expandedRowRender: (record: RiskOpportunity) => (
                    <div className='description-content-table'>
                        <div className="description-title">Opportunity Details</div>
                        <table className="description-table">
                            <tbody>
                                <tr>
                                    <th style={{ width: '15%' }}>Description</th>
                                    <td>{record.description}</td>
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

export default OpportunitiesTableRiskView;
