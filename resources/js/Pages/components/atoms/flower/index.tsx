import React from 'react';
import Petal from '../petal';
import './style.css'
import { districtItem, Indicator } from '../../templates/chart';

interface FlowerProps {
    data: Indicator[];
}

export const colorsPetal = [
    '#33a594', '#1ea2e2', '#197ebf', '#db4c60', '#7fad3e',
    '#21a554', '#deaa00', '#7e3874', '#e5632f', '#606060',
    '#992825', '#04566e'
];

const Flower: React.FC<FlowerProps> = ({ data }) => {
    return (
        <svg id='flower' viewBox="-100 -100 200 200" height={100} >
            {data.map((item, i) => (
                <Petal height={item?.value ?? 0} key={i} angle={i * 30} color={colorsPetal[i]} />
            ))}
        </svg>
    );
}

Flower.defaultProps = {
};

export default Flower;
