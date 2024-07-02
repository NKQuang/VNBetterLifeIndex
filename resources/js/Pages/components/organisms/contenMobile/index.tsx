import React, { useEffect, useState } from 'react';
import './styles.css'
import { mapModifiers } from '../../../utils/functions';

import { useBetterLife } from '../../templates/provider';
import icHousing from '../../../assets/images/housing.svg';
import icIncome from '../../../assets/images/income.svg';
import icJobs from '../../../assets/images/jobs.svg';
import icCommunity from '../../../assets/images/community.svg';
import icEducation from '../../../assets/images/education.svg';
import icEnvironment from '../../../assets/images/environment.svg';
import icCivicEngagement from '../../../assets/images/civic_engagement.svg';
import icHearth from '../../../assets/images/hearth.svg';
import icSatisfaction from '../../../assets/images/satisfaction.svg';
import icSafety from '../../../assets/images/safety.svg';
import icWorkLifeBalance from '../../../assets/images/work-life-balance.svg';
import icAdministration from '../../../assets/images/city-hall.svg';

import FlowerChartMobile, { districtItem, Indicator } from '../../templates/chart-mobile';
import { colorsPetal } from '../../atoms/flower';

import { SortType } from '../../templates/chart';
import CTooltip from '../../atoms/tooltip';
import Loading from '../../atoms/loading';
import CSkeleton from '../../atoms/skeleton';

const IconAllowIndicators = [icIncome, icJobs, icHearth, icEducation, icHousing, icSatisfaction, icEnvironment, icSafety, icWorkLifeBalance, icCommunity, icCivicEngagement, icAdministration]

interface ContentMobileProps {
    handleLogin: () => void;
}

const ContentMobile: React.FC<ContentMobileProps> = ({
    handleLogin
}) => {
    const {
        theme,
        handleShowDetail,
        isShowDetail,
        sreenWidth,
        indicators,
        chartDataRoot,
        chartData,
        handleSetChartData,
        handleSetLoading,
        handleSetIsFilter,
        infoDetail,
        handleSetInfoDetail,
        loading,
        allIndicators,
        districtActive
    } = useBetterLife();

    const [idIndicatorsActive, setIdIndicatorsActive] = useState<number>(99);
    const [softBy, setSortBy] = useState<SortType>('alphabet');

    const handleSortAllowIndicator = (id: any) => {
        setIdIndicatorsActive(id);
        const newList = chartDataRoot?.map((item) => ({
            ...item,
            value: item.indicators.find((i: Indicator) => i.indicator_id === id)?.value
        }))?.sort((a: any, b: any) => a.value - b.value);
        handleSetChartData(newList as any);
        handleSetLoading(true);
    }

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

    useEffect(() => {
        const getColumnActive = document.querySelector('.m-column-flower-active');
        if (getColumnActive) {
            getColumnActive.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }, [isShowDetail, infoDetail, chartData])

    return (
        <div className={mapModifiers('t-mobile_body', theme)}>
            <div className="t-mobile_body_flower">
                <FlowerChartMobile isMobile={sreenWidth < 1025} />
            </div>
            {isShowDetail &&
                <div className='p-district_back' onClick={() => {
                    handleSetLoading(true);
                    handleShowDetail(false);
                    handleSetChartData(chartDataRoot as any);
                    handleSetInfoDetail(undefined as any);
                }}>
                    <i className="fa-solid fa-arrow-left-long" style={{ fontSize: 30, color: '#0141a1' }}></i>
                </div>
            }
            {isShowDetail ?
                <ul className="t-mobile_body_detail-indicators">
                    {
                        loading ?
                            <div style={{ height: 'fit-content', width: '98vw' }}>
                                <CSkeleton count={3} height={20} />
                            </div>
                            :
                            infoDetail?.indicators?.map((indicator, index) => (
                                <li key={indicator.indicator_id} style={{
                                }}>
                                    <span style={{
                                        backgroundColor: colorsPetal[index],
                                        fontSize: 12,
                                    }}>{indicator.indicator}:  {indicator.value.toFixed(2)}</span>
                                </li>
                            ))}
                </ul>
                : null}
            {isShowDetail ? null :
                <div className="t-mobile_body_filter">
                    {idIndicatorsActive !== 99 ?
                        <p>Sắp xếp theo: <strong style={{ marginLeft: 6 }}>{(indicators || [])[idIndicatorsActive - 1]?.label ?? ''}</strong></p>
                        : <p style={{ height: 24 }} >Chọn một chỉ số bạn muốn sắp xếp</p>
                    }
                    <div className="t-mobile_body_filter_wrapper">
                        {indicators?.map((item, index) => (
                            <div
                                key={item.value}
                                style={{ backgroundColor: idIndicatorsActive === item.id ? '#fff' : colorsPetal[index] }}
                                onClick={() => {
                                    handleSortAllowIndicator(item.id)
                                }}
                            >
                                <img src={[IconAllowIndicators[index]] as any} alt="" />
                            </div>
                        ))}
                    </div>
                    <div className="t-mobile_body_filter_wrapper_button">
                        <button
                            style={{ backgroundColor: softBy === 'alphabet' ? '#01a101' : '#fff', color: softBy === 'alphabet' ? '#fff' : '#000', border: 'unset' }}
                            onClick={() => {
                                if (softBy === 'alphabet') return;
                                handleSortData('alphabet')
                            }}>A - Z</button>
                        <button onClick={() => {
                            handleSetChartData(chartDataRoot as any);
                            handleSetLoading(true);
                            setIdIndicatorsActive(99);
                        }}><i className="fa-solid fa-rotate-left" style={{ marginRight: 6 }}></i>Reset</button>
                        <button
                            style={{ backgroundColor: softBy === 'rank' ? '#0141a1' : '#fff', border: 'unset', color: softBy === 'rank' ? '#fff' : '#000', }}
                            onClick={() => {
                                if (softBy === 'rank') return;
                                handleSortData('rank')
                            }}>Xếp hàng WBI</button>

                    </div>
                </div>
            }

        </div >
    )
}


export default ContentMobile;
