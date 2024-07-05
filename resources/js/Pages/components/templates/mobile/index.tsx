import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import { mapModifiers } from '../../../utils/functions';
import { useBetterLife } from '../provider';
import HeaderMobile from '../../organisms/headerMobile';
import ContentMobile from '../../organisms/contenMobile';
import CModal from '../../organisms/modal';
import { toast } from 'react-toastify';
import { getWBI, loginWithAccount, postDistrictsIndicators, postRegisterAccount } from '../../../services/apis';
import CDrawer from '../../molecules/drawer';
import Loading from '../../atoms/loading';
import Dropdown, { DropdownType } from '../../atoms/dropdown';
import Slider from '../../atoms/slider';
import { gender, profession, RangeOld, relationship } from '../../../assets/data';
import Footer from '../footer';
import CTooltip from '../../atoms/tooltip';
import CSkeleton from '../../atoms/skeleton';
import icImprovementLight from '../../../assets/images/voting.svg';
import RichTextEditor from '../../molecules/richTextEditor';

interface MobileSreenProps {
}

const MobileSreen: React.FC<MobileSreenProps> = ({

}) => {
    const { theme, handleUpdateSignIn, sreenWidth,
        handleSetChartData,
        handleSetLoading,
        handleSetIsFilter,
        userInfo,
        isSignIn,
        loading,
        districtActive,
        districts, indicators, questions, handleSetInfoUser, isShowDetail, allIndicators, chartData,
        handleSetInfoDetail,
        handleShowDetail,
        handleSetDistrictActive,
        districtIndicators
    } = useBetterLife();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const refMenu = useRef<HTMLUListElement>(null)
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

    const [isOpenModal, setIsOpenModal] = useState(false);

    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
    const [isOpenModalConfirmAfterSubmit, setIsOpenModalConfirmAfterSubmit] = useState(false);

    const [stateForm, setStateForm] = useState({
        district: undefined as unknown as DropdownType,
        indicator: undefined as unknown as DropdownType,
        questions: undefined as any,
        answers: [],
        loading: false,
        confirm: false,
        isValidated: false,
        fullName: "",
        relationship: undefined as unknown as DropdownType,
        phoneNumber: "",
        old: undefined as unknown as DropdownType,
        profession: undefined as unknown as DropdownType,
        gender: undefined as unknown as DropdownType,
    });

    const [statesSignInErr, setStatesSignInErr] = useState({
        username: '',
        password: '',
    });

    const [stateFormError, setStateFormError] = useState({
        district: "",
        indicator: "",
        fullName: "",
        relationship: "",
        phoneNumber: "",
        old: "",
        profession: "",
        gender: "",
    });

    const [isRating, setIsRating] = useState(false);
    const [step, setStep] = useState<number>(1);


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
            handleUpdateSignIn(true);
            toast.success('Đăng nhập thành công!')
        } else {
            toast.error('Tài khoản hoặc mật khẩu không chính xác.');
            setStatesLogin({
                ...statesLogin,
                pendding: false,
            });
            setStatesSignInErr({
                ...statesSignInErr,
                username: "Thông tin đắng nhập không chính xác",
                password: "Thông tin đắng nhập không chính xác"
            })

        }
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

    const handleRegister = async (body: any) => {
        const response = await postRegisterAccount(body);
        if (response.status === 200) {
            setStatesSignUp({
                ...statesSignUp,
                fullname: '',
                email: '',
                phoneNumber: '',
                password: '',
                passwordConfirm: '',
                isHidePassword: false,
            });
            setStatesLogin({ ...statesLogin, pendding: false, isOpenFormLogin: false })
            toast.success('Đăng kí thành công. Vui lòng kiểm tra mail để xác thực tài khoản!');
        } else {
            const { errors } = response
            toast.error('Đã có lỗi xảy ra trong quá trình đăng kí');
            setStatesLogin({
                ...statesLogin,
                pendding: false,
            });
            setStatesSignUpErr({
                ...statesSignUpErr,
                email: (errors.email || [])[0] ? (errors.email || [])[0] : '',
                phoneNumber: (errors.phone || [])[0] ? (errors.phone || [])[0] : '',
            })

        }
    }

    const handleSubmitLogin = () => {
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


    const getWbi = async () => {
        const data = await getWBI();
        handleSetChartData(data);
        handleSetLoading(true);
        handleSetIsFilter(false);
    }

    const submitIndicators = async (body: any) => {
        await postDistrictsIndicators(body)
            .then(() => {
                setStateForm({
                    ...stateForm,
                    loading: false,
                    confirm: false,
                    isValidated: false,
                });
                toast.success('Gửi đánh giá thành công!');
                getWbi();
                setIsOpenModalConfirmAfterSubmit(true);
            }).catch((error) => {
                console.log('error', error)

            })
    }

    const handleValidateStep1 = () => {
        if (
            !isSignIn && !stateForm.profession?.value ||
            !isSignIn && !stateForm.relationship?.value ||
            !isSignIn && !stateForm.fullName ||
            !isSignIn && !stateForm.phoneNumber ||
            !isSignIn && stateForm.phoneNumber.length < 9 ||
            !isSignIn && !stateForm.old?.value ||
            !isSignIn && !stateForm.gender?.value
        ) {
            setStateFormError({
                ...stateFormError,
                fullName: !stateForm.fullName ? "Họ tên là trường bắt buộc" : "",
                relationship: !stateForm.relationship?.value ? "Mối quan hệ là trường bắt buộc" : "",
                phoneNumber: !stateForm.phoneNumber ? "Số điện thoại là trường bắt buộc" : !isSignIn && stateForm.phoneNumber.length < 9 ? "Số điện thoại không đúng định dạng" : "",
                old: !stateForm.old?.value ? "Độ tuổi là trường bắt buộc" : "",
                profession: !stateForm.profession?.value ? "Nghề nghiệp là trường bắt buộc" : "",
                gender: !stateForm.gender?.value ? "Giới tính là trường bắt buộc" : "",
            })
            return false;
        }

        setStep(2);
        return true;
    }

    const handleValidateStep2 = (isContinue?: boolean) => {
        if (
            !isSignIn && !stateForm.district?.value ||
            !isSignIn && !stateForm.indicator?.value
        ) {
            setStateFormError({
                ...stateFormError,
                district: !stateForm.district?.value ? "Huyện là trường bắt buộc" : "",
                indicator: !stateForm.indicator?.value ? "Chọn một chỉ số để tiếp tục" : "",
            })
            return false;
        }
        if (!isContinue && stateForm.answers.some((i) => i === 0)) {
            setStateForm({
                ...stateForm,
                confirm: true,
            })
            return false
        }
        return true;
    }

    const handleSubmit = (isContinue?: boolean) => {
        if (!handleValidateStep2(isContinue)) return;
        const body = {
            districts_id: stateForm.district.id,
            questions_id: stateForm.questions.map((i) => i.id),
            question_code: stateForm.questions.map((i) => i.value),
            value: stateForm.answers,
            indicator_id: stateForm.questions[0].group_id,
            full_name: stateForm.fullName ?? userInfo?.name,
            relationship: stateForm.relationship?.label,
            phone_number: stateForm.phoneNumber ?? userInfo?.phone,
            old: stateForm.old?.value,
            profession: stateForm.profession.value,
            user_id: userInfo?.id ?? null,
            gender: stateForm.gender?.value
        };
        setStateForm({
            ...stateForm,
            loading: true,
        });
        submitIndicators(body);
    }

    return (
        <div className={mapModifiers('t-mobile', theme)} style={{
            width: sreenWidth,
            height: window.innerHeight
        }}>
            <HeaderMobile
                onClickLogin={() => {
                    setStatesLogin({ ...statesLogin, isOpenFormLogin: true });
                    setIsSignUp(false);
                }}
                onClickRegister={() => {
                    setStatesLogin({ ...statesLogin, isOpenFormLogin: true });
                    setIsSignUp(true)
                }}
                onClickVote={() => {
                    if (isSignIn) {
                        setIsOpenModal(true)
                    } else {
                        setIsOpenModalConfirm(true)
                    }
                }}
            />
            <div style={{ display: 'block', height: 72 }} />
            <button className='t-mobile_button_rating' onClick={() => {
                if (isSignIn) {
                    setIsOpenModal(true)
                } else {
                    setIsOpenModalConfirm(true)
                }
            }}>
                <img src={icImprovementLight} />
                <span>Chia sẻ ngay</span>
            </button>
            <ContentMobile handleLogin={() => {
                setStatesLogin({ ...statesLogin, isOpenFormLogin: true });
                setIsSignUp(false);
            }} />
            <div style={{ marginTop: 12, padding: '4px 8px' }}>
                {
                    loading ?
                        <div style={{ height: 'fit-content', width: '95vw' }}>
                            <CSkeleton style={{ marginBottom: 8 }} height={48} />
                            <CSkeleton count={3} height={20} />
                        </div>
                        :
                        isShowDetail ? <div className='p-home_content p-home_desc'>
                            <div className='p-home_content_wrapper'>
                                <h2 style={{ marginBottom: 8 }}>{districtActive?.full_name}</h2>
                                <RichTextEditor
                                    data={districtActive?.content}
                                    typeText="notHeadernotBordernotBG"
                                    isDisabled
                                />
                            </div>
                        </div>
                            : <div className='p-home_content p-home_desc' >
                                <div className='p-home_content_wrapper' >
                                    <h2 style={{ color: '#000', fontSize: 20, marginBottom: 8, fontWeight: 700 }}>Cuộc sống thế nào?</h2>
                                    <p style={{ color: '#000' }}>Cuộc sống còn nhiều điều thú vị hơn những con số GDP và thống kê kinh tế lạnh lùng – Chỉ số này cho phép bạn so sánh mức độ hạnh phúc giữa các huyện, dựa trên 12 chủ đề mà chúng tôi đã xác định là thiết yếu, trong các lĩnh vực điều kiện sống vật chất và chất lượng cuộc sống.</p>
                                </div>
                            </div>
                }
            </div>
            <div className={mapModifiers('t-mobile_body_indicator')}>
                {
                    isShowDetail ?
                        loading ?
                            <div style={{ height: 'fit-content', width: '90vw' }}>
                                <CSkeleton count={1} height={30} />
                                <CSkeleton count={1} height={10} width={30} />
                                <CSkeleton count={1} height={120} />
                            </div>
                            :
                            indicators?.map((item, index) => {
                                const aIndicator = allIndicators?.filter((indicator, yndex) => indicator.indicator === item.label).sort((a, b) => a.value - b.value)
                                return (
                                    <div className='t-mobile_body_indicator_item' key={index}>
                                        <div className='t-mobile_body_indicator_item_title'>
                                            <h2>{item.label}</h2>
                                            <p>{aIndicator?.find((i) => i.district_id === districtActive?.id)?.value?.toFixed(2)}</p>
                                        </div>
                                        <div className='t-mobile_body_indicator_item_wrapper'>
                                            {aIndicator?.map((i, idx) => <CTooltip key={idx} content={`${i.district}: ${i.value.toFixed(2)}`}>
                                                <div
                                                    className={mapModifiers('t-mobile_body_indicator_item_wrapper_colum', districtActive?.id === i.district_id ? 'active' : 'normal')}
                                                    style={{
                                                        height: i.value > 0 ? i.value * 12 : 2,
                                                        width: '20px',
                                                    }}
                                                    onTouchStart={() => {
                                                        const districtItem = chartData?.find((y) => y.district_id === i.district_id);
                                                        handleSetLoading(true);
                                                        handleSetInfoDetail(districtItem as any);
                                                        handleShowDetail(true);
                                                        const districtActive = districtIndicators?.districts.filter((y) => y.id === i.district_id);
                                                        handleSetDistrictActive((districtActive || [])[0]);
                                                    }}
                                                />
                                            </CTooltip>)}
                                        </div>
                                    </div>
                                )
                            })
                        : null
                }
            </div>
            <Footer />
            {/* Sign in / sign up */}
            <CModal
                open={statesLogin.isOpenFormLogin}
                onClose={function (): void {
                    setStatesLogin({ ...statesLogin, isOpenFormLogin: false })
                }}
                title={isSignUp ? 'Đăng kí tài khoản' : 'Đăng nhập ngay'}
                className='form_mobile'
                zIndex='top'
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

                        <Dropdown
                            isRequired
                            options={profession}
                            title='Nghề nghiệp'
                            value={statesSignUp.profession}
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
                            value={statesSignUp.relationship}
                            handleOnChange={(value) => {
                                setStatesSignUp({ ...statesSignUp, relationship: value });
                                setStatesSignUpErr({ ...statesSignUpErr, relationship: '' });
                            }}
                            error={statesSignUpErr.relationship}
                        />
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
                                        handleSubmitLogin();
                                    }
                                }}
                            />
                            <span>{statesSignUpErr.passwordConfirm}</span>
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
                                    onChange={(event) => setStatesLogin({ ...statesLogin, username: event.target.value })}
                                />
                                <span>{statesSignInErr.username}</span>
                            </div>
                            <div className={mapModifiers('t-header_form_item', statesSignInErr.password ? 'error' : '')}>
                                <p>Mật khẩu</p>
                                <input
                                    type={!statesLogin.isHidePassword ? 'password' : 'text'}
                                    value={statesLogin.password}
                                    placeholder='Vui lòng nhập mật khẩu...'
                                    onChange={(event) => setStatesLogin({ ...statesLogin, password: event.target.value })}
                                    onKeyPress={(event) => {
                                        console.log(event)
                                        if (event.key === "Enter") {
                                            handleSubmitLogin();
                                        }
                                    }}
                                />
                                <span>{statesSignInErr.username}</span>
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
                        setStatesLogin({ ...statesLogin, isOpenFormLogin: false })
                    }}>Hủy</button>
                    <button onClick={handleSubmitLogin}>
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
            <CModal
                open={isOpenModalConfirm}
                title='Xác nhận'
                onClose={() => setIsOpenModalConfirm(false)}
                className='form-rating'
                zIndex='top'
            >
                <div className="t-chart_choose" style={{ marginTop: 20, fontSize: 16, textAlign: 'center' }}>
                    Khi bạn chia sẻ mà không đăng nhập, bạn không thể xem lại các thông tin đã đánh giá và cập nhật các chỉ số đánh giá của bạn. Đăng nhập để được nhiều quyền lợi hơn.
                </div>
                <div className='t-chart_form_submit' style={{ marginTop: 20 }}>
                    <button onClick={() => {
                        setStatesLogin({ ...statesLogin, isOpenFormLogin: true });
                        setIsSignUp(false);
                    }}>
                        Đăng nhập
                    </button>
                    <button onClick={() => {
                        setIsOpenModal(true)
                        setIsOpenModalConfirm(false);
                    }} >
                        Chia sẻ ngay
                    </button>
                </div>
            </CModal>
            {/* Form Đánh giá */}
            <CModal
                open={isOpenModal}
                title='Bảng đánh giá'
                onClose={() => {
                    setIsOpenModal(false);
                    setIsRating(false);
                    setStep(1);
                    setStateForm({
                        district: undefined as unknown as DropdownType,
                        indicator: undefined as unknown as DropdownType,
                        questions: undefined as any,
                        answers: [],
                        loading: false,
                        confirm: false,
                        isValidated: false,
                        fullName: "",
                        relationship: undefined as unknown as DropdownType,
                        phoneNumber: "",
                        old: undefined as unknown as DropdownType,
                        profession: undefined as unknown as DropdownType,
                        gender: undefined as unknown as DropdownType,
                    });
                    setStateFormError({
                        district: "",
                        indicator: "",
                        fullName: "",
                        relationship: "",
                        phoneNumber: "",
                        old: "",
                        profession: "",
                        gender: "",
                    });
                }}
                className='form_mobile'
                zIndex='top'
            >
                <p style={{ lineHeight: 1.5, fontStyle: 'italic', marginBottom: 4, paddingBottom: 4, borderBottom: '1px solid #dbdbdb' }}>Cảm ơn bạn đã chia sẻ đánh giá của bạn về Hạnh phúc với chúng tôi. <br />
                    Cuộc khảo sát này sẽ không làm bạn mất quá 2 phút.<br />
                    Thông tin và đánh giá của bạn sẽ được ẩn danh.</p>
                <div style={{
                    height: '100%',
                    paddingBottom: 30
                }}>
                    {isSignIn ?
                        <div className={mapModifiers('t-chart_form t-chart_form_signin')}>
                            <Dropdown
                                isRequired
                                value={stateForm.district}
                                options={districts as any}
                                title='Huyện'
                                placeholder='Vui lòng chọn huyện bạn muốn đánh giá'
                                handleOnChange={(value) => {
                                    setStateForm({
                                        ...stateForm,
                                        district: value,
                                    })
                                }}
                            />
                            <Dropdown
                                isRequired
                                value={stateForm.indicator}
                                options={indicators as any}
                                title='Chỉ số'
                                placeholder='Vui lòng chọn chỉ số bạn muốn đánh giá'
                                handleOnChange={(value) => {
                                    const listQuestion = questions?.filter((i: any) => i.group_name === value.label);
                                    setStateForm({
                                        ...stateForm,
                                        indicator: value,
                                        questions: listQuestion,
                                        answers: listQuestion?.map((i, idx) => 0) as any,
                                    });
                                }}
                            />

                            {stateForm.indicator && stateForm.district?.id &&
                                <>
                                    <h2>Bộ câu hỏi</h2>
                                    <ul className='t-chart_form_list'>
                                        {stateForm?.questions?.map((record, index) => (
                                            <li key={record.value}>
                                                <p>{record.label}</p>
                                                <Slider step={1} max={10} defaultValue={0} value={stateForm.answers[index]} onChange={(value) => {
                                                    const newSliderValues = [...stateForm.answers] as any;
                                                    newSliderValues[index] = Number(value);
                                                    setStateForm({
                                                        ...stateForm,
                                                        answers: newSliderValues
                                                    });
                                                }} />
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            }
                        </div>
                        :
                        <div className={'t-wrapper_form_rating'}>
                            {step === 1 &&
                                <>
                                    <h1>Bước 1: Nhập thông tin người đánh giá</h1>
                                    <div className='t-chart_info_customer'>
                                        <div className={mapModifiers('t-chart_info_item', stateFormError.fullName ? 'error' : '')}>
                                            <p>Họ tên <span>*</span></p>
                                            <input
                                                type='text'
                                                autoFocus
                                                placeholder='Nguyễn Văn A....'
                                                value={stateForm.fullName}
                                                onChange={(event) => {
                                                    setStateForm({
                                                        ...stateForm,
                                                        fullName: event.target.value,
                                                    });
                                                    setStateFormError({
                                                        ...stateFormError,
                                                        fullName: ''
                                                    })
                                                }}
                                            />
                                            <span>{stateFormError.fullName}</span>
                                        </div>
                                        <div className={mapModifiers('t-chart_info_item', stateFormError.phoneNumber ? 'error' : '')}>
                                            <p>Số điện thoại<span>*</span></p>
                                            <input
                                                type='text'
                                                autoFocus
                                                placeholder='0973xxxx....'
                                                pattern="\d*"
                                                value={stateForm.phoneNumber}
                                                onChange={(event) => {
                                                    const phone = event.target.value.replace(/\D/g, '');
                                                    setStateForm({
                                                        ...stateForm,
                                                        phoneNumber: phone,
                                                    });
                                                    setStateFormError({
                                                        ...stateFormError,
                                                        phoneNumber: ''
                                                    })
                                                }}
                                            />
                                            <span>{stateFormError.phoneNumber}</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            gap: 12
                                        }}>
                                            <Dropdown
                                                isRequired
                                                options={gender}
                                                title='Giới tính'
                                                placeholder='Chọn giới tính ...'
                                                value={stateForm.gender}
                                                handleOnChange={(value) => {
                                                    setStateForm({
                                                        ...stateForm,
                                                        gender: value,
                                                    });
                                                    setStateFormError({
                                                        ...stateFormError,
                                                        gender: ''
                                                    });
                                                }}
                                                error={stateFormError.gender}
                                            />
                                            <Dropdown
                                                isRequired
                                                options={RangeOld}
                                                title='Độ tuổi'
                                                placeholder='15-25 Tuổi'
                                                value={stateForm.old}
                                                handleOnChange={(value) => {
                                                    setStateForm({
                                                        ...stateForm,
                                                        old: value,
                                                    });
                                                    setStateFormError({
                                                        ...stateFormError,
                                                        old: ''
                                                    });
                                                }}
                                                error={stateFormError.old}
                                            />
                                        </div>
                                        <Dropdown
                                            isRequired
                                            options={profession}
                                            title='Nghề nghiệp'
                                            placeholder='Chọn nghề nghiệp của bạn'
                                            handleOnChange={(value) => {
                                                setStateForm({
                                                    ...stateForm,
                                                    profession: value,
                                                });
                                                setStateFormError({
                                                    ...stateFormError,
                                                    profession: ''
                                                });
                                            }}
                                            value={stateForm.profession}
                                            error={stateFormError.profession}
                                        />
                                        <Dropdown
                                            isRequired
                                            options={relationship}
                                            title='Tình trạng hôn nhân'
                                            placeholder='Chọn mối quan hệ hiện tại'
                                            value={stateForm.relationship}
                                            handleOnChange={(value) => {
                                                setStateForm({
                                                    ...stateForm,
                                                    relationship: value,
                                                });
                                                setStateFormError({
                                                    ...stateFormError,
                                                    relationship: ''
                                                })
                                            }}
                                            error={stateFormError.relationship}
                                        />
                                    </div>
                                </>
                            }
                            {step === 2 &&
                                <>
                                    <h1>Bước 2: Thực hiện dánh giá</h1>
                                    <div className='t-chart_form'>
                                        <Dropdown
                                            isRequired
                                            value={stateForm.district}
                                            options={districts as any}
                                            title='Huyện'
                                            placeholder='Vui lòng chọn huyện bạn muốn đánh giá'
                                            handleOnChange={(value) => {
                                                setStateForm({
                                                    ...stateForm,
                                                    district: value,
                                                });
                                                setStateFormError({
                                                    ...stateFormError,
                                                    district: ''
                                                })
                                            }}
                                            error={stateFormError.district}
                                        />
                                        <Dropdown
                                            isRequired
                                            value={stateForm.indicator}
                                            options={indicators as any}
                                            title='Chỉ số'
                                            placeholder='Vui lòng chọn chỉ số bạn muốn đánh giá'
                                            handleOnChange={(value) => {
                                                const listQuestion = questions?.filter((i: any) => i.group_name === value.label);
                                                setStateForm({
                                                    ...stateForm,
                                                    indicator: value,
                                                    questions: listQuestion,
                                                    answers: listQuestion?.map((i, idx) => 0) as any,
                                                });
                                                setStateFormError({
                                                    ...stateFormError,
                                                    indicator: ''
                                                })
                                            }}
                                            error={stateFormError.indicator}
                                        />
                                        {stateForm.indicator && stateForm.district?.id &&
                                            <>
                                                <h2>Bộ câu hỏi</h2>
                                                <ul className='t-chart_form_list'>
                                                    {stateForm?.questions?.map((record, index) => (
                                                        <li key={record.value}>
                                                            <p>{record.label}</p>
                                                            <Slider step={1} max={10} defaultValue={0} value={stateForm.answers[index]} onChange={(value) => {
                                                                const newSliderValues = [...stateForm.answers] as any;
                                                                newSliderValues[index] = Number(value);
                                                                setStateForm({
                                                                    ...stateForm,
                                                                    answers: newSliderValues
                                                                });
                                                            }} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    }
                    {step === 1 &&
                        <div className='t-chart_form_submit'>
                            <button onClick={() => {
                                setIsOpenModal(false);
                                setStateForm({
                                    district: undefined as unknown as DropdownType,
                                    indicator: undefined as unknown as DropdownType,
                                    questions: undefined as any,
                                    answers: [],
                                    loading: false,
                                    confirm: false,
                                    isValidated: false,
                                    fullName: "",
                                    relationship: undefined as unknown as DropdownType,
                                    phoneNumber: "",
                                    old: undefined as unknown as DropdownType,
                                    profession: undefined as unknown as DropdownType,
                                    gender: undefined as unknown as DropdownType,
                                });
                                setStateFormError({
                                    district: "",
                                    indicator: "",
                                    fullName: "",
                                    relationship: "",
                                    phoneNumber: "",
                                    old: "",
                                    profession: "",
                                    gender: "",
                                });
                                setIsRating(false);
                            }}>Hủy đánh giá</button>
                            <button onClick={() => {
                                handleValidateStep1();

                            }}>
                                Tiếp tục
                            </button>
                        </div>
                    }
                    {(step === 2 || isSignIn) &&
                        <div className='t-chart_form_submit'>
                            <button onClick={() => {
                                setStep(1);
                            }}>Quay lại</button>
                            <button onClick={() => {
                                handleSubmit()
                            }}>
                                {stateForm.loading ? <Loading />
                                    :
                                    'Gửi đánh giá'
                                }
                            </button>
                        </div>
                    }
                </div>
            </CModal>
            {/* Form xác nhận gửi đánh giá với 1 chỉ số 0 điểm */}
            <CModal
                open={stateForm.confirm}
                title='Xác nhận đánh giá'
                onClose={() => setStateForm({
                    ...stateForm,
                    confirm: false,
                })}
                className='form_confirm_mobile'
                zIndex='top'
            >
                <div className="t-chart_form_confirm">
                    Bạn có chắc chắc muốn đánh giá 0 điểm.
                </div>
                <div className='t-chart_form_submit'>
                    <button onClick={() => {
                        setStateForm({
                            ...stateForm,
                            confirm: false,
                        })
                    }}>Hủy</button>
                    <button onClick={() => {
                        handleSubmit(true);
                    }}>
                        Tiếp tục
                    </button>
                </div>
            </CModal>
            {/* Form hiển thị chia sẻ thành công*/}
            <CModal
                open={isOpenModalConfirmAfterSubmit}
                title='Xác nhận'
                onClose={() => {
                    setIsOpenModalConfirmAfterSubmit(false);
                    setIsRating(false);
                }}
                zIndex="lv3"
                className='comfirm'
                showCloseIcon={false}
                closeOnOverlayClick={false}
            >
                <div className="t-chart_choose" style={{ marginTop: 20, fontSize: 16, textAlign: 'center' }}>
                    Cảm ơn bạn đã chia sẻ đánh giá của bạn về Chỉ số Hạnh phúc với chúng tôi.
                </div>
                <div className='t-chart_form_submit' style={{ marginTop: 20 }}>
                    <button onClick={() => {
                        setStateForm({
                            district: undefined as unknown as DropdownType,
                            indicator: undefined as unknown as DropdownType,
                            questions: undefined as any,
                            answers: [],
                            loading: false,
                            confirm: false,
                            isValidated: false,
                            fullName: "",
                            relationship: undefined as unknown as DropdownType,
                            phoneNumber: "",
                            old: undefined as unknown as DropdownType,
                            profession: undefined as unknown as DropdownType,
                            gender: undefined as unknown as DropdownType,
                        });
                        setIsOpenModalConfirmAfterSubmit(false);
                        setIsOpenModal(false);
                        setIsRating(false);
                    }}>
                        Kết thúc Đánh giá
                    </button>
                    <button onClick={() => {
                        setIsOpenModalConfirmAfterSubmit(false);
                        setStateForm((prve) => ({
                            questions: undefined as any,
                            answers: [],
                            loading: false,
                            confirm: false,
                            isValidated: false,
                            district: prve.district as unknown as DropdownType,
                            indicator: undefined as unknown as DropdownType,
                            fullName: prve.fullName,
                            phoneNumber: prve.phoneNumber,
                            relationship: prve.relationship as unknown as DropdownType,
                            old: prve.old as unknown as DropdownType,
                            profession: prve.profession as unknown as DropdownType,
                            gender: prve.gender as unknown as DropdownType,
                        }))
                        setIsRating(true);
                    }} >
                        Đánh giá tiếp chỉ số khác
                    </button>
                </div>
            </CModal >
        </div>
    )
}

export default MobileSreen;
