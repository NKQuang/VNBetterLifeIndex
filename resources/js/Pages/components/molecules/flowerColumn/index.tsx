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
    value: number;
    data: Indicator[];
    handleClickColumn?: () => void;
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
    handleClickColumn
}) => {
    const refName = useRef<any>(null);
    const refLine = useRef<HTMLDivElement>(null);
    const refColumn = useRef<HTMLDivElement>(null);
    const refBoxHover = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refLine.current && refColumn.current) {
            refLine.current.style.height = `${refColumn.current?.offsetHeight - 130 - refName.current?.offsetHeight
                }px` as any;
        }
    }, [value]);

    useEffect(() => {
        if (isHover && refBoxHover.current) {
            const { top, left } = refBoxHover.current.getBoundingClientRect();
            const windowWidth = (window.innerWidth - 340) / 10

            if (top >= 300) {
                refBoxHover.current.style.top = 'unset';
                refBoxHover.current.style.bottom = '50%';
            } else {
                refBoxHover.current.style.bottom = 'unset'; // Reset lại khi điều kiện không đúng
                refBoxHover.current.style.top = '80px'; // Reset lại khi điều kiện không đúng
            }

            if (left >= windowWidth * 5) {
                refBoxHover.current.style.left = 'unset';
                refBoxHover.current.style.right = '70%';
            } else {
                refBoxHover.current.style.left = '70%'; // Reset lại khi điều kiện không đúng
                refBoxHover.current.style.right = 'unset';
            }
        }
    }, [isHover]);

    return (
        <div
            key={index}
            style={{ height: value * 44.5, animation: isFilter ? 'animateShowerFilter 1s ease forwards' : '' }}
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
            <div className="m-column_content">
                <Flower data={data} />
                <div ref={refName} className="m-column_content_name">
                    {columnName}
                </div>
                <div ref={refLine} className="m-column_content_line" />
            </div>
            {isHover && (
                <div className="m-column_hover" ref={refBoxHover}>
                    <div className="m-column_hover_name">
                        <p>{columnName}</p>
                    </div>
                    <div className="m-column_hover_content">
                        <div>
                            <span>Housing:</span>
                            <div style={{ width: data[0].value * 10, backgroundColor: colorsPetal[0] }} />
                        </div>
                        <div>
                            <span>Income:</span>
                            <div style={{ width: data[1].value * 10, backgroundColor: colorsPetal[1] }} />
                        </div>
                        <div>
                            <span>Jobs:</span>
                            <div style={{ width: data[2].value * 10, backgroundColor: colorsPetal[2] }} />
                        </div>
                        <div>
                            <span>Community:</span>
                            <div style={{ width: data[3].value * 10, backgroundColor: colorsPetal[3] }} />
                        </div>
                        <div>
                            <span>Education:</span>
                            <div style={{ width: data[4].value * 10, backgroundColor: colorsPetal[4] }} />
                        </div>
                        <div>
                            <span>Environment:</span>
                            <div style={{ width: data[5].value * 10, backgroundColor: colorsPetal[5] }} />
                        </div>
                        <div>
                            <span>Civic Engagement:</span>
                            <div style={{ width: data[6].value * 10, backgroundColor: colorsPetal[6] }} />
                        </div>
                        <div>
                            <span>Health:</span>
                            <div style={{ width: data[7].value * 10, backgroundColor: colorsPetal[7] }} />
                        </div>
                        <div>
                            <span>Life Satisfaction:</span>
                            <div style={{ width: data[8].value * 10, backgroundColor: colorsPetal[8] }} />
                        </div>
                        <div>
                            <span>Safety:</span>
                            <div style={{ width: data[9].value * 10, backgroundColor: colorsPetal[9] }} />
                        </div>
                        <div>
                            <span>Work-Life Balance:</span>
                            <div style={{ width: data[10].value * 10, backgroundColor: colorsPetal[10] }} />
                        </div>
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
