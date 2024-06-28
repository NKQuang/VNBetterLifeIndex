import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import { mapModifiers } from '../../../utils/functions';
import icLogo from '../../../assets/images/logo.svg';
import icSun from '../../../assets/images/sun.svg';
import icMoon from '../../../assets/images/half-moon.svg';
import icMenuLight from '../../../assets/images/menu-light.svg';
import icMenuDark from '../../../assets/images/menu-dark.svg';
import icClose from '../../../assets/images/delete.svg';
import icImprovementLight from '../../../assets/images/voting.svg';

import { useBetterLife } from '../../templates/provider';


interface MobileSreenProps {
    onClickLogin: () => void;
    onClickRegister: () => void;
    onClickVote: () => void;
}

const HeaderMobile: React.FC<MobileSreenProps> = ({
    onClickLogin, onClickRegister, onClickVote
}) => {
    const { theme, sreenWidth, handleSetTheme, userInfo } = useBetterLife();
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
                <div className='t-mobile_header_logo' onClick={() => {
                    window.location.reload();
                }}>
                    <img className="t-mobile_header_icon" src={icLogo}></img>
                    <p>WBI</p>
                </div>
                <div className='t-mobile_header_action'>
                    <button onClick={onClickVote}>
                        <img src={icImprovementLight} />
                        <span>Chia sẻ ngay</span>
                    </button>
                    <button style={{ minWidth: userInfo?.name ? 80 : 'unset' }} onClick={() => setIsOpenMenu(!isOpenMenu)}>
                        {userInfo?.name ?
                            <span style={{
                                fontWeight: 700,
                                color: '#003565fc',
                                textTransform: 'capitalize',
                                marginLeft: 10,
                                minWidth: 80,
                            }}>
                                {userInfo?.name}
                            </span>
                            :
                            <img src={isOpenMenu ? icClose : theme === 'dark' ? icMenuDark : icMenuLight} />
                        }
                    </button>
                </div>
            </header>
            <ul
                ref={refMenu}
                className={mapModifiers('t-mobile_menu', isOpenMenu ? 'active' : 'disable')}
            >
                {userInfo?.name ?
                    <button onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}>Đăng xuất</button>
                    :
                    <>
                        <button onClick={() => {
                            onClickLogin();
                            setIsOpenMenu(false)
                        }}>Đăng nhập</button>
                        <button onClick={() => {
                            onClickRegister();
                            setIsOpenMenu(false)
                        }}>Đăng kí</button>
                    </>
                }
            </ul>
        </>
    )
}

HeaderMobile.defaultProps = {
};

export default HeaderMobile;
