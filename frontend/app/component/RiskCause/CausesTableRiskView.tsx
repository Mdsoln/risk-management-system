import React from 'react';
import { Table } from 'antd';
import { RightCircleFilled, DownCircleFilled } from '@ant-design/icons';
import { RiskCause } from '@/app/types/api';
import './CausesTableRiskView.css';

interface CausesTableRiskViewProps {
    riskCauses: RiskCause[];
}

const CausesTableRiskView: React.FC<CausesTableRiskViewProps> = ({ riskCauses }) => {
    const columns = [
        {
            title: <div className="custom-header">#</div>,
            dataIndex: 'index',
            key: 'index',
            render: (text: any, record: any, index: number) => index + 1,
            className: 'custom-index'
        },
        {
            title: <div className="custom-header-left">Cause Description</div>,
            dataIndex: 'description',
            key: 'description',
            className: 'custom-description'
        }
    ];

    return (
        <Table
            dataSource={riskCauses}
            columns={columns}
            rowKey="id"
            pagination={false}
            className="custom-table"
            size="small"
            expandable={{
                expandedRowRender: (record: RiskCause) => (
                    <div className='description-content-table'>
                        <div className="description-title">Cause Details</div>
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

export default CausesTableRiskView;
