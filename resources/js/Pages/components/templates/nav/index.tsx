import React, { useEffect, useState } from 'react';
import './styles.css'
import CModal from '../../organisms/modal';
import { checkLogin, getDistrictsIndicators, loginWithAccount } from '../../../services/apis';
import Loading from '../../atoms/loading';
import { toast } from 'react-toastify';
import { useBetterLife } from '../provider';
import icLogo from '../../../assets/images/logo.svg';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = ({ }) => {
    const {
        handleUpdateSignIn,
        handleUpdateDistrictIndicators,
    } = useBetterLife();


    const [info, setInfo] = useState<any>({});

    const [states, setStates] = useState({
        username: '',
        password: '',
        isHidePassword: false,
        isOpenFormLogin: false,
        pendding: false,
    })

    const getIndicators = async () => {
        const districts: any = await getDistrictsIndicators();
        handleUpdateDistrictIndicators(districts ?? {} as any);
    }

    const handleLogin = async (body: any) => {
        const response = await loginWithAccount(body);
        if (response?.authenticated) {
            const { api_token, user } = response;
            localStorage.setItem('login_token', api_token);
            localStorage.setItem('account', JSON.stringify(user));
            console.log(JSON.stringify(user));
            setStates({
                ...states,
                pendding: false,
                isOpenFormLogin: false,
                username: '',
                password: '',
                isHidePassword: false,
            });
            setInfo(user)
            handleUpdateSignIn(true);
            toast.success('Đăng nhập thành công!')
            setTimeout(() => {
                getIndicators();
            }, 2000)
        } else {
            toast.error('Vui lòng kiểm tra lại thông tin đăng nhập');
            setStates({
                ...states,
                pendding: false,
            });
        }
    }

    const handleSubmit = () => {
        const body = {
            email: states.username,
            password: states.password,
        }
        handleLogin(body);
        setStates({ ...states, pendding: true })
    }

    return (
        <header className='t-header'>
            <div className="t-header_wrapper">
                <div className="t-header_left">
                    <img className="t-mobile_header_icon" src={icLogo}></img>
                    <a href="/" className="site-header__logo js-site-header__logo">
                        <p>Chỉ số </p>
                        <p>phồn vinh</p>
                        <p>hạnh phúc</p>
                    </a>
                    <div>(WBI)</div>
                </div>
                <div className="t-header_right">
                    {info?.name ?
                        <>
                            <p onClick={() => {
                                window.location.href = '/user/profile';
                            }}>Xin chào, {info?.name}</p>
                        </>
                        :
                        <>
                            <button onClick={() => {
                                setStates({ ...states, isOpenFormLogin: true })
                            }}>Đăng nhập</button>
                            <button onClick={() => {
                                window.location.href = '/register';
                            }}>Đăng kí</button>
                        </>
                    }
                </div>
            </div>
            <CModal
                open={states.isOpenFormLogin}
                onClose={function (): void {
                    setStates({ ...states, isOpenFormLogin: false })
                }}
                title={'Đăng nhập ngay'}
                className='form'
            >
                <div className='t-header_form'>
                    <div className='t-header_form_item'>
                        <p>Email</p>
                        <input
                            type='text'
                            autoFocus
                            value={states.username}
                            placeholder='Vui lòng nhập email...'
                            onChange={(event) => setStates({ ...states, username: event.target.value })}
                        />
                    </div>
                    <div className='t-header_form_item'>
                        <p>Mật khẩu</p>
                        <input
                            type={!states.isHidePassword ? 'password' : 'text'}
                            value={states.password}
                            placeholder='Vui lòng nhập mật khẩu...'
                            onChange={(event) => setStates({ ...states, password: event.target.value })}
                            onKeyPress={(event) => {
                                console.log(event)
                                if (event.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                        />
                    </div>
                    <div className='t-header_form_item'>
                        <input type="checkbox" value={states.isHidePassword as any} onChange={(event) => {
                            setStates({ ...states, isHidePassword: event.target.checked })
                        }} />
                        <p onClick={() => setStates({ ...states, isHidePassword: !states.isHidePassword })}>Hiện mật khẩu</p>
                    </div>
                </div>
                <div className='t-header_form_action'>
                    <a href='/register'>Tạo mới tài khoản</a>
                </div>
                <div className='t-header_form_button'>
                    <button onClick={function (): void {
                        setStates({ ...states, isOpenFormLogin: false })
                    }}>Hủy</button>
                    <button onClick={handleSubmit}>
                        {states.pendding ?
                            <Loading />
                            :
                            'Đăng nhập'
                        }
                    </button>
                </div>
            </CModal>
        </header>
    )
}

Header.defaultProps = {
    children: undefined,
};

export default Header;
