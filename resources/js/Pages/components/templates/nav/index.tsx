import React, { useEffect, useState } from 'react';
import './styles.css'
import CModal from '../../organisms/modal';
import { loginWithAccount, postLogout, postRegisterAccount } from '../../../services/apis';
import Loading from '../../atoms/loading';
import { toast } from 'react-toastify';
import { useBetterLife } from '../provider';
import icLogo from '../../../assets/images/logo.svg';
import { mapModifiers } from '../../../utils/functions';
import Dropdown, { DropdownType } from '../../atoms/dropdown';
import { gender, profession, RangeOld, relationship } from '../../../assets/data';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = ({ }) => {
    const {
        handleUpdateSignIn,
        infoDetail,
        userInfo,
        handleSetInfoUser,
    } = useBetterLife();
    const localStoreAccount = localStorage.getItem('account');

    const [info, setInfo] = useState<any>({});
    const [isSignUp, setIsSignUp] = useState(false);

    const [statesLogin, setStatesLogin] = useState({
        username: '',
        password: '',
        isHidePassword: false,
        isOpenFormLogin: false,
        pendding: false,
    });

    const [statesSignUp, setStatesSignUp] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
        isHidePassword: false,
        relationship: undefined as unknown as DropdownType,
        old: undefined as unknown as DropdownType,
        profession: undefined as unknown as DropdownType,
        gender: undefined as unknown as DropdownType,
        address: '',
    });
    const [statesSignUpErr, setStatesSignUpErr] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
        relationship: '',
        old: '',
        profession: '',
        gender: '',
        address: '',
    });

    const [statesSignInErr, setStatesSignInErr] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        setInfo(infoDetail);
    }, [infoDetail])

    useEffect(() => {
        if (localStoreAccount) {
            handleSetInfoUser(JSON.parse(localStoreAccount));
            handleUpdateSignIn(true);
            setInfo(JSON.parse(localStoreAccount));
        }
    }, [localStoreAccount])

    const handleLogin = async (body: any) => {
        const response = await loginWithAccount(body);
        if (response?.authenticated) {
            const { api_token, user } = response;
            localStorage.setItem('login_token', api_token);
            localStorage.setItem('account', JSON.stringify(user));
            setStatesLogin({
                ...statesLogin,
                pendding: false,
                isOpenFormLogin: false,
                username: '',
                password: '',
                isHidePassword: false,
            });
            handleSetInfoUser(user)
            setInfo(user)
            handleUpdateSignIn(true);
            toast.success('Đăng nhập thành công!')
        } else {
            toast.error('Vui lòng kiểm tra lại thông tin đăng nhập');
            setStatesLogin({
                ...statesLogin,
                pendding: false,
            });
        }
    }

    const handleValidateSignUp = () => {
        if (
            !statesSignUp.fullname ||
            !statesSignUp.email ||
            !statesSignUp.phoneNumber ||
            !statesSignUp.password ||
            statesSignUp.password.length < 8 ||
            !statesSignUp.passwordConfirm ||
            statesSignUp.passwordConfirm !== statesSignUp.password ||
            !statesSignUp.gender?.value ||
            !statesSignUp.old?.value ||
            !statesSignUp.profession?.value ||
            !statesSignUp.relationship?.value ||
            !statesSignUp.address?.trim()
        ) {
            setStatesSignUpErr({
                fullname: !statesSignUp.fullname ? 'Họ và tên là bắt buộc' : '',
                email: !statesSignUp.email ? 'Email là bắt buộc' : '',
                phoneNumber: !statesSignUp.phoneNumber ? 'Số điện thoại là bắt buộc' : '',
                password: !statesSignUp.password ? 'Mật khẩu là bắt buộc' : (statesSignUp.password.length < 8 ? 'Mật khẩu tối thiểu 8 kí tự' : ''),
                passwordConfirm: !statesSignUp.passwordConfirm ? 'Xác nhận mật khẩu là bắt buộc' : (statesSignUp.passwordConfirm !== statesSignUp.password ? 'Xác nhận mật khẩu không chính xác' : ''),
                gender: !statesSignUp.gender?.value ? 'Giới tính là trường bắt buộc' : '',
                old: !statesSignUp.old?.value ? 'Độ tuổi là trường bắt buộc' : '',
                profession: !statesSignUp.profession?.value ? 'Nghề nghiệp là trường bắt buộc' : '',
                relationship: !statesSignUp.relationship?.value ? 'Mối quan hệ là trường bắt buộc' : '',
                address: !statesSignUp.address?.trim() ? 'Địa chỉ là trường bắt buộc' : '',
            })
            return false;
        }
        return true
    }

    const handleValidateSignIn = () => {
        if (
            !statesLogin.username ||
            !statesLogin.password
        ) {
            setStatesSignInErr({
                ...statesSignInErr,
                username: !statesLogin.username ? "Tài khoản là trường bắt buộc" : "",
                password: !statesLogin.password ? "Mật khẩu là trường bắt buộc" : ""
            })
            return false;
        }
        return true
    }

    const handleRegister = async (body: any) => {
        const response = await postRegisterAccount(body);
        if (response) {
            setStatesSignUp({
                ...statesSignUp,
                fullname: '',
                email: '',
                phoneNumber: '',
                password: '',
                passwordConfirm: '',
                isHidePassword: false,
                relationship: undefined as unknown as DropdownType,
                old: undefined as unknown as DropdownType,
                profession: undefined as unknown as DropdownType,
                gender: undefined as unknown as DropdownType,
                address: '',
            });
            setStatesLogin({ ...statesLogin, pendding: false, isOpenFormLogin: false })
            toast.success('Đăng kí thành công. Vui lòng kiểm tra mail để xác thực tài khoản!');
        } else {
            toast.error('Vui lòng kiểm tra lại thông tin đăng nhập');
            setStatesLogin({
                ...statesLogin,
                pendding: false,
            });
        }
    }

    const handleSubmit = () => {
        console.log("🚀 ~ handleSubmit ~ !isSignUp && !handleValidateSignIn():", !isSignUp && !handleValidateSignIn())
        console.log("🚀 ~ handleSubmit ~ isSignUp && !handleValidateSignUp():", isSignUp && !handleValidateSignUp())

        if (isSignUp && !handleValidateSignUp()) return;
        if (!isSignUp && !handleValidateSignIn()) return;
        const bodySignIn = {
            email: statesLogin.username,
            password: statesLogin.password,
        }

        const bodySignUp = {
            name: statesSignUp.fullname,
            email: statesSignUp.email,
            phone: statesSignUp.phoneNumber,
            gender: Number(statesSignUp.gender?.value),
            old: statesSignUp.old?.value,
            profession: statesSignUp?.profession?.value,
            relationship: statesSignUp.relationship?.statesSignUp,
            address: statesSignUp.address,
            password: statesSignUp.password,
            password_confirmation: statesSignUp.passwordConfirm,
            terms: true,
        }
        if (isSignUp) {
            handleRegister(bodySignUp);
            setStatesLogin({ ...statesLogin, pendding: true })
        } else {
            handleLogin(bodySignIn);
            setStatesLogin({ ...statesLogin, pendding: true })
        }
    }
    const handleProfileRedirect = () => {
        const token = localStorage.getItem('login_token');
        const xhr = new XMLHttpRequest();

        xhr.open('GET', '/user/profile', true);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    window.location.href = '/user/profile';
                } else {
                    console.error('Failed to redirect');
                }
            }
        };

        xhr.send();
    };

    const handleLogout = async () => {
        await postLogout().then(() => {
            localStorage.clear();
            window.location.reload();
        })
    }

    return (
        <header className='t-header'>
            <div className="t-header_wrapper">
                <div className="t-header_left">
                    <img className="t-mobile_header_icon" src={icLogo}></img>
                    <a href="/" className="site-header__logo js-site-header__logo">
                        <p>phồn vinh - hạnh phúc</p>
                    </a>
                    <div>(WBI)</div>
                </div>
                <div className="t-header_right">
                    {info?.name || userInfo?.name ?
                        <>
                            <p onClick={handleProfileRedirect}>Xin chào, {info?.name ?? userInfo?.name}</p>
                            <button style={{ backgroundColor: '#f00', height: 32, padding: '6px 12px' }} onClick={handleLogout}>Đăng xuất</button>
                        </>
                        :
                        <>
                            <button onClick={() => {
                                setStatesLogin({ ...statesLogin, isOpenFormLogin: true })
                                setIsSignUp(false);
                            }}>Đăng nhập</button>
                            <button onClick={() => {
                                setStatesLogin({ ...statesLogin, isOpenFormLogin: true });
                                setIsSignUp(true);
                            }}>Đăng kí</button>
                        </>
                    }
                </div>
            </div>
            <CModal
                open={statesLogin.isOpenFormLogin}
                onClose={function (): void {
                    setStatesLogin({ ...statesLogin, isOpenFormLogin: false });
                    setStatesSignInErr({
                        username: '',
                        password: ''
                    });
                }}
                title={isSignUp ? 'Đăng kí tài khoản' : 'Đăng nhập ngay'}
                className='form-authen'
            >
                {isSignUp ?
                    <div className='t-header_signup'>
                        <div className={mapModifiers('t-header_signup_item', statesSignUpErr.fullname ? 'error' : '')}>
                            <p>Họ tên <span>*</span></p>
                            <input
                                type='text'
                                autoFocus
                                value={statesSignUp.fullname}
                                placeholder='Nguyễn Văn A...'
                                onChange={(event) => {
                                    setStatesSignUp({ ...statesSignUp, fullname: event.target.value });
                                    setStatesSignUpErr({ ...statesSignUpErr, fullname: '' })
                                }}
                            />
                            <span>{statesSignUpErr.fullname}</span>
                        </div>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                        }}>

                            <div className={mapModifiers('t-header_signup_item', statesSignUpErr.email ? 'error' : '')}>
                                <p>Email<span>*</span></p>
                                <input
                                    type='text'
                                    autoFocus
                                    value={statesSignUp.email}
                                    placeholder='vietnam@gmail.com....'
                                    onChange={(event) => {
                                        setStatesSignUp({ ...statesSignUp, email: event.target.value });
                                        setStatesSignUpErr({ ...statesSignUpErr, email: '' });
                                    }}
                                />
                                <span>{statesSignUpErr.email}</span>
                            </div>
                            <div className={mapModifiers('t-header_signup_item', statesSignUpErr.phoneNumber ? 'error' : '')}>
                                <p>Số điện thoại<span>*</span></p>
                                <input
                                    type='text'
                                    autoFocus
                                    value={statesSignUp.phoneNumber}
                                    placeholder='096020000.....'
                                    onChange={(event) => {
                                        setStatesSignUp({ ...statesSignUp, phoneNumber: event.target.value });
                                        setStatesSignUpErr({ ...statesSignUpErr, phoneNumber: '' });
                                    }}
                                />
                                <span>{statesSignUpErr.phoneNumber}</span>
                            </div>
                        </div>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                        }}>
                            <Dropdown
                                isRequired
                                options={gender}
                                title='Giới tính'
                                placeholder='Chọn giới tính ...'
                                value={statesSignUp.gender}
                                handleOnChange={(value) => {
                                    setStatesSignUp({ ...statesSignUp, gender: value });
                                    setStatesSignUpErr({ ...statesSignUpErr, gender: '' });
                                }}
                                error={statesSignUpErr.gender}
                            />
                            <Dropdown
                                isRequired
                                options={RangeOld}
                                title='Độ tuổi'
                                placeholder='Chọn độ tuổi của bạn'
                                value={statesSignUp.old}
                                handleOnChange={(value) => {
                                    setStatesSignUp({ ...statesSignUp, old: value });
                                    setStatesSignUpErr({ ...statesSignUpErr, old: '' });
                                }}
                                error={statesSignUpErr.old}
                            />
                        </div>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                        }}>
                            <Dropdown
                                isRequired
                                options={profession}
                                title='Nghề nghiệp'
                                placeholder='Chọn nghề nghiệp của bạn'
                                handleOnChange={(value) => {
                                    setStatesSignUp({ ...statesSignUp, profession: value });
                                    setStatesSignUpErr({ ...statesSignUpErr, profession: '' });
                                }}
                                error={statesSignUpErr.profession}
                            />
                            <Dropdown
                                isRequired
                                options={relationship}
                                title='Tình trạng hôn nhân'
                                placeholder='Chọn mối quan hệ hiện tại'
                                handleOnChange={(value) => {
                                    setStatesSignUp({ ...statesSignUp, relationship: value });
                                    setStatesSignUpErr({ ...statesSignUpErr, relationship: '' });
                                }}
                                error={statesSignUpErr.relationship}
                            />
                        </div>
                        <div className={mapModifiers('t-header_signup_item', statesSignUpErr.address ? 'error' : '')}>
                            <p>Địa chỉ<span>*</span></p>
                            <input
                                type='text'
                                autoFocus
                                value={statesSignUp.address}
                                placeholder='123 Võ Nguyên Giáp, Tp.Hồ Chí Minh'
                                onChange={(event) => {
                                    setStatesSignUp({ ...statesSignUp, address: event.target.value });
                                    setStatesSignUpErr({ ...statesSignUpErr, address: '' });
                                }}
                            />
                            <span>{statesSignUpErr.address}</span>
                        </div>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                        }}>

                            <div className={mapModifiers('t-header_signup_item', statesSignUpErr.password ? 'error' : '')}>
                                <p>Mật khẩu<span>*</span></p>
                                <input
                                    type={!statesSignUp.isHidePassword ? 'password' : 'text'}
                                    value={statesSignUp.password}
                                    placeholder='Vui lòng nhập mật khẩu...'
                                    onChange={(event) => {
                                        setStatesSignUp({ ...statesSignUp, password: event.target.value });
                                        setStatesSignUpErr({ ...statesSignUpErr, password: '' });
                                    }}
                                    onKeyPress={(event) => {
                                        console.log(event)
                                        if (event.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <span>{statesSignUpErr.password}</span>
                            </div>
                            <div className={mapModifiers('t-header_signup_item', statesSignUpErr.passwordConfirm ? 'error' : '')}>
                                <p>Xác nhận mật khẩu<span>*</span></p>
                                <input
                                    type={!statesSignUp.isHidePassword ? 'password' : 'text'}
                                    value={statesSignUp.passwordConfirm}
                                    placeholder='Vui lòng nhập mật khẩu...'
                                    onChange={(event) => {
                                        setStatesSignUp({ ...statesSignUp, passwordConfirm: event.target.value });
                                        setStatesSignUpErr({ ...statesSignUpErr, passwordConfirm: '' });
                                    }}
                                    onKeyPress={(event) => {
                                        console.log(event)
                                        if (event.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <span>{statesSignUpErr.passwordConfirm}</span>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <div className='t-header_form'>
                            <div className={mapModifiers('t-header_form_item', statesSignInErr.username ? 'error' : '')}>
                                <p>Email</p>
                                <input
                                    type='text'
                                    autoFocus
                                    value={statesLogin.username}
                                    placeholder='Vui lòng nhập email...'
                                    onChange={(event) => {
                                        setStatesLogin({ ...statesLogin, username: event.target.value });
                                        setStatesSignInErr({
                                            ...statesSignInErr,
                                            username: ''
                                        })
                                    }}
                                />
                                <span>{statesSignInErr.username}</span>
                            </div>
                            <div className={mapModifiers('t-header_form_item', statesSignInErr.password ? 'error' : '')}>
                                <p>Mật khẩu</p>
                                <input
                                    type={!statesLogin.isHidePassword ? 'password' : 'text'}
                                    value={statesLogin.password}
                                    placeholder='Vui lòng nhập mật khẩu...'
                                    onChange={(event) => {
                                        setStatesLogin({ ...statesLogin, password: event.target.value });
                                        setStatesSignInErr({
                                            ...statesSignInErr,
                                            password: ''
                                        })
                                    }}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <span>{statesSignInErr.password}</span>
                            </div>
                        </div>
                    </>
                }
                <div className='t-header_form_toogle'>
                    <input type="checkbox" value={statesLogin.isHidePassword as any} onChange={(event) => {
                        if (isSignUp) {
                            setStatesSignUp({ ...statesSignUp, isHidePassword: event.target.checked })
                            if (statesLogin.isHidePassword) {
                                setStatesLogin({ ...statesLogin, isHidePassword: false })
                            }
                        } else {
                            setStatesLogin({ ...statesLogin, isHidePassword: event.target.checked });
                            if (statesSignUp.isHidePassword) {
                                setStatesSignUp({ ...statesSignUp, isHidePassword: false })
                            }
                        }
                    }} />
                    <p >Hiện mật khẩu</p>
                </div>
                <div className='t-header_form_action' onClick={() => {
                    setIsSignUp(!isSignUp)
                }}>
                    <a >{isSignUp ? 'Bạn đã có tài khoản ?' : 'Tạo mới tài khoản'}</a>
                </div>
                <div className='t-header_form_button'>
                    <button onClick={function (): void {
                        setStatesLogin({ ...statesLogin, isOpenFormLogin: false });
                        setStatesSignInErr({
                            username: '',
                            password: ''
                        })
                        setStatesSignUp({
                            ...statesSignUp,
                            fullname: '',
                            email: '',
                            phoneNumber: '',
                            password: '',
                            passwordConfirm: '',
                            isHidePassword: false,
                            relationship: undefined as unknown as DropdownType,
                            old: undefined as unknown as DropdownType,
                            profession: undefined as unknown as DropdownType,
                            gender: undefined as unknown as DropdownType,
                            address: '',
                        });
                        setStatesSignUpErr({
                            fullname: '',
                            email: '',
                            phoneNumber: '',
                            password: '',
                            passwordConfirm: '',
                            relationship: '',
                            old: '',
                            profession: '',
                            gender: '',
                            address: '',
                        })
                    }}>Hủy</button>
                    <button onClick={handleSubmit}>
                        {statesLogin.pendding ?
                            <Loading />
                            :
                            isSignUp ?
                                'Đăng kí'
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
