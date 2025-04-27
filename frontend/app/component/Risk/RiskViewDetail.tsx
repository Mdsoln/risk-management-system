import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Risk, RiskAssessmentHistoryDto } from '@/app/types/api';
import { Descriptions, Table, Card, Divider, Button, Space, Tag, Row, Col, Modal, Skeleton, message } from 'antd';
import CustomModal from '../Modal/CustomModal';
import { BarsOutlined, InfoCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import './RiskViewDetail.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { renderStatus } from '@/app/utils/statusHelper';
import RiskMatrix from './RiskMatrix';
import ReadMore from '../Shared/ReadMore';
import CausesTableRiskView from '../RiskCause/CausesTableRiskView';
import ControlsTableRiskView from '../RiskControl/ControlsTableRiskView';
import IndicatorsTableRiskView from '../RiskIndicator/IndicatorsTableRiskView';
import OpportunitiesTableRiskView from '../RiskOpportunity/OpportunitiesTableRiskView';
import RiskAssessmentStatusSideDetails from './RiskAssessmentStatusSideDetails';
import { departmentOwnerReviewRisk, getRiskById, submitForAssessmentApi } from '@/app/services/api/riskApi';
import AssessmentForm from './AssessmentForm';
import RiskActionPlanTableView from './RiskActionPlanTableView';


const thBPStyle = { width: '17%' };
const thFOStyle = { width: '17%' };
const thBPOStyle = { width: '27%' };

const thRLStyle = { width: '30%' };
const thRIStyle = { width: '30%' };
const thILStyle = { width: '30%' };
const thIIStyle = { width: '30%' };
interface RiskViewDetailProps {
    visible: boolean;
    risk: Risk | null;
    onCancel: (data?: any) => void;
    labelWidth?: string | number;
}


const RiskViewDetail: React.FC<RiskViewDetailProps> = ({ visible, risk: initialRisk, onCancel, labelWidth = 100 }) => {
    const [risk, setRisk] = useState<Risk | null>(initialRisk);
    const [loading, setLoading] = useState<boolean>(!initialRisk);
    const [isAssessmentModalVisible, setAssessmentModalVisible] = useState<boolean>(false);
    const assessmentFormRef = useRef<any>(null);

    useEffect(() => {
        console.log('Initial risk:', initialRisk);
        setLoading(true);
        setTimeout(() => {
            setRisk(initialRisk);
            setLoading(false);
        }, 1000); // Simulate loading delay of 1 second
    }, [initialRisk]);

    if (!risk) return null;
    const { businessProcess, inherentRisk, residualRisk } = risk;

    const handleCustomCancel = () => {
        console.log('Custom Modal Cancel button clicked');
        onCancel();
    };

    const handleCustomRefresh = async (riskId: string) => {
        try {
            console.log('Custom Modal OK button clicked');
            setLoading(true);
            const updatedRisk = await getRiskById(riskId);
            console.log('Updated risk:', updatedRisk);
            setRisk(updatedRisk);
            setLoading(false);
        } catch (error) {
            console.error('Error refreshing risk data:', error);
            setLoading(false);
        }
    };

    const handleSubmitForAssessment = async () => {
        Modal.confirm({
            title: 'Submit for Assessment',
            content: 'Are you sure you want to submit this risk for assessment?',
            okText: 'Yes, Submit for Assessment',
            cancelText: 'No, Don\'t Submit',
            onOk: async () => {
                console.log('Submitting for assessment:', risk);
                if (risk) {
                    try {
                        await submitForAssessmentApi(risk.id);
                        console.log('Risk submitted for assessment successfully');
                        handleCustomRefresh(risk.id);
                    } catch (error) {
                        console.error('Error submitting for assessment:', error);
                    }
                }
            },
        });
    };


    const handleAssessmentSubmit = (values: RiskAssessmentHistoryDto) => {
        console.log('Assessment submitted successfully:', values);
        handleCustomRefresh(risk!.id);
        setAssessmentModalVisible(false); // Close the assessment modal after submitting if no error
    };

    const handleAssessmentReview = () => {
        setAssessmentModalVisible(true);
    };

    const customFooter = (
        <div>
            <Space>
                <Button onClick={handleCustomCancel}>Close</Button>
                {(risk?.riskAssessmentStatus.riskStatus.code === 'DRAFT' || risk?.riskAssessmentStatus.riskStatus.code === 'REJECTED') && (
                    <Button type="primary" onClick={handleSubmitForAssessment}>Submit for Assessment</Button>
                )}
                {(risk?.riskAssessmentStatus.riskStatus.code === 'SUBMITTED_FOR_REVIEW' || risk?.riskAssessmentStatus.riskStatus.code === 'RESUBMITTED') && (
                    <Button type="primary" onClick={handleAssessmentReview}>Review</Button>
                )}
                <Button type="primary" onClick={() => handleCustomRefresh(risk!.id)}>Refresh</Button>
            </Space>
        </div>
    );


    const AssessmentFormCustomFooter = (
        <div>
            <Space>
                <Button onClick={() => setAssessmentModalVisible(false)}>Cancel</Button>
                <Button type="primary" onClick={() => assessmentFormRef.current?.submit()}>
                    Submit Assessment
                </Button>
            </Space>
        </div>
    );

    const descriptionQuill = (
        <ReactQuill value={risk.description} readOnly theme="bubble" />
    );

    const purposeQuill = (
        <ReactQuill value={risk.description} readOnly theme="bubble" />
    );

    const labelStyle = { width: labelWidth, backgroundColor: '#f0f2f5', fontWeight: '500', paddingLeft: '0px' };
    const tableLabelStyle = { width: labelWidth, backgroundColor: 'red', fontWeight: '500', paddingLeft: '10px' };

    return (
        <>
            <CustomModal
                visible={visible}
                title={risk.name}
                onCancel={handleCustomCancel}
                onOk={handleCustomRefresh}
                footer={customFooter}
                width="95%"
                height="73vh"
                data={{ customData: 'example' }}
                icon={<InfoCircleOutlined />}
                modalType={{ lineOne: 'Risk', lineTwo: 'Details' }}
            >
                <Skeleton loading={loading} active>

                    <Row style={{ height: '100%', position: 'relative' }}>
                        <Col span={24} style={{ height: '100%', overflowY: 'auto', paddingRight: '26%' }}>
                            {/* <div>
                        <Divider orientation="left" orientationMargin="0" className='divider-title-line'>
                            <span className='divider-icon'><BarsOutlined /></span>
                            <span className='divider-title'>Basic Risk Details</span>
                        </Divider>
                        <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} labelStyle={labelStyle}>
                            <Descriptions.Item label="Risk Name" className='description-item'>
                                <div className='description-content-div'>{risk.name}</div>
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} style={{ fontSize: '10px', padding: 0, margin: 0 }} labelStyle={labelStyle}>
                            <Descriptions.Item label="Risk Name" className='description-item'>
                                <div className='description-content-div'>{risk.name}</div>
                            </Descriptions.Item>
                            <Descriptions.Item label="Risk Status" className='description-item'>
                                <Tag color="#87d068" style={{ fontSize: '10px', margin: 0 }}>{risk.status}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Risk Status" className='description-item'>
                                <div className='description-content-div'>{risk.status}</div>
                            </Descriptions.Item>
                        </Descriptions>
                    </div> */}

                            <Descriptions layout="vertical" bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} labelStyle={labelStyle}>
                                <Descriptions.Item label="Basic Risk Details " className='description-item'>
                                    <Row gutter={8}>
                                        <Col xs={24} lg={24}>
                                            <div className='description-content-table'>
                                                <div className="description-title"> Risk Information </div>
                                                <table className="description-table">
                                                    <tbody>

                                                        <tr>
                                                            <th style={thBPStyle}>Risk Title</th>
                                                            <td>{risk.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thBPOStyle}>Created At</th>
                                                            <td>{new Date(risk.createdAt).toLocaleString()}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thBPOStyle}>Updated At</th>
                                                            <td>{new Date(risk.updatedAt).toLocaleString()}</td>
                                                        </tr>


                                                    </tbody>
                                                </table>

                                            </div>
                                        </Col>

                                    </Row>



                                </Descriptions.Item>
                            </Descriptions>
                            <Descriptions layout="vertical" bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} labelStyle={labelStyle}>
                                <Descriptions.Item label="Risk Description" className='description-item'>
                                    <div className='description-content-div'>
                                        <ReadMore text={risk.description} noOfChar={600} />
                                    </div>
                                </Descriptions.Item>
                            </Descriptions>


                            <Descriptions layout="vertical" bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} labelStyle={labelStyle}>
                                <Descriptions.Item label="Business Process of the Risk" className='description-item'>
                                    <Row gutter={8}>
                                        <Col xs={24} lg={14}>
                                            <div className='description-content-table'>
                                                <div className="description-title">Business Process</div>
                                                <table className="description-table">
                                                    <tbody>

                                                        <tr>
                                                            <th style={thBPStyle}>Name</th>
                                                            <td>{businessProcess.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thBPStyle}>Description</th>
                                                            <td><ReadMore text={businessProcess.description} /></td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thBPOStyle}>Start Date</th>
                                                            <td>{new Date(businessProcess.startDateTime).toLocaleString()}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thBPOStyle}>End Date</th>
                                                            <td>{new Date(businessProcess.endDateTime).toLocaleString()}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="description-title">Fund Objective</div>
                                                <table className="description-table">
                                                    <tbody>

                                                        <tr>
                                                            <th style={thFOStyle}>Name</th>
                                                            <td>{businessProcess.fundObjective.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thFOStyle}>Description</th>
                                                            <td><ReadMore text={businessProcess.fundObjective.description} /></td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thFOStyle}>Start Date</th>
                                                            <td>{new Date(businessProcess.fundObjective.startDateTime).toLocaleString()}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thFOStyle}>End Date</th>
                                                            <td>{new Date(businessProcess.fundObjective.endDateTime).toLocaleString()}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                        <Col xs={24} lg={10}>
                                            <div className='description-content-table'>
                                                <div className="description-title">Business Process Department</div>
                                                <table className="description-table">
                                                    <tbody>

                                                        <tr>
                                                            <th style={thBPOStyle}>Department</th>
                                                            <td>{businessProcess.businessProcessOwnerDepartment.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thBPOStyle}>Description</th>
                                                            <td><ReadMore text={businessProcess.businessProcessOwnerDepartment.description} /></td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thBPOStyle}>Code</th>
                                                            <td>{businessProcess.businessProcessOwnerDepartment.code}</td>
                                                        </tr>


                                                    </tbody>
                                                </table>

                                                <div className="description-title">Business Process Owner </div>
                                                <table className="description-table">
                                                    <tbody>

                                                        {businessProcess && businessProcess.businessProcessOwnerDepartment ? (
                                                            <React.Fragment key={businessProcess.businessProcessOwnerDepartment.id}>
                                                                <tr>
                                                                    <th style={thBPOStyle}>Name</th>
                                                                    <td>{businessProcess.businessProcessOwnerDepartment.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th style={thBPOStyle}>Description</th>
                                                                    <td>{businessProcess.businessProcessOwnerDepartment.description}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th style={thBPOStyle}>Code</th>
                                                                    <td>{businessProcess.businessProcessOwnerDepartment.code}</td>
                                                                </tr>
                                                            </React.Fragment>
                                                        ) : (
                                                            <tr>
                                                                <td >No department owners available.</td>
                                                            </tr>
                                                        )}



                                                        {/* {businessProcess.businessProcessOwnerDepartment.departmentOwners.map(owner => (
                                                            <React.Fragment key={owner.id}>
                                                                <tr>
                                                                    <th style={thBPOStyle}>Owner Name</th>
                                                                    <td>{owner.ownerName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th style={thBPOStyle}>Owner Email</th>
                                                                    <td>{owner.ownerEmail}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th style={thBPOStyle}>Owner Phone</th>
                                                                    <td>{owner.ownerPhone}</td>
                                                                </tr>

                                                            </React.Fragment>
                                                        ))} */}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                    </Row>


                                </Descriptions.Item>
                            </Descriptions>

                            <Descriptions layout="vertical" bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} labelStyle={labelStyle}>
                                <Descriptions.Item label="Inherent Risk" className='description-item'>
                                    <Row gutter={0}>
                                        <Col xs={24} lg={10}>
                                            <div className='description-content-table'>
                                                <div className="description-title">Inherent Risk - Likelihood</div>
                                                <table className="description-table">
                                                    <tbody>
                                                        <tr>
                                                            <th style={thILStyle}>Likelihood Score</th>
                                                            <td>{inherentRisk.likelihood.score} </td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thILStyle}>Likelihood Category</th>
                                                            <td>
                                                                <span className="likelihood-text" style={{ backgroundColor: inherentRisk.likelihood.color }}>
                                                                    {inherentRisk.likelihood.likelihoodCategory} ({inherentRisk.likelihood.score})
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thILStyle}>Category Definition</th>
                                                            <td>{inherentRisk.likelihood.categoryDefinition}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='description-content-table'>
                                                <div className="description-title">Inherent Risk - Impact</div>
                                                <table className="description-table">
                                                    <tbody>

                                                        <tr>
                                                            <th style={thIIStyle}>Impact Score</th>
                                                            <td>{inherentRisk.impact.score}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thIIStyle}>Impact Severity</th>
                                                            <td>
                                                                <span className="impact-text" style={{ backgroundColor: inherentRisk.impact.color }}>
                                                                    {inherentRisk.impact.severityRanking} ({inherentRisk.impact.score})
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thIIStyle}>Impact Assessment</th>
                                                            <td>{inherentRisk.impact.assessment}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </Col>
                                        <Col xs={24} lg={14}>
                                            <div className='description-content-table'>
                                                {risk.inherentRiskMatrixResult && (
                                                    <RiskMatrix riskMatrixResult={risk.inherentRiskMatrixResult} title={'Inherent Risk Matrix'} />
                                                )}
                                            </div>


                                            <div className='description-content-table'>
                                                <div className="description-title">Inherent Risk - Summary</div>
                                                <table className="description-table">
                                                    <tbody>
                                                        <tr>
                                                            <th style={thRLStyle}>Risk Level</th>
                                                            <td>
                                                                <span className="risk-level-text" style={{ backgroundColor: inherentRisk.riskColor }}>
                                                                    {inherentRisk.riskLevel}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thRLStyle}>Risk Description</th>
                                                            <td>{inherentRisk.riskDescription}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thRLStyle}>Inherent Risk Rating</th>
                                                            <td>{inherentRisk.inherentRiskRating}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </Col>
                                    </Row>


                                </Descriptions.Item>
                            </Descriptions>




                            <Descriptions layout="vertical" bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} labelStyle={labelStyle}>
                                <Descriptions.Item label="Inherent Risk" className='description-item'>
                                    <Row gutter={16}>
                                        <Col xs={24} lg={10}>
                                            <div className='description-content-table'>
                                                <div className="description-title">Residual Risk - Likelihood</div>
                                                <table className="description-table">
                                                    <tbody>
                                                        <tr>
                                                            <th style={thILStyle}>Likelihood Score</th>
                                                            <td>{residualRisk.likelihood.score} </td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thILStyle}>Likelihood Category</th>
                                                            <td>
                                                                <span className="likelihood-text" style={{ backgroundColor: residualRisk.likelihood.color }}>
                                                                    {residualRisk.likelihood.likelihoodCategory} ({residualRisk.likelihood.score})
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thILStyle}>Category Definition</th>
                                                            <td>{residualRisk.likelihood.categoryDefinition} </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='description-content-table'>
                                                <div className="description-title">Residual Risk - Impact</div>
                                                <table className="description-table">
                                                    <tbody>
                                                        <tr>
                                                            <th style={thIIStyle}>Impact Score</th>
                                                            <td>{residualRisk.impact.score}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thIIStyle}>Impact Severity</th>
                                                            <td>
                                                                <span className="impact-text" style={{ backgroundColor: residualRisk.impact.color }}>
                                                                    {residualRisk.impact.severityRanking} ({residualRisk.impact.score})
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thIIStyle}>Impact Assessment</th>
                                                            <td>{residualRisk.impact.assessment}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </Col>
                                        <Col xs={24} lg={14}>
                                            <div className='description-content-table'>
                                                {risk.residualRiskMatrixResult && (
                                                    <RiskMatrix riskMatrixResult={risk.residualRiskMatrixResult} title={'Residual Risk Matrix'} />
                                                )}
                                            </div>


                                            <div className='description-content-table'>
                                                <div className="description-title">Residual Risk - Summary</div>
                                                <table className="description-table">
                                                    <tbody>
                                                        <tr>
                                                            <th style={thRLStyle}>Risk Level</th>
                                                            <td>
                                                                <span className="risk-level-text" style={{ backgroundColor: residualRisk.riskColor }}>
                                                                    {residualRisk.riskLevel}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thRLStyle}>Risk Description</th>
                                                            <td>{residualRisk.riskDescription}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={thRLStyle}>Residual Risk Rating</th>
                                                            <td>{residualRisk.residualRiskRating}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </Col>
                                    </Row>


                                </Descriptions.Item>
                            </Descriptions>









                            <Descriptions layout="vertical" bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} labelStyle={labelStyle}>
                                <Descriptions.Item label="Risk Description" className='description-item'>
                                    <div className='description-content-div'>
                                        <ReadMore text={risk.description} noOfChar={600} />
                                    </div>
                                </Descriptions.Item>
                            </Descriptions>
                            <Divider />

                            <Card title="Risk Indicators" bordered>
                                <IndicatorsTableRiskView riskIndicators={risk.riskIndicators} />
                            </Card>
                            <Divider />

                            <Card title="Risk Controls" bordered>
                                <ControlsTableRiskView riskControls={risk.riskControls} />
                            </Card>
                            <Divider />

                            <Card title="Risk Action Plans" bordered>
                                <RiskActionPlanTableView riskActionPlans={risk.riskActionPlans} />
                            </Card>

                            <Card title="Risk Causes" bordered>
                                <CausesTableRiskView riskCauses={risk.riskCauses} />
                            </Card>

                            <Divider />

                            <Card title="Risk Opportunities" bordered>
                                <OpportunitiesTableRiskView riskOpportunities={risk.riskOpportunities} />
                            </Card>


                            {/* 
            <Divider />

            <Card title="Risk Causes" bordered>
                <CausesTableRiskView riskCauses={risk.riskCauses} />
            </Card>

            <Divider />

            <Card title="Risk Opportunities" bordered>
                <OpportunitiesTableRiskView riskOpportunities={risk.riskOpportunities} />
            </Card>

            <Divider />

            <Card title="Risk Controls" bordered>
                <ControlsTableRiskView riskControls={risk.riskControls} />
            </Card>
 */}



                            {/* 



            <Card title="Risk Details" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} style={{ fontSize: '10px' }} labelStyle={labelStyle}>
                    <Descriptions.Item label="Name">{risk.name}</Descriptions.Item>
                    <Descriptions.Item label="Status">{risk.status}</Descriptions.Item>
                    <Descriptions.Item label="Created At">{risk.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">{risk.updatedAt}</Descriptions.Item>
                    <Descriptions.Item label="Created By">{risk.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Updated By">{risk.updatedBy}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>{descriptionQuill}</Descriptions.Item>
                    <Descriptions.Item label="Purpose" span={2}>{purposeQuill}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            <Card title="Risk Area" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} style={{ fontSize: '10px' }} labelStyle={labelStyle}>
                    <Descriptions.Item label="Name">{risk.riskArea.name}</Descriptions.Item>
                    <Descriptions.Item label="Description">{risk.riskArea.description}</Descriptions.Item>
                    <Descriptions.Item label="Code">{risk.riskArea.code}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            <Card title="Risk Owner Department" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} style={{ fontSize: '10px' }} labelStyle={labelStyle}>
                    <Descriptions.Item label="Owner Name">{risk.riskOwnerDepartment.ownerName}</Descriptions.Item>
                    <Descriptions.Item label="Owner Email">{risk.riskOwnerDepartment.ownerEmail}</Descriptions.Item>
                    <Descriptions.Item label="Owner Phone">{risk.riskOwnerDepartment.ownerPhone}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Descriptions title="Department" bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} style={{ fontSize: '10px' }} labelStyle={labelStyle}>
                    <Descriptions.Item label="Name">{risk.riskOwnerDepartment.department.name}</Descriptions.Item>
                    <Descriptions.Item label="Description">{risk.riskOwnerDepartment.department.description}</Descriptions.Item>
                    <Descriptions.Item label="Code">{risk.riskOwnerDepartment.department.code}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            <Card title="Business Process" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} style={{ fontSize: '10px' }} labelStyle={labelStyle}>
                    <Descriptions.Item label="Name">{risk.businessProcess.name}</Descriptions.Item>
                    <Descriptions.Item label="Description">{risk.businessProcess.description}</Descriptions.Item>
                    <Descriptions.Item label="Start Date">{risk.businessProcess.startDateTime}</Descriptions.Item>
                    <Descriptions.Item label="End Date">{risk.businessProcess.endDateTime}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            <Card title="Inherent Risk" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} style={{ fontSize: '10px' }} labelStyle={labelStyle}>
                    <Descriptions.Item label="Likelihood">{risk.inherentRisk.likelihood.likelihoodCategory}</Descriptions.Item>
                    <Descriptions.Item label="Impact">{risk.inherentRisk.impact.severityRanking}</Descriptions.Item>
                    <Descriptions.Item label="Risk Level">{risk.inherentRisk.riskLevel}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            <Card title="Residual Risk" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }} style={{ fontSize: '10px' }} labelStyle={labelStyle}>
                    <Descriptions.Item label="Likelihood">{risk.residualRisk.likelihood.likelihoodCategory}</Descriptions.Item>
                    <Descriptions.Item label="Impact">{risk.residualRisk.impact.severityRanking}</Descriptions.Item>
                    <Descriptions.Item label="Risk Level">{risk.residualRisk.riskLevel}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            <Card title="Risk Indicators" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Table
                    dataSource={risk.riskIndicators}
                    rowKey="id"
                    columns={[
                        { title: 'Indicator', dataIndex: 'indicator', key: 'indicator' },
                        { title: 'Description', dataIndex: 'description', key: 'description' },
                        { title: 'Purpose', dataIndex: 'purpose', key: 'purpose' },
                    ]}
                    pagination={false}
                    style={{ fontSize: '10px' }}
                />
            </Card>

            <Divider />

            <Card title="Risk Causes" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Table
                    dataSource={risk.riskCauses}
                    rowKey="id"
                    columns={[
                        { title: 'Description', dataIndex: 'description', key: 'description' },
                    ]}
                    pagination={false}
                    style={{ fontSize: '10px' }}
                />
            </Card>

            <Divider />

            <Card title="Risk Opportunities" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Table
                    dataSource={risk.riskOpportunities}
                    rowKey="id"
                    columns={[
                        { title: 'Description', dataIndex: 'description', key: 'description' },
                    ]}
                    pagination={false}
                    style={{ fontSize: '10px' }}
                />
            </Card>

            <Divider />

            <Card title="Risk Controls" bordered style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                <Table
                    dataSource={risk.riskControls}
                    rowKey="id"
                    columns={[
                        { title: 'Name', dataIndex: 'name', key: 'name' },
                        { title: 'Description', dataIndex: 'description', key: 'description' },
                        { title: 'Purpose', dataIndex: 'purpose', key: 'purpose' },
                    ]}
                    pagination={false}
                    style={{ fontSize: '10px' }}
                />
            </Card> */}

                        </Col>
                        <Col span={6} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100%' }}>
                            <RiskAssessmentStatusSideDetails risk={risk} />
                        </Col>
                    </Row>
                </Skeleton>
            </CustomModal>


            <CustomModal
                visible={isAssessmentModalVisible}
                title="Assessment Form"
                onCancel={() => setAssessmentModalVisible(false)}
                footer={AssessmentFormCustomFooter}
                width="50%"
                height="50vh"
                data={{ customData: 'example' }}
                icon={<InfoCircleOutlined />}
                modalType={{ lineOne: 'Risk', lineTwo: 'Assessment' }}
            >
                <AssessmentForm
                    onSubmit={handleAssessmentSubmit}
                    visible={isAssessmentModalVisible}
                    riskId={risk.id}
                    ref={assessmentFormRef}
                    showActionButtons={false}
                />
            </CustomModal>
        </>
    );
};

export default RiskViewDetail;
