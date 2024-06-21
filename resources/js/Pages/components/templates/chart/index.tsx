import React, { useContext, useEffect, useMemo, useState } from 'react';
import FlowerColumn from '../../molecules/flowerColumn';
import './styles.css'
import { exampleDataChart, unit } from '../../../assets/data';
import { mapModifiers } from '../../../utils/functions';
import { ChartContext } from '../../../pages/home.page/index';
import { useChart } from '../provider';
import Loading from '../../atoms/loading';
import Slider from '../../atoms/slider';
import { colorsPetal } from '../../atoms/flower';
import CModal from '../../organisms/modal';

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

type SortType = 'alphabet' | 'rank'

const FlowerChart: React.FC<FlowerChartProps> = ({ isDetail }) => {
    const { isFilter, handleSetIsFilter, loading, chartData, handleSetChartData, handleSetLoading, chartDataRoot } = useChart();
    const [idColumnHover, setIdColumnHover] = useState(0);
    const [softBy, setSortBy] = useState<SortType>('alphabet');

    const [valueAUnit, setValueAUnit] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);


    useEffect(() => {
        const getHeightUnit = document.querySelector('.t-chart_unit div');
        setValueAUnit((getHeightUnit as any).offsetHeight);
    }, [window.innerWidth, window.innerHeight])

    const handleOnMouseEnterColumn = (id?: number) => {
        setIdColumnHover(Number(id));
    }

    const handleOnMouseLeaveColumn = () => { setIdColumnHover(0); }

    const handleSortData = (type: 'alphabet' | 'rank') => {
        setSortBy(type)
        handleSetIsFilter(true);
        switch (type) {
            case 'alphabet':
                const alphabet = chartData?.sort((a: districtItem, b: districtItem) => a.district.localeCompare(b.district));
                handleSetLoading(true);
                handleSetChartData(alphabet as districtItem[])
                break;
            case 'rank':
                const rank = chartData?.sort((a: districtItem, b: districtItem) => a.value - b.value);
                handleSetLoading(true);
                handleSetChartData(rank as districtItem[]);
                break;
        }
    }

    return (
        <>
            <div className={mapModifiers('t-chart', isDetail && 'detail')}>
                <div className='t-chart_unit'>
                    {unit.map((i) => (<div key={i}>{i}&nbsp;-</div>))}
                </div>
                {loading ? <Loading /> :
                    <div className='t-chart_main'>
                        {chartData?.map((item: districtItem, index: number) => (
                            <FlowerColumn
                                unit={valueAUnit}
                                isFilter={isFilter}
                                data={item.indicators}
                                value={item.value}
                                index={index + 1}
                                isHover={index + 1 === idColumnHover}
                                columnName={item.district}
                                onMouseEnter={handleOnMouseEnterColumn}
                                onMouseLeave={handleOnMouseLeaveColumn}
                                handleClickColumn={() => {
                                    alert(JSON.stringify(item))
                                }}
                            />
                        ))}
                    </div>
                }
                <div className='t-chart_filter'>
                    <div>
                        <h3>Tạo chỉ số cuộc sống tốt đẹp hơn của bạn</h3>
                        <p>Đánh giá các chủ đề theo mức độ quan trọng của chúng đối với bạn:</p>
                        <div className="t-chart_filter_box_vote">
                            <button
                                className={mapModifiers('t-chart_filter_box_vote')}
                                onClick={() => {
                                    setIsOpenModal(true)
                                }}
                            >Đánh giá ngay</button>
                        </div>
                    </div>
                    <ul className="t-chart_filter_box_sort">
                        <p>Sắp xếp:</p>
                        <button
                            className={mapModifiers('t-chart_filter_box_sort_item', softBy === 'alphabet' ? 'active' : '')}
                            onClick={() => {
                                if (softBy === 'alphabet') return;
                                handleSortData('alphabet')
                            }}
                        >alphabet</button>
                        <button
                            className={mapModifiers('t-chart_filter_box_sort_item', softBy === 'rank' ? 'active' : '')}
                            onClick={() => {
                                if (softBy === 'rank') return;
                                handleSortData('rank')
                            }}
                        >Theo giá trị</button>
                    </ul>

                </div>
            </div>
            <CModal open={isOpenModal} onClose={() => setIsOpenModal(false)} >
                <div>

                </div>
            </CModal>
        </>
    )
};

FlowerChart.defaultProps = {
    isDetail: false

};

export default FlowerChart;
