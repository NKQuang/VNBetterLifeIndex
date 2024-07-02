import React from 'react';
import Petal from '../petal';
import './style.css'
import { districtItem, Indicator } from '../../templates/chart';
import { useBetterLife } from '../../templates/provider';

interface FlowerProps {
    data: Indicator[];
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const colorsPetal = [
    '#33a594', '#1ea2e2', '#197ebf', '#db4c60', '#7fad3e',
    '#21a554', '#deaa00', '#7e3874', '#e5632f', '#606060',
    '#992825', '#04566e'
];

const Flower: React.FC<FlowerProps> = ({ data, onMouseEnter, onMouseLeave }) => {
    const { sreenWidth
    } = useBetterLife();
    return (
        <svg
            id='flower'
            viewBox="-140 -140 280 280"
            height={200}
            style={{ animation: sreenWidth > 1025 ? 'flowerShower 1s ease-out forwards' : 'flowerShowerMobile 1s ease-out forwards' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {data.map((item, i) => (
                <Petal height={item?.value ?? 0} key={i} angle={i * 30} color={colorsPetal[i]} />
            ))}
        </svg>
    );
}

export default Flower;
