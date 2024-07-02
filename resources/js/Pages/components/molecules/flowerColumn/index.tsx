import React, { useEffect, useRef } from "react";
import Flower, { colorsPetal } from "../../atoms/flower";
import "./styles.css";
import { mapModifiers } from "../../../utils/functions";
import { Indicator } from "../../templates/chart";

interface FlowerColumnProps {
    columnName: string;
    isHover: boolean;
    isFilter: boolean;
    onMouseEnter?: (number?: number) => void;
    onMouseLeave?: (number?: number) => void;
    index: number;
    unit: number;
    value: number;
    data: Indicator[];
    handleClickColumn?: () => void;
    isDetail?: boolean;
    isMobile?: boolean;
    isActive?: boolean;
}
const FlowerColumn: React.FC<FlowerColumnProps> = ({
    columnName,
    isHover,
    onMouseLeave,
    onMouseEnter,
    index,
    data,
    value,
    isFilter,
    unit,
    handleClickColumn,
    isDetail = false,
    isMobile = false,
    isActive = false,
}) => {
    const refName = useRef<any>(null);
    const refLine = useRef<HTMLDivElement>(null);
    const refColumn = useRef<HTMLDivElement>(null);
    const refBoxHover = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refLine.current && refColumn.current) {
            refLine.current.style.height = `${Number(value * unit + 40) - 80 - refName.current?.offsetHeight
                }px` as any;
        }
    }, [value, refLine.current, unit]);

    useEffect(() => {
        if (isHover && refBoxHover.current) {
            const { top, left } = refBoxHover.current.getBoundingClientRect();
            const windowWidth = (window.innerWidth - 340) / 12

            if (top >= 300) {
                refBoxHover.current.style.top = 'unset';
                refBoxHover.current.style.bottom = '20%';
            } else {
                refBoxHover.current.style.bottom = 'unset'; // Reset lại khi điều kiện không đúng
                refBoxHover.current.style.top = '100px'; // Reset lại khi điều kiện không đúng
            }

            if (left >= windowWidth * 6) {
                refBoxHover.current.style.left = 'unset';
                refBoxHover.current.style.right = '150%';
            } else {
                refBoxHover.current.style.left = '150%'; // Reset lại khi điều kiện không đúng
                refBoxHover.current.style.right = 'unset';
            }
        }
        const getColumn = document.querySelectorAll(`.t-district_chart_main > *`);
        getColumn[Math.floor(Number(getColumn.length - 1) / 2 - 0.1)]?.classList.add('column-active')

    }, [isHover]);

    return (
        <div
            key={value}
            style={{
                height: isMobile ? Number(value * unit + 44) : Number(value * unit + 17),
                animation: isFilter ? 'animateShowerFilter 1s ease forwards' : ''
            }}
            className={mapModifiers("m-column", isHover && "hover", isMobile ? 'mobile' : 'normal', isActive && 'flower-active')}
            ref={refColumn}
            onClick={handleClickColumn}
        >
            {isMobile ?
                <div
                    className={mapModifiers("m-column_content", isMobile ? 'mobile' : 'normal')}
                >
                    <p>{value.toFixed(2)}</p>
                    <div ref={refName} className="m-column_content_name">
                        {columnName}
                    </div>
                    <Flower data={data} onMouseEnter={() => {
                        if (onMouseEnter) onMouseEnter(index);
                    }}
                        onMouseLeave={() => {
                            if (onMouseLeave) onMouseLeave(index);
                        }} />
                    <div ref={refLine} className="m-column_content_line" />
                </div>
                :
                <div className="m-column_content">
                    <p>{value.toFixed(2)}</p>
                    <Flower data={data} onMouseEnter={() => {
                        if (onMouseEnter) onMouseEnter(index);
                    }}
                        onMouseLeave={() => {
                            if (onMouseLeave) onMouseLeave(index);
                        }} />
                    <div ref={refName} className="m-column_content_name">
                        {columnName}
                    </div>
                    <div ref={refLine} className="m-column_content_line" />
                </div>
            }
            {isHover && !isMobile && (
                <div className="m-column_hover" ref={refBoxHover}>
                    <div className="m-column_hover_name">
                        <p>{columnName}</p>
                    </div>
                    <div className="m-column_hover_content">
                        {data?.map((item, index) => (
                            <div key={item.value}>
                                <span>{item.indicator}:</span>
                                <div style={{ width: (item.value / 10) * 100, backgroundColor: colorsPetal[index] }} >
                                    <p>{item.value.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-column_hover_unit">
                        <span>Estimated:</span>
                        <ul>
                            <li>
                                0
                            </li>
                            <li>5</li>
                            <li>10</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlowerColumn;
