import React, { CSSProperties } from 'react';
import './styles.css'
interface LoadingProps {
    styles?: CSSProperties;
}

const Loading: React.FC<LoadingProps> = ({ styles }) => (
    <div className='a-loading' style={styles}>
        <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
        </div>
    </div>
);

export default Loading;
