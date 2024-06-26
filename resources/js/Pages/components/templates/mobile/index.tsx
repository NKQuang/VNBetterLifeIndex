import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import { mapModifiers } from '../../../utils/functions';
import { useBetterLife } from '../provider';
import HeaderMobile from '../../organisms/headerMobile';
import ContentMobile from '../../organisms/contenMobile';


interface MobileSreenProps {
}

const MobileSreen: React.FC<MobileSreenProps> = ({

}) => {
    const { theme, handleSetTheme, sreenWidth } = useBetterLife();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const refMenu = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (refMenu?.current) {
            if (isOpenMenu) {
                refMenu.current.style.top = `${70}px` as any;
            } else {
                refMenu.current.style.top = `-${70}px` as any;
            }
        }
    }, [isOpenMenu])


    useEffect(() => {
        const domMenu = document.querySelector('.t-mobile .t-mobile_header');
        window.addEventListener("resize", () => {
            domMenu?.setAttribute('width', `${window.innerWidth}px`)
        });
    }, [sreenWidth])

    return (
        <div className={mapModifiers('t-mobile', theme)} style={{
            width: sreenWidth,
            height: window.innerHeight
        }}>
            <HeaderMobile />
            <ContentMobile />
        </div>
    )
}

MobileSreen.defaultProps = {
    children: undefined,
};

export default MobileSreen;
