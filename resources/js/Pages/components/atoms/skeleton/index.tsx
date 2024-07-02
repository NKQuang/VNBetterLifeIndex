import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface CSkeletonProps {
    count?: number;
    circle?: boolean;
    className?: string;
    style?: React.CSSProperties;
    baseColor?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    inline?: boolean;
    duration?: number;
    enableAnimation?: boolean;
}

const CSkeleton: React.FC<CSkeletonProps> = ({ count,
    circle,
    className,
    style,
    baseColor,
    width,
    height,
    borderRadius,
    inline,
    duration,
    enableAnimation }) => {
    return (
        <Skeleton
            count={count}
            circle={circle}
            className={className}
            style={style}
            baseColor={baseColor}
            width={width}
            height={height}
            borderRadius={borderRadius}
            inline={inline}
            duration={duration}
            enableAnimation={enableAnimation}
        />
    );
};

export default CSkeleton;
