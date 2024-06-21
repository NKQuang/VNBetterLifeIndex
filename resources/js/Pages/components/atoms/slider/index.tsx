import React from 'react';
import './styles.css';

interface SliderProps {
    step: number;
    max: number;
    value?: string | number;
    onChange?: (value: string | number) => void;
}

const Slider: React.FC<SliderProps> = ({ step, max, value, onChange }) => {
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
                onChange={(event) => {
                    if (onChange) onChange(event.target.value);
                }}
            />
            <div className="slider-markers">
                {renderMarkers()}
            </div>
        </div>
    );
};

Slider.defaultProps = {
    step: 2,
    max: 10,
};

export default Slider;
