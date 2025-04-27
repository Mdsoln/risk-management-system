import React from 'react';
import { Card, Col, Row, Divider } from 'antd';
import ReactQuill from 'react-quill';
import { Risk } from '@/app/types/api';

interface ViewRiskInfoProps {
    data: Risk;
}

const ViewRiskInfo: React.FC<ViewRiskInfoProps> = ({ data }) => {
    return (
        <div>
            <Card title="Risk Details">
                <p><strong>ID:</strong> {data.id}</p>
                <p><strong>Name:</strong> {data.name}</p>
                <p><strong>Description:</strong><ReactQuill value={data.description} readOnly theme="bubble" /> </p>
                <p><strong>Status:</strong> {data.status}</p>
                <p><strong>Created At:</strong> {data.createdAt}</p>
                <p><strong>Updated At:</strong> {data.updatedAt}</p>

                <Divider orientation="left">Risk Area</Divider>
                <p><strong>ID:</strong> {data.riskArea.id}</p>
                <p><strong>Name:</strong> {data.riskArea.name}</p>
                <p><strong>Description:</strong><ReactQuill value={data.riskArea.description} readOnly theme="bubble" /> </p>
                <p><strong>Code:</strong> {data.riskArea.code}</p>

                <Divider orientation="left">Risk Owner Department</Divider>
                <p><strong>Owner ID:</strong> {data.department.id}</p>
                <p><strong>Owner Name:</strong> {data.department.name}</p>
                <p><strong>Owner Code:</strong> {data.department.code}</p>
                <p><strong>Owner Description:</strong> {data.department.description}</p>



                <Divider orientation="left">Business Process</Divider>
                <p><strong>ID:</strong> {data.businessProcess.id}</p>
                <p><strong>Name:</strong> {data.businessProcess.name}</p>
                <p><strong>Description:</strong><ReactQuill value={data.businessProcess.description} readOnly theme="bubble" /></p>

                <Divider orientation="left">Inherent Risk</Divider>
                <p><strong>Likelihood:</strong> {data.inherentRisk.likelihood.likelihoodCategory}</p>
                <p><strong>Impact:</strong> {data.inherentRisk.impact.severityRanking}</p>
                <p><strong>Inherent Risk Rating:</strong> {data.inherentRisk.inherentRiskRating}</p>
                <p><strong>Risk Level:</strong> {data.inherentRisk.riskLevel}</p>
                <p><strong>Risk Color:</strong> {data.inherentRisk.riskColor}</p>

                <Divider orientation="left">Residual Risk</Divider>
                <p><strong>Likelihood:</strong> {data.residualRisk.likelihood.likelihoodCategory}</p>
                <p><strong>Impact:</strong> {data.residualRisk.impact.severityRanking}</p>
                <p><strong>Residual Risk Rating:</strong> {data.residualRisk.residualRiskRating}</p>
                <p><strong>Risk Level:</strong> {data.residualRisk.riskLevel}</p>
                <p><strong>Risk Color:</strong> {data.residualRisk.riskColor}</p>

                <Divider orientation="left">Risk Indicators</Divider>
                {data.riskIndicators.map((indicator, index) => (
                    <div key={indicator.id}>
                        <h4>Indicator {index + 1}</h4>
                        <p><strong>ID:</strong> {indicator.id}</p>
                        <p><strong>Indicator:</strong> {indicator.indicator}</p>
                        <p><strong>Description:</strong>
                            <ReactQuill value={indicator.description} readOnly theme="bubble" />
                        </p>
                        <p><strong>Purpose:</strong> {indicator.purpose}</p>
                        <p><strong>Monitoring Frequency:</strong> {indicator.monitoringFrequency.frequency}</p>
                        <p><strong>Measurement:</strong> {indicator.measurement.name}</p>

                        <Divider orientation="left">RiskIndicatorThresholds</Divider>
                        {indicator.riskIndicatorThresholds.map((riskIndicatorThreshold, tIndex) => (
                            <div key={riskIndicatorThreshold.id}>
                                <h5>RiskIndicatorThreshold {tIndex + 1}</h5>
                                <p><strong>Category:</strong> {riskIndicatorThreshold.thresholdCategory.name}</p>
                                <Divider orientation="left">Comparison Conditions</Divider>
                                {riskIndicatorThreshold.comparisonConditions.map((condition, cIndex) => (
                                    <div key={condition.id}>
                                        <h6>Condition {cIndex + 1}</h6>
                                        <p><strong>Operator:</strong> {condition.comparisonOperator.name}</p>
                                        <p><strong>Bound:</strong> {condition.bound}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

                <Divider orientation="left">Risk Controls</Divider>
                {/* {data.riskControls.map((control, index) => (
                    <div key={control.id}>
                        <h4>Control {index + 1}</h4>
                        <p><strong>ID:</strong> {control.id}</p>
                        <p><strong>Control Name:</strong> {control.controlName}</p>
                        <p><strong>Description:</strong> {control.description}</p>
                        <p><strong>Purpose:</strong> {control.purpose}</p>
                        <p><strong>Owner Department:</strong> {control.riskControlDepartmentOwner.department.name}</p>

                        <Divider orientation="left">Control Indicators</Divider>
                        {control.controlIndicators.map((indicator, ciIndex) => (
                            <div key={indicator.id}>
                                <h5>Control Indicator {ciIndex + 1}</h5>
                                <p><strong>ID:</strong> {indicator.id}</p>
                                <p><strong>Indicator:</strong> {indicator.keyControlIndicator}</p>
                                <p><strong>Description:</strong> {indicator.description}</p>
                                <p><strong>Purpose:</strong> {indicator.purpose}</p>
                                <p><strong>Monitoring Frequency:</strong> {indicator.monitoringFrequency.frequency}</p>
                                <p><strong>Measurement:</strong> {indicator.measurement.name}</p>

                                <Divider orientation="left">RiskIndicatorThresholds</Divider>
                                {indicator.riskindicatorthresholds.map((riskindicatorthreshold, tIndex) => (
                                    <div key={riskindicatorthreshold.id}>
                                        <h6>RiskIndicatorThreshold {tIndex + 1}</h6>
                                        <p><strong>Category:</strong> {riskindicatorthreshold.riskindicatorthresholdCategory.name}</p>
                                        <Divider orientation="left">Comparison Conditions</Divider>
                                        {riskindicatorthreshold.comparisonConditions.map((condition, cIndex) => (
                                            <div key={condition.id}>
                                                <h6>Condition {cIndex + 1}</h6>
                                                <p><strong>Operator:</strong> {condition.comparisonOperator.name}</p>
                                                <p><strong>Bound:</strong> {condition.bound}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))} */}
            </Card>
        </div>
    );
};

export default ViewRiskInfo;
