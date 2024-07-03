import React, { useContext, useEffect, useMemo, useState } from 'react';
import FlowerColumn from '../../molecules/flowerColumn';
import './styles.css'
import { gender, profession, RangeOld, relationship, unit } from '../../../assets/data';
import { mapModifiers } from '../../../utils/functions';
import { useBetterLife } from '../provider';
import Loading from '../../atoms/loading';
import Slider from '../../atoms/slider';
import CModal from '../../organisms/modal';
import Dropdown, { DropdownType } from '../../atoms/dropdown';
import { getWBI, loginWithAccount, postDistrictsIndicators, postRegisterAccount } from '../../../services/apis';
import { toast } from 'react-toastify';
import icHousing from '../../../assets/images/housing.svg';
import icIncome from '../../../assets/images/income.svg';
import icJobs from '../../../assets/images/jobs.svg';
import icCommunity from '../../../assets/images/community.svg';
import icEducation from '../../../assets/images/education.svg';
import icEnvironment from '../../../assets/images/environment.svg';
import icCivicEngagement from '../../../assets/images/civic_engagement.svg';
import icHearth from '../../../assets/images/hearth.svg';
import icSatisfaction from '../../../assets/images/satisfaction.svg';
import icSafety from '../../../assets/images/safety.svg';
import icWorkLifeBalance from '../../../assets/images/work-life-balance.svg';
import icAdministration from '../../../assets/images/city-hall.svg';

const IconAllowIndicators = [icIncome, icJobs, icHearth, icEducation, icHousing, icSatisfaction, icEnvironment, icSafety, icWorkLifeBalance, icCommunity, icCivicEngagement, icAdministration]


export interface districtItem {
    district_id: string | number;
    district: string;
    value: number;
    indicators: Indicator[];
}

export interface Indicator {
    indicator_id: string;
    indicator: string;
    value: number;
    weightedValue: number;
}

interface FlowerChartProps {
    isDetail?: boolean;
}


export type SortType = 'alphabet' | 'rank'

const FlowerChart: React.FC<FlowerChartProps> = ({ isDetail }) => {
    const { isFilter,
        handleSetIsFilter,
        loading,
        chartData,
        handleSetChartData,
        handleSetLoading,
        districts,
        indicators,
        handleSetInfoDetail,
        handleShowDetail,
        questions,
        isSignIn,
        districtIndicators,
        handleSetDistrictActive,
        chartDataRoot,
        userInfo,
        handleUpdateSignIn,
        handleSetInfoUser,
    } = useBetterLife();

    const [idColumnHover, setIdColumnHover] = useState(0);
    const [softBy, setSortBy] = useState<SortType>('alphabet');

    const [valueAUnit, setValueAUnit] = useState(0);
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
        phoneNumber: "",
        relationship: undefined as unknown as DropdownType,
        old: undefined as unknown as DropdownType,
        profession: undefined as unknown as DropdownType,
        gender: undefined as unknown as DropdownType,
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

    const [updateData, setUpdateData] = useState<any>();
    const [states, setStates] = useState({
        username: '',
        password: '',
        isHidePassword: false,
        isOpenFormLogin: false,
        pendding: false,
    })

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

    const [idIndicatorsActive, setIdIndicatorsActive] = useState<number>(99);

    useEffect(() => {
        const getHeightUnit = document.querySelector('.t-chart_unit div');
        setValueAUnit((getHeightUnit as any).offsetHeight);
    }, [window.innerWidth, window.innerHeight])

    const handleOnMouseEnterColumn = (id?: number) => {
        setIdColumnHover(Number(id));
    }

    const handleOnMouseLeaveColumn = () => { setIdColumnHover(0); }

    const handleSortData = (type: 'alphabet' | 'rank') => {
        setSortBy(type)
        handleSetIsFilter(true);
        switch (type) {
            case 'alphabet':
                const alphabet = chartData?.sort((a: districtItem, b: districtItem) => a.district.localeCompare(b.district));
                handleSetLoading(true);
                handleSetChartData(alphabet as districtItem[])
                break;
            case 'rank':
                const rank = chartData?.sort((a: districtItem, b: districtItem) => a.value - b.value);
                handleSetLoading(true);
                handleSetChartData(rank as districtItem[]);
                break;
        }
    }

    const getWbi = async () => {
        const data = await getWBI();
        if (idIndicatorsActive !== 99) {
            handleSortAllowIndicator(idIndicatorsActive)
        } else {
            handleSetChartData(data);
            setUpdateData(data);
        }
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
                })
                toast.success('Gửi đánh giá thành công!');
                getWbi();
                setIsOpenModalConfirmAfterSubmit(true);
            }).catch((error) => {
                console.log('error', error)

            })
    }

    const handleValidate = (isContinue?: boolean) => {
        if (
            !isSignIn && !stateForm.district?.value ||
            !isSignIn && !stateForm.indicator?.value ||
            !isSignIn && !stateForm.profession?.value ||
            !isSignIn && !stateForm.relationship?.value ||
            !isSignIn && !stateForm.fullName ||
            !isSignIn && !stateForm.phoneNumber ||
            !isSignIn && !stateForm.old?.value ||
            !isSignIn && !stateForm.gender?.value
        ) {
            setStateFormError({
                ...stateFormError,
                district: !stateForm.district?.value ? "Huyện là trường bắt buộc" : "",
                indicator: !stateForm.indicator?.value ? "Chọn một chỉ số để tiếp tục" : "",
                fullName: !stateForm.fullName ? "Họ tên là trường bắt buộc" : "",
                relationship: !stateForm.relationship?.value ? "Mối quan hệ là trường bắt buộc" : "",
                phoneNumber: !stateForm.phoneNumber ? "Số điện thoại là trường bắt buộc" : "",
                old: !stateForm.old?.value ? "Độ tuổi là trường bắt buộc" : "",
                profession: !stateForm.profession?.value ? "Nghề nghiệp là trường bắt buộc" : "",
                gender: !stateForm.gender?.value ? "Giới tính là trường bắt buộc" : "",
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
        if (!handleValidate(isContinue ?? false)) return;
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
            profession: stateForm.profession?.value,
            user_id: userInfo?.id ?? null,
            gender: stateForm.gender?.value
        };
        setStateForm({
            ...stateForm,
            loading: true,
        });
        submitIndicators(body);
    }

    const handleLogin = async (body: any) => {
        await loginWithAccount(body).then((response) => {
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
            handleUpdateSignIn(true);
            handleSetInfoUser(user);
            toast.success('Đăng nhập thành công!')
        }).catch((error) => {
            toast.error('Vui lòng kiểm tra lại thông tin đăng nhập');
            setStates({
                ...states,
                pendding: false,
            });
        })
    }

    const handleSortAllowIndicator = (id: any) => {
        setIdIndicatorsActive(id);
        const newList = chartDataRoot?.map((item) => ({
            ...item,
            value: item.indicators.find((i: Indicator) => i.indicator_id === id)?.value
        }))?.sort((a: any, b: any) => a.value - b.value);
        console.table(newList)
        handleSetChartData(newList as any);
        handleSetLoading(true);
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

    const handleSubmitAuthen = () => {
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

    return (
        <>
            <div className={mapModifiers('t-chart', isDetail && 'detail')}>
                <div className='t-chart_unit'>
                    {unit.map((i) => (<div key={i}>{i}&nbsp;-</div>))}
                </div>
                {loading ? <Loading /> :
                    <div className='t-chart_main'>
                        {(chartData || updateData || [])?.map((item: districtItem, index: number) => (
                            <FlowerColumn
                                unit={valueAUnit}
                                isMobile={false}
                                isFilter={isFilter}
                                data={item.indicators}
                                value={item.value}
                                index={index + 1}
                                isHover={index + 1 === idColumnHover}
                                columnName={item.district}
                                onMouseEnter={handleOnMouseEnterColumn}
                                onMouseLeave={handleOnMouseLeaveColumn}
                                handleClickColumn={() => {
                                    handleSetInfoDetail(item);
                                    handleShowDetail(true);
                                    handleSetLoading(true);
                                    const districtActive = districtIndicators?.districts.filter((i) => i.id === item.district_id);
                                    handleSetDistrictActive((districtActive || [])[0]);
                                }}
                            />
                        ))}
                    </div>
                }
                <div className='t-chart_filter'>
                    <div>
                        <h3>Tạo chỉ số cuộc sống tốt đẹp hơn của bạn</h3>
                        <p>Đánh giá các chủ đề theo mức độ quan trọng của chúng đối với bạn:</p>
                        <div className="t-chart_filter_box_vote">
                            <button
                                className={mapModifiers('t-chart_filter_box_vote')}
                                onClick={() => {
                                    if (isSignIn) {
                                        setIsOpenModal(true)
                                    } else {
                                        setIsOpenModalConfirm(true)
                                    }
                                }}
                            >Chia sẻ cảm nhận của bạn về hạnh phúc</button>
                        </div>
                    </div>
                    <div className='t-chart_soft'>
                        {
                            !indicators ? <Loading /> :
                                <div className='t-chart_soft_wrapper'>
                                    <h2>Sắp xếp theo chỉ số</h2>
                                    {indicators?.map((item, index) => (
                                        <div
                                            key={index}
                                            style={idIndicatorsActive === item.id ? {
                                                backgroundColor: '#afcbff',
                                                borderRadius: 4,
                                            } : {}}
                                            onClick={() => {
                                                handleSortAllowIndicator(item.id)
                                            }}
                                        >
                                            <img src={IconAllowIndicators[index]} /><p>{item.label}</p>
                                        </div>
                                    ))}
                                    <button onClick={() => {
                                        if (idIndicatorsActive === 99) return;
                                        handleSetChartData(chartDataRoot as any);
                                        handleSetLoading(true);
                                        setIdIndicatorsActive(99);
                                    }}>Reset</button>
                                </div>
                        }
                    </div>
                    <ul className="t-chart_filter_box_sort">
                        <p>Sắp xếp:</p>
                        <button
                            className={mapModifiers('t-chart_filter_box_sort_item', softBy === 'alphabet' ? 'active' : '')}
                            onClick={() => {
                                if (softBy === 'alphabet') return;
                                handleSortData('alphabet')
                            }}
                        >A - Z</button>
                        <button
                            className={mapModifiers('t-chart_filter_box_sort_item', softBy === 'rank' ? 'active' : '')}
                            onClick={() => {
                                if (softBy === 'rank') return;
                                handleSortData('rank')
                            }}
                        >Xếp hạng WBI</button>
                    </ul>

                </div>
            </div>
            {/* Form xác nhận đánh giá*/}
            <CModal
                open={isOpenModalConfirm}
                title='Xác nhận'
                onClose={() => setIsOpenModalConfirm(false)}
                zIndex="lv3"
                className='comfirm'
            >
                <div className="t-chart_choose" style={{ marginTop: 20, fontSize: 16, textAlign: 'center' }}>
                    Khi bạn chia sẻ mà không đăng nhập, bạn không thể xem lại các thông tin đã đánh giá và cập nhật các chỉ số đánh giá của bạn. Đăng nhập để được nhiều quyền lợi hơn.
                </div>
                <div className='t-chart_form_submit' style={{ marginTop: 20 }}>
                    <button onClick={() => {
                        setIsOpenModalConfirm(false);
                        setStates({ ...states, isOpenFormLogin: true })
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
                zIndex="lv2"
                className='form-rating'
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
                                    placeholder='Chọn độ tuổi của bạn'
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
                    }}>Hủy đánh giá</button>
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
                zIndex="lv3"
                className='confirm_vote'
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
                    }} >
                        Đánh giá tiếp chỉ số khác
                    </button>
                </div>
            </CModal >
            {/* Form đăng nhập */}
            < CModal
                open={states.isOpenFormLogin}
                onClose={
                    function (): void {
                        setStates({ ...states, isOpenFormLogin: false })
                    }
                }
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
                                value={statesSignUp.profession}
                                handleOnChange={(value) => {
                                    setStatesSignUp({ ...statesSignUp, profession: value });
                                    setStatesSignUpErr({ ...statesSignUpErr, profession: '' });
                                }}
                                error={statesSignUpErr.profession}
                            />
                            <Dropdown
                                isRequired
                                options={relationship}
                                value={statesSignUp.relationship}
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
                        });
                    }}>Hủy</button>
                    <button onClick={handleSubmitAuthen}>
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
            </ CModal >
        </>
    )
};

FlowerChart.defaultProps = {
    isDetail: false

};

export default FlowerChart;
