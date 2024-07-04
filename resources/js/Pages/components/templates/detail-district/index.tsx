import React, { useEffect, useState } from 'react';
import './styles.css'
import { useBetterLife } from '../provider';
import { unit } from '../../../assets/data';
import { districtItem } from '../chart';
import FlowerColumn from '../../molecules/flowerColumn';

const ChartDetailDistrict: React.FC = () => {
    const {
        handleShowDetail,
        handleSetLoading,
        chartData,
        infoDetail,
        handleSetInfoDetail,
        districtIndicators,
        handleSetDistrictActive
    } = useBetterLife();
    const [idColumnHover, setIdColumnHover] = useState(0);
    const [valueAUnit, setValueAUnit] = useState(0);

    useEffect(() => {
        const getHeightUnit = document.querySelector('.t-district_chart_unit div');
        setValueAUnit((getHeightUnit as any).offsetHeight);
    }, [window.innerWidth, window.innerHeight])

    useEffect(() => {
        const getColumn = document.querySelectorAll(`.t-district_chart_main > *`);
        getColumn[Math.floor(Number(getColumn.length - 1) / 2 - 0.1)]?.classList.add('column-active')
    }, [chartData, infoDetail])

    const handleOnMouseEnterColumn = (id?: number) => {
        setIdColumnHover(Number(id));
    }

    const handleOnMouseLeaveColumn = () => { setIdColumnHover(0); }

    return (
        <div className='p-district'>
            <div className='p-district_back' onClick={() => {
                handleSetLoading(true);
                handleShowDetail(false);
            }}>
                <i className="fa-solid fa-arrow-left-long"></i>
            </div>
            <div className='p-district_chart'>
                <div className='t-district_chart_unit'>
                    {unit.map((i) => (<div key={i}>{i}&nbsp;-</div>))}
                </div>
                <div className='t-district_chart_main'>
                    {chartData?.filter((column) => column.district !== infoDetail?.district)?.map((item: districtItem, index: number) => (
                        <FlowerColumn
                            unit={valueAUnit}
                            isFilter={false}
                            data={item.indicators}
                            value={item.value}
                            index={index + 1}
                            onMouseEnter={handleOnMouseEnterColumn}
                            onMouseLeave={handleOnMouseLeaveColumn}
                            isHover={index + 1 === idColumnHover}
                            columnName={item.district}
                            handleClickColumn={() => {
                                handleSetInfoDetail(item);
                                handleSetLoading(true);
                                const districtActive = districtIndicators?.districts.filter((i) => i.id === item.district_id);
                                handleSetDistrictActive((districtActive || [])[0]);
                            }}
                        />
                    ))}
                </div>
                <div className='t-district_chart_main-flower_active'>
                    <FlowerColumn
                        unit={valueAUnit}
                        isFilter={false}
                        data={infoDetail?.indicators as any}
                        value={infoDetail?.value as any}
                        onMouseEnter={handleOnMouseEnterColumn}
                        onMouseLeave={handleOnMouseLeaveColumn}
                        columnName={infoDetail?.district as any}
                        isHover={Number(chartData?.length) + 2 === idColumnHover}
                        index={Number(chartData?.length) + 2}
                        isDetail
                        isActive
                    />
                </div>
            </div>
        </div>
    );
}

export default ChartDetailDistrict;
ChartDetailDistrict;
