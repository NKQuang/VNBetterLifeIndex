import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import FlowerColumn from '../../molecules/flowerColumn';
import './styles.css'
import { unit } from '../../../assets/data';
import { mapModifiers } from '../../../utils/functions';
import { useBetterLife } from '../provider';
import Loading from '../../atoms/loading';
import Slider from '../../atoms/slider';
import CModal from '../../organisms/modal';
import Dropdown, { DropdownType } from '../../atoms/dropdown';
import { getWBI, postDistrictsIndicators } from '../../../services/apis';
import { toast } from 'react-toastify';

export interface districtItem {
    district_id: string | number;
    district: string;
    value: number;
    indicators: Indicator[];
}

export interface Indicator {
    indicator_id: string;
    indicator: string;
    value: number;
    weightedValue: number;
}

interface FlowerChartProps {
    isDetail?: boolean;
    isMobile?: boolean;
}


type SortType = 'alphabet' | 'rank'

const FlowerChartMobile: React.FC<FlowerChartProps> = ({ isDetail = false, isMobile }) => {
    const { isFilter,
        loading,
        chartData,
        infoDetail,
        handleSetLoading,
        handleSetInfoDetail,
        handleShowDetail,
        districtIndicators,
        handleSetDistrictActive
    } = useBetterLife();

    const [idColumnHover, setIdColumnHover] = useState(0);

    const [valueAUnit, setValueAUnit] = useState(0);

    useEffect(() => {
        const getHeightUnit = document.querySelector('.t-chart_unit div');
        setValueAUnit((getHeightUnit as any).offsetHeight);
    }, [window.innerWidth, window.innerHeight])

    const handleOnMouseEnterColumn = (id?: number) => {
        setIdColumnHover(Number(id));
    }

    const handleOnMouseLeaveColumn = () => { setIdColumnHover(0); }

    useEffect(() => {
        const elment = document.querySelector('.m-column-flower-active');
        elment?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
        })
    }, [infoDetail, loading])

    return (
        <>
            <div className={mapModifiers('t-chart', isDetail && 'detail', isMobile ? 'mobile' : 'normal')}>
                <div className='t-chart_unit'>
                    {unit.map((i) => (<div key={i}>{i}&nbsp;-</div>))}
                </div>
                {loading ? <Loading /> :
                    <div className='t-chart_main'>
                        {(chartData || [])?.map((item: districtItem, index: number) => (
                            <FlowerColumn
                                isActive={item.district_id === infoDetail?.district_id}
                                isMobile={isMobile}
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
                                    handleSetInfoDetail(item);
                                    handleShowDetail(true);
                                    handleSetLoading(true);
                                    const districtActive = districtIndicators?.districts.filter((i) => i.id === item.district_id);
                                    handleSetDistrictActive((districtActive || [])[0]);
                                }}
                            />
                        ))}
                    </div>
                }
            </div>
        </>
    )
};

export default FlowerChartMobile;
