import React, { useEffect, useRef, useState } from 'react';
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
import icImprovementLight from '../../../assets/images/voting.svg';

import FlowerChartMobile, { Indicator } from '../../templates/chart-mobile';
import { colorsPetal } from '../../atoms/flower';
import CModal from '../modal';
import Dropdown, { DropdownType } from '../../atoms/dropdown';
import Slider from '../../atoms/slider';
import { gender, RangeOld, relationship } from '../../../assets/data';
import Loading from '../../atoms/loading';
import { getWBI, postDistrictsIndicators } from '../../../services/apis';
import { toast } from 'react-toastify';

const IconAllowIndicators = [icIncome, icJobs, icHearth, icEducation, icHousing, icSatisfaction, icEnvironment, icSafety, icWorkLifeBalance, icCommunity, icCivicEngagement, icAdministration]

interface ContentMobileProps {
    handleLogin: () => void;
}

const ContentMobile: React.FC<ContentMobileProps> = ({
    handleLogin
}) => {
    const {
        theme,
        isSignIn,
        isShowDetail,
        sreenWidth,
        indicators,
        chartDataRoot,
        handleSetChartData,
        handleSetLoading,
        handleSetIsFilter
    } = useBetterLife();

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
            {isShowDetail ? null :
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
            }

        </div >
    )
}

ContentMobile.defaultProps = {
};

export default ContentMobile;
