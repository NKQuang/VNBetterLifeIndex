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
import { gender, RangeOld, relationship } from '../../../assets/data';
import Footer from '../footer';

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
        districts, indicators, questions, handleSetInfoUser, isShowDetail
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
    });
    const [statesSignUpErr, setStatesSignUpErr] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
    });

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [updateData, setUpdateData] = useState<any>();

    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
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
        profession: '',
        gender: undefined as unknown as DropdownType,
    });
    const [states, setStates] = useState({
        username: '',
        password: '',
        isHidePassword: false,
        isOpenFormLogin: false,
        pendding: false,
    })

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
            statesSignUp.passwordConfirm !== statesSignUp.password
        ) {
            setStatesSignUpErr({
                ...statesSignUpErr,
                fullname: !statesSignUp.fullname ? 'Họ và tên là bắt buộc' : '',
                email: !statesSignUp.email ? 'Email là bắt buộc' : '',
                phoneNumber: !statesSignUp.phoneNumber ? 'Số điện thoại là bắt buộc' : '',
                password: !statesSignUp.password ? 'Mật khẩu là bắt buộc' : (statesSignUp.password.length < 8 ? 'Mật khẩu tối thiểu 8 kí tự' : ''),

                passwordConfirm: !statesSignUp.passwordConfirm ? 'Xác nhận mật khẩu là bắt buộc' : (statesSignUp.passwordConfirm !== statesSignUp.password ? 'Xác nhận mật khẩu không chính xác' : ''),
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

    const handleSubmitLogin = () => {
        if (isSignUp && !handleValidateSignUp()) return;
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
        setUpdateData(data);
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
                    fullName: "",
                    relationship: undefined as unknown as DropdownType,
                    phoneNumber: "",
                    old: undefined as unknown as DropdownType,
                    profession: "",
                })
                toast.success('Gửi đánh giá thành công!');
                getWbi();
            }).catch((error) => {
                console.log('error', error)

            })
    }

    const handleValidate = () => {
        if (stateForm.answers.some((i) => i === 0)) {
            setStateForm({
                ...stateForm,
                confirm: true,
            })
            return false
        }
        return true;
    }

    const handleSubmit = () => {
        if (!handleValidate()) return;
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
            profession: stateForm.profession,
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
            <ContentMobile handleLogin={() => {
                setStatesLogin({ ...statesLogin, isOpenFormLogin: true });
                setIsSignUp(false);
            }} />
            <div style={{ marginTop: 12, padding: '4px 8px' }}>
                {
                    loading ?
                        <div style={{ height: 200, width: '98vw' }}>
                            <Loading />
                        </div>
                        :
                        isShowDetail ? <div className='p-home_content p-home_desc'>
                            <div className='p-home_content_wrapper'>
                                <h2 style={{ marginBottom: 8 }}>{districtActive?.full_name}</h2>
                                <p>
                                    {districtActive?.content}
                                </p>
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
                            <div className='t-header_form_item'>
                                <p>Email</p>
                                <input
                                    type='text'
                                    autoFocus
                                    value={statesLogin.username}
                                    placeholder='Vui lòng nhập email...'
                                    onChange={(event) => setStatesLogin({ ...statesLogin, username: event.target.value })}
                                />
                            </div>
                            <div className='t-header_form_item'>
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
                className='form_mobile'
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
                title='Mẫu đánh giá'
                onClose={() => setIsOpenModal(false)}
                className='form_mobile'
                zIndex='top'
            >
                <p style={{ lineHeight: 1.5, fontStyle: 'italic', marginBottom: 4, paddingBottom: 4, borderBottom: '1px solid #dbdbdb' }}>Cảm ơn bạn đã chia sẻ đánh giá của bạn về Hạnh phúc với chúng tôi. <br />
                    Cuộc khảo sát này sẽ không làm bạn mất quá 2 phút.<br />
                    Thông tin và đánh giá của bạn sẽ được ẩn danh.</p>
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
                    : <>
                        <div className='t-chart_info_customer'>
                            <div className='t-chart_info_item'>
                                <p>Họ tên</p>
                                <input
                                    type='text'
                                    autoFocus
                                    placeholder=''
                                    value={stateForm.fullName}
                                    onChange={(event) => {
                                        setStateForm({
                                            ...stateForm,
                                            fullName: event.target.value,
                                        })
                                    }}
                                />
                            </div>
                            <div className='t-chart_info_item'>
                                <p>Số điện thoại</p>
                                <input
                                    type='text'
                                    autoFocus
                                    placeholder=''
                                    value={stateForm.phoneNumber}
                                    onChange={(event) => {
                                        setStateForm({
                                            ...stateForm,
                                            phoneNumber: event.target.value,
                                        })
                                    }}
                                />
                            </div>
                            <Dropdown
                                options={gender}
                                title='Giới tính'
                                placeholder='Chọn giới tính ...'
                                value={stateForm.gender}
                                handleOnChange={(value) => {
                                    setStateForm({
                                        ...stateForm,
                                        gender: value,
                                    })
                                }}
                            />
                            <Dropdown
                                options={RangeOld}
                                title='Độ tuổi'
                                placeholder='Chọn độ tuổi của bạn'
                                value={stateForm.old}
                                handleOnChange={(value) => {
                                    setStateForm({
                                        ...stateForm,
                                        old: value,
                                    })
                                }}
                            />
                            <div className='t-chart_info_item'>
                                <p>Nghề nghiệp</p>
                                <input
                                    type='text'
                                    autoFocus
                                    placeholder=''
                                    onChange={(event) => {
                                        setStateForm({
                                            ...stateForm,
                                            profession: event.target.value,
                                        })
                                    }}
                                />
                            </div>
                            <Dropdown
                                options={relationship}
                                title='Tình trạng hôn nhân'
                                placeholder='Chọn tình trạng hôn nhân của bạn'
                                handleOnChange={(value) => {
                                    setStateForm({
                                        ...stateForm,
                                        relationship: value,
                                    })
                                }}
                            />
                        </div>
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
                    </>
                }
                <div className='t-chart_form_submit'>
                    <button onClick={() => setIsOpenModal(false)}>Hủy</button>
                    <button onClick={() => {
                        handleSubmit()
                    }}>
                        {stateForm.loading ? <Loading />
                            :
                            'Gửi đánh giá'
                        }
                    </button>
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
                className='form_mobile'
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
                        handleSubmit();
                    }}>
                        Tiếp tục
                    </button>
                </div>
            </CModal>
        </div>
    )
}

MobileSreen.defaultProps = {
    children: undefined,
};

export default MobileSreen;
