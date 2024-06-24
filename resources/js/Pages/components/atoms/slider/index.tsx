import React from 'react';
import './styles.css';

interface SliderProps {
    step: number;
    max: number;
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (value: string | number) => void;
}

const Slider: React.FC<SliderProps> = ({ step, max, value, onChange, defaultValue }) => {
    const renderMarkers = () => {
        const markers: JSX.Element[] = [];
        for (let i = 0; i <= max - 1; i += step) {
            markers.push(
                <div key={i} className="slider-marker" style={{ left: `${(i / max) * 100}%` }}>
                    {[0, max].includes(i) ? '' : '-'}
                </div>
            );
        }
        return markers;
    }

    return (
        <div className='a-slider'>
            <input
                type="range"
                step={step}
                max={max}
                value={value}
                defaultValue={defaultValue}
                onChange={(event) => {
                    if (onChange) onChange(event.target.value);
                }}
            />
            <div className="slider-markers">
                {renderMarkers()}
            </div>
            <div className="slider-unit">
                <p style={{ fontWeight: Number(value) === 0 ? 600 : 400, }}>0</p>
                <p style={{ fontWeight: 600, color: Number(value) < 5 ? '#f00' : 'green' }}>{`${value ?? 0}/${max}`}</p>
                <p style={{ fontWeight: Number(value) === max ? 600 : 400, }}>{max}</p>
            </div>
        </div>
    );
};

Slider.defaultProps = {
    step: 2,
    max: 10,
};

export default Slider;
