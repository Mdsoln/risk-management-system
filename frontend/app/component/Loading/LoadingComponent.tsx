import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './LoadingComponent.module.css';

interface LoadingComponentProps {
    message?: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ message = "Loading" }) => {
    const loadingIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
    const [ellipsis, setEllipsis] = useState("");

    // Cycle through ellipsis states
    useEffect(() => {
        const interval = setInterval(() => {
            setEllipsis(prev => {
                if (prev === "...") return "";
                return prev + ".";
            });
        }, 400); // Change the duration to control the speed of the animation

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    return ReactDOM.createPortal(
        <div className={styles.loaderContainer}>
            <Spin indicator={loadingIcon} size="large" />
            <div className={styles.loadingMessage}>
                {message}, please wait<span className={styles.ellipsis}>{ellipsis}</span>
            </div>
        </div>,
        document.body // Render the loader directly in the body element
    );
};

export default LoadingComponent;
