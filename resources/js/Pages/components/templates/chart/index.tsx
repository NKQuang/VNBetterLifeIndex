import React, { useContext, useEffect, useMemo, useState } from 'react';
import FlowerColumn from '../../molecules/flowerColumn';
import './styles.css'
import { exampleDataChart, unit } from '../../../assets/data';
import { mapModifiers } from '../../../utils/functions';
import { ChartContext } from '../../../pages/home.page/index';
import { useBetterLife } from '../provider';
import Loading from '../../atoms/loading';
import Slider from '../../atoms/slider';
import { colorsPetal } from '../../atoms/flower';
import CModal from '../../organisms/modal';
import Dropdown, { DropdownType } from '../../atoms/dropdown';
import { Link } from 'react-router-dom';
import { postDistrictsIndicators } from '../../../services/apis';

interface FlowerChartProps {
    isDetail?: boolean;
}

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
    } = useBetterLife();
    const [idColumnHover, setIdColumnHover] = useState(0);
    const [softBy, setSortBy] = useState<SortType>('alphabet');

    const [valueAUnit, setValueAUnit] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [stateForm, setStateForm] = useState({
        district: undefined as unknown as DropdownType,
        indicator: undefined as unknown as DropdownType,
        questions: undefined as any,
        answers: [],
    });
    console.log(stateForm);

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

    const submitIndicators = async (body: any) => {
        await postDistrictsIndicators(body)
            .then((data) => {
                console.log('success', data)
            }).catch((error) => {
                console.log('error', error)

            })
    }


    const handleValidate = () => {
        return true;
    }

    const handleSubmit = () => {
        if (!handleValidate()) return;
        const body = {
            districts_id: stateForm.district.id,
            questions_id: stateForm.questions.map((i) => i.id),
            question_code: stateForm.questions.map((i) => i.value),
            value: stateForm.answers,
            indicator_id: stateForm.questions[0].group_id
        }
        submitIndicators(body);
    }

    return (
        <>
            <div className={mapModifiers('t-chart', isDetail && 'detail')}>
                <div className='t-chart_unit'>
                    {unit.map((i) => (<div key={i}>{i}&nbsp;-</div>))}
                </div>
                {loading ? <Loading /> :
                    <div className='t-chart_main'>
                        {chartData?.map((item: districtItem, index: number) => (
                            <FlowerColumn
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
                                    setIsOpenModal(true)
                                }}
                            >Đánh giá ngay</button>
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
                            const listQuestion = questions?.filter((i: any) => i.group_name === value.label)
                            setStateForm({
                                ...stateForm,
                                indicator: value,
                                questions: listQuestion,
                                answers: listQuestion?.map((i, idx) => 0) as any,
                            });
                        }}
                    />

                    {stateForm.indicator && stateForm.district &&
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
                    <button onClick={handleSubmit}>Gửi đánh giá</button>
                </div>
            </CModal>
        </>
    )
};

FlowerChart.defaultProps = {
    isDetail: false

};

export default FlowerChart;
