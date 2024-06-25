import React from 'react';
import './styles.css'

interface PetalProps {
    angle: number;
    color: string;
    height: number;
}

const Petal: React.FC<PetalProps> = ({ angle, color, height }) => {
    return (
        <g transform={`rotate(${angle}) scale(1)`} stroke="#000" strokeWidth="1">
            {height === 0 ?
                <path d={`M 0 0 Q 66 -12 79 0 Q 66 12 0 0`} fill={'#fff'} /> :
                <path d={`M 0 0 Q ${height * 11.9} -18 ${height * 15} 0 Q ${height * 11.9} 17 0 0`} fill={color} />
            }
        </g>
    );
};

export default Petal;
