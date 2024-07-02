import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './styles.css'

interface TooltipProps {
    children?: React.ReactNode | string | any;
    className?: string;
    place?: | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
    content?: string;
}

const CTooltip: React.FC<TooltipProps> = ({ children, className, place = 'bottom', content }) => (
    <div className='a-tooltip'>
        <Tippy
            content={content}
            className={className}
            placement={place}
        >
            {children}
        </Tippy>
    </div>
);

export default CTooltip;
