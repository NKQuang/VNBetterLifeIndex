import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import { mapModifiers } from '../../../utils/functions';
import icLogo from '../../../assets/images/logo.svg';
import icSun from '../../../assets/images/sun.svg';
import icMoon from '../../../assets/images/half-moon.svg';
import icMenuLight from '../../../assets/images/menu-light.svg';
import icMenuDark from '../../../assets/images/menu-dark.svg';
import icClose from '../../../assets/images/delete.svg';
import { useBetterLife } from '../../templates/provider';


interface MobileSreenProps {
}

const HeaderMobile: React.FC<MobileSreenProps> = ({

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
        <>
            <header className='t-mobile_header'>
                <div className='t-mobile_header_logo'>
                    <img className="t-mobile_header_icon" src={icLogo}></img>
                    <p>WBI</p>
                </div>
                <div className='t-mobile_header_action'>
                    {/* <button>
                        <img
                            onClick={() => handleSetTheme(theme === 'dark' ? 'light' : 'dark')}
                            src={theme === 'dark' ? icSun : icMoon}
                        />
                    </button> */}
                    <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
                        <img src={isOpenMenu ? icClose : theme === 'dark' ? icMenuDark : icMenuLight} />
                    </button>
                </div>
            </header>
            <ul
                ref={refMenu}
                className={mapModifiers('t-mobile_menu', isOpenMenu ? 'active' : 'disable')}
            >
                <li>Đăng nhập</li>
                <li>Đăng kí</li>
            </ul>
        </>
    )
}

HeaderMobile.defaultProps = {
    children: undefined,
};

export default HeaderMobile;
