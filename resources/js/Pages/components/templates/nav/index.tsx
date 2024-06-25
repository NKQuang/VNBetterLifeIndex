import React, { useEffect, useState } from 'react';
import './styles.css'
import Cookies from 'js-cookie';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = ({ }) => {
    const localStoreToken = localStorage.getItem('login_token');
    const localStoreUser = localStorage.getItem('account');

    const [info, setInfo] = useState(JSON?.parse(localStoreUser ?? localStorage.getItem('account') as any) ?? {} as any)

    console.log(info);

    useEffect(() => {
        setInfo(JSON?.parse(localStoreUser ?? localStorage.getItem('account') as any) ?? {} as any)
    }, [localStoreToken])

    return (
        <header className='t-header'>
            <div className="t-header_wrapper">
                <div className="t-header_left">
                    <i className="fa-solid fa-earth-americas"></i>
                    <a href="/" className="site-header__logo js-site-header__logo">
                        <p>Vũng Tàu</p>
                        <p>Better Life</p>
                        <p>Index</p>
                    </a>
                </div>
                <div className="t-header_right">
                    {localStoreToken ?
                        <>
                            <p onClick={() => {
                                window.location.href = '/user/profile';
                            }}>Xin chào, {info.name}</p>
                        </>
                        :
                        <>
                            <button onClick={() => {
                                window.location.href = '/api/user';
                            }}>Đăng nhập</button>
                            <button onClick={() => {
                                window.location.href = '/register';
                            }}>Đăng kí</button>
                        </>
                    }
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    children: undefined,
};

export default Header;
