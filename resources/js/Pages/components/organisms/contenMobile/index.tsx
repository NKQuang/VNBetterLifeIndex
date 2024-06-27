import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import { mapModifiers } from '../../../utils/functions';

import { useBetterLife } from '../../templates/provider';
import { exampleDataChart } from '../../../assets/data';
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

import FlowerChartMobile, { Indicator } from '../../templates/chart-mobile';
import { colorsPetal } from '../../atoms/flower';

const IconAllowIndicators = [icIncome, icJobs, icHearth, icEducation, icHousing, icSatisfaction, icEnvironment, icSafety, icWorkLifeBalance, icCommunity, icCivicEngagement, icAdministration]

interface ContentMobileProps {
}

const ContentMobile: React.FC<ContentMobileProps> = ({

}) => {
    const {
        theme,
        handleSetTheme,
        sreenWidth,
        indicators,
        chartDataRoot,
        handleSetChartData,
        handleSetLoading
    } = useBetterLife();
    const [indexDistrict, setIndexDistrict] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [idIndicatorsActive, setIdIndicatorsActive] = useState<number>(99);

    const handleSortAllowIndicator = (id: any) => {
        setIdIndicatorsActive(id);
        const newList = chartDataRoot?.map((item) => ({
            ...item,
            value: item.indicators.find((i: Indicator) => i.indicator_id === id)?.value
        }))?.sort((a: any, b: any) => a.value - b.value);
        console.table(newList)
        handleSetChartData(newList as any);
        handleSetLoading(true);
    }

    return (
        <div className={mapModifiers('t-mobile_body', theme)}>
            <div className="t-mobile_body_flower">
                <FlowerChartMobile isMobile={sreenWidth < 1024} />
            </div>
            <div className="t-mobile_body_indicator">
                99
            </div>
            <div className="t-mobile_body_filter">
                {idIndicatorsActive !== 99 ?
                    <p>Sắp xếp theo: <strong style={{ marginLeft: 6 }}>{(indicators || [])[idIndicatorsActive - 1]?.label ?? ''}</strong></p>
                    : <p style={{ height: 24 }} >Chọn một chỉ số bạn muốn sắp xếp</p>
                }
                <div className="t-mobile_body_filter_wrapper">
                    {indicators?.map((item, index) => (
                        <div
                            key={index}
                            style={{ backgroundColor: idIndicatorsActive === item.id ? '#fff' : colorsPetal[index] }}
                            onClick={() => {
                                handleSortAllowIndicator(item.id)
                            }}
                        >
                            <img src={[IconAllowIndicators[index]] as any} alt="" />
                        </div>
                    ))}
                </div>
                <button onClick={() => {
                    if (idIndicatorsActive === 99) return;
                    handleSetChartData(chartDataRoot as any);
                    handleSetLoading(true);
                    setIdIndicatorsActive(99);
                }}>Reset</button>
            </div>
            {/* <div className="t-mobile_body_action">
                <button><img src={theme === 'dark' ? icImprovementLight : icImprovementDark} /></button>
                <button><img src={theme === 'dark' ? icInformationDark : icInformationLight} /></button>
            </div> */}
        </div >
    )
}

ContentMobile.defaultProps = {
    children: undefined,
};

export default ContentMobile;
