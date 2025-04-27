import React from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import styles from './RiskMatrix.module.css';
import { RiskMatrixResult } from '@/app/types/api';

interface RiskMatrixProps {
    riskMatrixResult: RiskMatrixResult;
    title: string;
}

const RiskMatrix: React.FC<RiskMatrixProps> = ({ riskMatrixResult, title }) => {
    const { matrix, impactScores, likelihoodScores } = riskMatrixResult;

    if (!matrix || matrix.length === 0) {
        return <div>No risk matrix data available.</div>;
    }

    return (
        <div className={styles.riskMatrix}>
            <div className={styles.matrixHeader}>{title}</div>
            <table className={styles.matrixTable}>
                <thead>
                    <tr>
                        <th colSpan={2} className={styles.matrixTableTh}>Impact</th>
                        {impactScores.map((score) => (
                            <th key={score} className={styles.matrixTableTh}>{score}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, i) => (
                        <tr key={i}>
                            {i === 0 && <th rowSpan={5} className={styles.matrixTableTh}>Likelihood</th>}
                            <th className={styles.matrixTableTh}>{likelihoodScores[4 - i]}</th>
                            {row.map((cell, j) => (
                                <td key={j} className={`${styles.matrixTableTd} ${cell.highlighted ? styles.highlighted : ''}`} style={{ backgroundColor: cell.color }}>
                                    {cell.highlighted ? <CheckCircleFilled className={styles.iconHighlighted} style={{ color: 'black', paddingRight: '8px', fontSize: '18px' }} /> : ""}
                                    {cell.level}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RiskMatrix;
