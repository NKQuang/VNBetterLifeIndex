import React, { useEffect, useRef } from "react";
import Flower, { colorsPetal } from "../../atoms/flower";
import "./styles.css";
import { mapModifiers } from "../../../utils/functions";
import { districtItem, Indicator } from "../../templates/chart";

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
}) => {
    const refName = useRef<any>(null);
    const refLine = useRef<HTMLDivElement>(null);
    const refColumn = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refLine.current && refColumn.current) {
            refLine.current.style.height = `${Number(refColumn.current?.offsetHeight) - 80 - refName.current?.offsetHeight
                }px` as any;
        }
    }, [value]);

    return (
        <div
            key={value}
            style={{
                height: Number(isDetail ? 400 : value * unit),
                animation: isFilter ? 'animateShowerFilter 1s ease forwards' : ''
            }}
            className={mapModifiers("m-column", isHover && "hover")}
            onMouseEnter={() => {
                if (onMouseEnter) onMouseEnter(index);
            }}
            onMouseLeave={() => {
                if (onMouseLeave) onMouseLeave(index);
            }}
            ref={refColumn}
            onClick={handleClickColumn}
        >
            {isMobile ?
                <div
                    className={mapModifiers("m-column_content", isMobile ? 'mobile' : 'normal')}>
                    <div ref={refName} className="m-column_content_name">
                        {columnName}
                    </div>
                    <Flower data={data} />
                    <div ref={refLine} className="m-column_content_line" />
                </div>
                :
                <div className="m-column_content">
                    <Flower data={data} />
                    <div ref={refName} className="m-column_content_name">
                        {columnName}
                    </div>
                    <div ref={refLine} className="m-column_content_line" />
                </div>
            }
        </div>
    );
};

export default FlowerColumn;
