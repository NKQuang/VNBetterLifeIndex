import React, { useContext, useEffect, useMemo, useState } from 'react';
import FlowerColumn from '../../molecules/flowerColumn';
import './styles.css'
import { gender, RangeOld, relationship, unit } from '../../../assets/data';
import { mapModifiers } from '../../../utils/functions';
import { useBetterLife } from '../provider';
import Loading from '../../atoms/loading';
import Slider from '../../atoms/slider';
import CModal from '../../organisms/modal';
import Dropdown, { DropdownType } from '../../atoms/dropdown';
import { getWBI, loginWithAccount, postDistrictsIndicators } from '../../../services/apis';
import { toast } from 'react-toastify';

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


type SortType = 'alphabet' | 'rank'

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
    const [updateData, setUpdateData] = useState<any>();
    const [states, setStates] = useState({
        username: '',
        password: '',
        isHidePassword: false,
        isOpenFormLogin: false,
        pendding: false,
    })
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
        setUpdateData(data);
        handleSetChartData(data);
        handleSetLoading(true);
        handleSetIsFilter(false);
    }

    const submitIndicators = async (body: any) => {
        await postDistrictsIndicators(body)
            .then((data) => {
                setIsOpenModal(false);
                setStateForm({
                    ...stateForm,
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

    const handleSubmit = (isValidated: boolean = false) => {
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
            handleUpdateSignIn(true);
            handleSetInfoUser(user);
            toast.success('Đăng nhập thành công!')
        } else {
            toast.error('Vui lòng kiểm tra lại thông tin đăng nhập');
            setStates({
                ...states,
                pendding: false,
            });
        }
    }


    const handleSubmitLogin = () => {
        const body = {
            email: states.username,
            password: states.password,
        }
        handleLogin(body);
        setStates({ ...states, pendding: true })
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
                                    <p>{item.label}</p>
                                </div>
                            ))}
                            <button onClick={() => {
                                if (idIndicatorsActive === 99) return;
                                handleSetChartData(chartDataRoot as any);
                                handleSetLoading(true);
                                setIdIndicatorsActive(99);
                            }}>Reset</button>
                        </div>
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
                        >Theo giá trị</button>
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
                title='Mẫu đánh giá'
                onClose={() => setIsOpenModal(false)}
                zIndex="lv2"
                className='form-rating'
            >
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
                        handleSubmit(false)
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
            {/* Form đăng nhập */}
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
                                    handleSubmitLogin();
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
                    <button onClick={handleSubmitLogin}>
                        {states.pendding ?
                            <Loading />
                            :
                            'Đăng nhập'
                        }
                    </button>
                </div>
            </CModal>
        </>
    )
};

FlowerChart.defaultProps = {
    isDetail: false

};

export default FlowerChart;
