import React, { useContext, useEffect, useMemo, useState } from 'react';
import FlowerColumn from '../../molecules/flowerColumn';
import './styles.css'
import { unit } from '../../../assets/data';
import { mapModifiers } from '../../../utils/functions';
import { useBetterLife } from '../provider';
import Loading from '../../atoms/loading';
import Slider from '../../atoms/slider';
import CModal from '../../organisms/modal';
import Dropdown, { DropdownType } from '../../atoms/dropdown';
import { getWBI, postDistrictsIndicators } from '../../../services/apis';
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
    isMobile?: boolean;
}


type SortType = 'alphabet' | 'rank'

const FlowerChartMobile: React.FC<FlowerChartProps> = ({ isDetail, isMobile }) => {
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
        handleSetDistrictActive
    } = useBetterLife();

    const localStoreToken = localStorage.getItem('login_token');

    const [idColumnHover, setIdColumnHover] = useState(0);
    const [softBy, setSortBy] = useState<SortType>('alphabet');

    const [valueAUnit, setValueAUnit] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [stateForm, setStateForm] = useState({
        district: undefined as unknown as DropdownType,
        indicator: undefined as unknown as DropdownType,
        questions: undefined as any,
        answers: [],
        loading: false,
        confirm: false,
        isValidated: false,
    });
    const [updateData, setUpdateData] = useState<any>();

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
                    district: undefined as unknown as DropdownType,
                    indicator: undefined as unknown as DropdownType,
                    questions: undefined as any,
                    answers: [],
                    loading: false,
                    confirm: false,
                    isValidated: false,
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
        if (!handleValidate() && !isValidated) return;
        const body = {
            districts_id: stateForm.district.id,
            questions_id: stateForm.questions.map((i) => i.id),
            question_code: stateForm.questions.map((i) => i.value),
            value: stateForm.answers,
            indicator_id: stateForm.questions[0].group_id
        }
        setStateForm({
            ...stateForm,
            loading: true,
        });
        submitIndicators(body);
    }

    return (
        <>
            <div className={mapModifiers('t-chart', isDetail && 'detail', isMobile ? 'mobile' : 'normal')}>
                <div className='t-chart_unit'>
                    {unit.map((i) => (<div key={i}>{i}&nbsp;-</div>))}
                </div>
                {loading ? <Loading /> :
                    <div className='t-chart_main'>
                        {(chartData || updateData || [])?.map((item: districtItem, index: number) => (
                            <FlowerColumn
                                isMobile={isMobile}
                                unit={valueAUnit}
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
                {!isMobile &&
                    <div className='t-chart_filter'>
                        <div>
                            <h3>Tạo chỉ số cuộc sống tốt đẹp hơn của bạn</h3>
                            <p>Đánh giá các chủ đề theo mức độ quan trọng của chúng đối với bạn:</p>
                            <div className="t-chart_filter_box_vote">
                                {localStoreToken &&
                                    <button
                                        className={mapModifiers('t-chart_filter_box_vote')}
                                        onClick={() => {
                                            setIsOpenModal(true)
                                        }}
                                    >Đánh giá ngay</button>
                                }
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
                }
            </div>
            <CModal
                open={isOpenModal}
                title='Mẫu đánh giá'
                onClose={() => setIsOpenModal(false)}
            >
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
            <CModal
                open={stateForm.confirm}
                title='Xác nhận đánh giá'
                onClose={() => setStateForm({
                    ...stateForm,
                    confirm: false,
                })}
                zIndex="lv2"
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
        </>
    )
};

FlowerChartMobile.defaultProps = {
    isDetail: false

};

export default FlowerChartMobile;
