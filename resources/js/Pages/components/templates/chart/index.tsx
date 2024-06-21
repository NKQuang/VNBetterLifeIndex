import React, { useContext, useEffect, useMemo, useState } from 'react';
import FlowerColumn from '../../molecules/flowerColumn';
import './styles.css';
import { exampleDataChart, unit } from '../../../assets/data';
import { mapModifiers } from '../../../utils/functions';
import { ChartContext } from '../../../pages/home.page/index';
import { useChart } from '../provider';
import Loading from '../../atoms/loading';

interface FlowerChartProps {
    isDetail?: boolean;
}

export interface districtItem {
    district: string;
    value: number;
    indicators: Indicator[];
}

export interface Indicator {
    indicator: string;
    value: number;
    weightedValue: number;
}

type SortType = 'alphabet' | 'rank';

const FlowerChart: React.FC<FlowerChartProps> = ({ isDetail = false }) => {
    const { isFilter, handleSetIsFilter, loading, chartData, handleSetChartData, handleSetLoading } = useChart();
    const [idColumnHover, setIdColumnHover] = useState(0);
    const [softBy, setSortBy] = useState<SortType>('alphabet');

    const handleOnMouseEnterColumn = (id?: number) => {
        setIdColumnHover(Number(id));
    }
    const handleOnMouseLeaveColumn = () => { setIdColumnHover(0); }

    const handleSortData = (type: 'alphabet' | 'rank') => {
        setSortBy(type);
        handleSetIsFilter(true);
        switch (type) {
            case 'alphabet':
                const alphabet = chartData?.sort((a: districtItem, b: districtItem) => a.district.localeCompare(b.district));
                handleSetLoading(true);
                handleSetChartData(alphabet as districtItem[]);
                break;
            case 'rank':
                const rank = chartData?.sort((a: districtItem, b: districtItem) => a.value - b.value);
                handleSetLoading(true);
                handleSetChartData(rank as districtItem[]);
                break;
        }
    }

    return (
        <div className={mapModifiers('t-chart', isDetail && 'detail')}>
            <div className='t-chart_unit'>
                {unit.map((i) => (<div key={i}>{i}&nbsp;-</div>))}
            </div>
            {loading ? <Loading /> :
                <div className='t-chart_main'>
                    {chartData?.map((item: districtItem, index: number) => (
                        <FlowerColumn
                            isFilter={isFilter}
                            data={item.indicators}
                            value={item.value}
                            index={index + 1}
                            isHover={index + 1 === idColumnHover}
                            columnName={item.district}
                            onMouseEnter={handleOnMouseEnterColumn}
                            onMouseLeave={handleOnMouseLeaveColumn}
                            handleClickColumn={() => {
                                console.log(item);
                            }}
                        />
                    ))}
                </div>
            }
            <div className='t-chart_filter'>
                <h3>Create Your Better Life Index</h3>
                <p>Rate the topics according to their importance to you:</p>
                <div className="t-chart_filter_box">
                    <ul className="t-chart_filter_box_sort">
                        <button
                            className={mapModifiers('t-chart_filter_box_sort_item', softBy === 'alphabet' ? 'active' : '')}
                            onClick={() => {
                                if (softBy === 'alphabet') return;
                                handleSortData('alphabet');
                            }}
                        >alphabetically</button>
                        <button
                            className={mapModifiers('t-chart_filter_box_sort_item', softBy === 'rank' ? 'active' : '')}
                            onClick={() => {
                                if (softBy === 'rank') return;
                                handleSortData('rank');
                            }}
                        >by rank</button>
                    </ul>
                    <div className="t-chart_filter_box_content">
                        <div className="t-chart_filter_box_content_wrapper">
                            <div className="t-chart_filter_box_content_item">
                                <span>Housing:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Income:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Jobs:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Community:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Education:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Environment:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Civic Engagement:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Health:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Life Satisfaction:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Safety:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                            <div className="t-chart_filter_box_content_item">
                                <span>Work-Life Balance:</span>
                                <input type="range" step={2} max={10} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FlowerChart;
