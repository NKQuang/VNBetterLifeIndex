import React from 'react';
import './styles.css'

interface PetalProps {
    angle: number;
    color: string;
    height: number;
}

const Petal: React.FC<PetalProps> = ({ angle, color, height }) => {
    return (
        <g transform={`rotate(${angle - 5}) scale(0.9)`} stroke="#000" strokeWidth="1">
            {height === 0 ?
                <path d={`M 0 0 Q 63 -16 88 0 Q 65 16 0 0`} fill={'#fff'} /> :
                <path d={`M 1 6 Q ${height * 12.9} -19 ${height * 18 - 15} 0 Q ${height * 12.9} 17 0 0`} fill={color} />
            }
        </g>
    );
};

export default Petal;
