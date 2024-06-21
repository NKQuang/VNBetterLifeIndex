import React from 'react';
import './styles.css'

interface HeaderProps {
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children = undefined }) => (
    <header className='t-header'>
        <div className="t-header_wrapper">
            <div className="t-header_left">
                <img src="" alt="logo" />
                <a href="/" className="site-header__logo js-site-header__logo">Vũng Tàu <br /> Better Life <br />Index</a>
            </div>
            <div className="t-header_right">
                {children}
            </div>
        </div>
    </header>
);

export default Header;
