import React, { useState, CSSProperties } from 'react';
import { Button } from 'antd';

interface ReadMoreProps {
    text: string | React.ReactNode;
    textSize?: string;
    style?: CSSProperties;
    noOfChar?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, textSize = '12px', style, noOfChar = 50 }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    const combinedStyle = { fontSize: textSize, ...style, display: 'inline' };

    const renderText = () => {
        if (typeof text === 'string') {
            return (
                <>
                    <span dangerouslySetInnerHTML={{ __html: isReadMore ? text.slice(0, noOfChar) + '...' : text }} />
                    {text.length > noOfChar && (
                        <Button type="link" onClick={toggleReadMore} style={{ fontSize: textSize, display: 'inline', paddingLeft: 0 }}>
                            {isReadMore ? 'read more' : ' show less'}
                        </Button>
                    )}
                </>
            );
        } else {
            return text;
        }
    };

    return <span style={combinedStyle}>{renderText()}</span>;
};

export default ReadMore;
