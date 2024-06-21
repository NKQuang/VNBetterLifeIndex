import React from 'react';
import './styles.css'

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = ({ }) => (
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
                <button onClick={() => {
                    window.location.href = '/login';
                }}>Đăng nhập</button>
                <button onClick={() => {
                    window.location.href = '/register';
                }}>Đăng kí</button>
            </div>
        </div>
    </header>
);

Header.defaultProps = {
    children: undefined,
};

export default Header;
