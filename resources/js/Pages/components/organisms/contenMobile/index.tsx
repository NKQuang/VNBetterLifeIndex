import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import { mapModifiers } from '../../../utils/functions';

import { useBetterLife } from '../../templates/provider';
import { exampleDataChart } from '../../../assets/data';
// import icImprovementDark from '../../../assets/images/improvement-dark.svg';
// import icImprovementLight from '../../../assets/images/improvement-light.svg';
// import icInformationDark from '../../../assets/images/information-dark.svg';
// import icInformationLight from '../../../assets/images/information-light.svg';
import FlowerChart from '../../templates/chart';
import FlowerChartMobile from '../../templates/chart-mobile';

interface ContentMobileProps {
}

const ContentMobile: React.FC<ContentMobileProps> = ({

}) => {
    const { theme, handleSetTheme, sreenWidth } = useBetterLife();
    const [indexDistrict, setIndexDistrict] = useState(0);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        console.log(" 🚀- DaiNQ - 🚀: -> ", exampleDataChart[indexDistrict])
    })

    return (
        <div className={mapModifiers('t-mobile_body', theme)}>
            <div className="t-mobile_body_flower">
                <FlowerChartMobile isMobile={sreenWidth < 1024} />
            </div>
            <div>
                filter
            </div>
            {/* <div className="t-mobile_body_action">
                <button><img src={theme === 'dark' ? icImprovementLight : icImprovementDark} /></button>
                <button><img src={theme === 'dark' ? icInformationDark : icInformationLight} /></button>
            </div> */}
        </div>
    )
}

ContentMobile.defaultProps = {
    children: undefined,
};

export default ContentMobile;
