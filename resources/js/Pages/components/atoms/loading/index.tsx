import React from 'react';
import './styles.css'
interface LoadingProps {
}

const Loading: React.FC<LoadingProps> = ({ }) => (
    <div className='a-loading'>
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

Loading.defaultProps = {
};

export default Loading;
