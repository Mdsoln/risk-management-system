import React from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import styles from './AggregatedRiskMatrix.module.css';
import { RiskMatrixResult } from '@/app/types/api'; // Adjust the path as per your project structure
import { Badge } from 'antd';

interface AggregatedRiskMatrixProps {
    riskMatrixResult: RiskMatrixResult;
    title: string;
}

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AggregatedRiskMatrix: React.FC<AggregatedRiskMatrixProps> = ({ riskMatrixResult, title }) => {
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
                            {i === 0 && (
                                <th rowSpan={matrix.length} className={styles.verticalText}>
                                    Likelihood
                                </th>
                            )}
                            <th className={styles.matrixTableTh}>
                                {likelihoodScores[likelihoodScores.length - 1 - i]}
                            </th>
                            {row.map((cell, j) => (
                                <td
                                    key={j}
                                    className={`${styles.matrixTableTd} ${cell.highlighted ? styles.highlighted : ''}`}
                                    style={{ backgroundColor: cell.color }}
                                >
                                    {/* {cell.level} */}
                                    {cell.highlighted ? (
                                        <CheckCircleFilled
                                            className={styles.iconHighlighted}
                                            style={{ color: 'black', paddingRight: '8px', fontSize: '18px' }}
                                        />
                                    ) : (
                                        ""
                                    )}
                                    <Badge
                                        count={getRandomNumber(0, 20)}
                                        showZero
                                        style={{
                                            fontSize: '10px',       // Set the font size to 10px
                                            backgroundColor: '#000', // Set the background color to black
                                            color: '#ffffff',        // Set the text color to white
                                        }}
                                    />


                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AggregatedRiskMatrix;