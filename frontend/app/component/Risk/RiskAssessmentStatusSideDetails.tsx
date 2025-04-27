import React from 'react';
import { Risk } from '@/app/types/api';
import { Timeline, Tag, Steps } from 'antd';
import styles from './RiskAssessmentStatusSideDetails.module.css';

interface RiskAssessmentStatusSideDetailsProps {
    risk: Risk;
}

const RiskAssessmentStatusSideDetails: React.FC<RiskAssessmentStatusSideDetailsProps> = ({ risk }) => {
    const { riskAssessmentStatus } = risk;
    const { riskStatus, riskAssessmentFlow } = riskAssessmentStatus;
    const { Step } = Steps;

    // Determine if all steps should be marked as complete
    const isApproved = riskStatus.code === 'APPROVED';

    return (
        <div className={styles.statusSideDetails}>
            <div className={styles.title}>Risk Assessment Levels</div>
            <Steps
                direction="vertical"
                current={isApproved ? riskAssessmentFlow.riskAssessmentLevels.length : riskAssessmentFlow.riskAssessmentLevels.findIndex(level => level.current)}
                className={styles.steps}
            >
                {riskAssessmentFlow.riskAssessmentLevels.map((level, index) => (
                    <Step
                        key={level.id}
                        title={<span style={{ fontSize: '12px' }}>{level.name}</span>}
                        description={<span style={{ fontSize: '10px' }}>{level.description}</span>}
                        status={isApproved || level.current || index < riskAssessmentFlow.riskAssessmentLevels.findIndex(level => level.current) ? "finish" : "wait"}
                    />
                ))}
            </Steps>

            <div className={styles.title}>Risk Assessment Status</div>
            <div className={styles.descriptionContentTable}>
                <table className={styles.descriptionTable}>
                    <tbody>
                        <tr>
                            <th>Status</th>
                            <td><Tag color="blue">{riskStatus.name}</Tag></td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{riskStatus.description}</td>
                        </tr>
                        <tr>
                            <th>Code</th>
                            <td>{riskStatus.code}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={styles.title}>Risk Assessment History</div>
            <Timeline className={styles.timeline}>
                {riskAssessmentFlow.riskAssessmentHistories.map((history) => (
                    <Timeline.Item key={history.id}>
                        <div className={styles.timelineItem}>
                            <table className={styles.descriptionTable}>
                                <tbody>
                                    <tr>
                                        <th>Status</th>
                                        <td>{history.riskStatus.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Performed By</th>
                                        <td>{history.performedBy}</td>
                                    </tr>
                                    <tr>
                                        <th>Timestamp</th>
                                        <td>{new Date(history.timestamp).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Comment</th>
                                        <td>{history.comment}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    );
};

export default RiskAssessmentStatusSideDetails;
