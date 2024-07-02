import React, { createContext, useEffect, useState } from 'react';
import './style.css'
import FlowerChart from '../../components/templates/chart';
import Header from '../../components/templates/nav';
import { useBetterLife } from '../../components/templates/provider';
import { checkLogin, getDistrictsIndicators, getWBI } from '../../services/apis';
import Loading from '../../components/atoms/loading';
import { mapModifiers } from '../../utils/functions';
import ChartDetailDistrict from '../../components/templates/detail-district';
import Footer from '../../components/templates/footer';
import MobileSreen from '../../components/templates/mobile';
import CTooltip from '../../components/atoms/tooltip';
import CSkeleton from '../../components/atoms/skeleton';

export const ChartContext = createContext({} as any);

const HomePage: React.FC = () => {
  const {
    handleSetChartData,
    handleSetChartDataRoot,
    handleSetLoading,
    handleSetIsFilter,
    handleUpdateDistrictIndicators,
    isShowDetail,
    loading,
    districtIndicators,
    indicators,
    allIndicators,
    handleUpdateSignIn,
    districtActive,
    sreenWidth,
    handleSetInfoUser
  } = useBetterLife();

  const localStoreToken = localStorage.getItem('login_token');
  const localStoreAccount = localStorage.getItem('account');

  const [token, setToken] = useState({
    local: localStoreToken
  });

  useEffect(() => {
    setToken({
      local: localStoreToken
    })
  }, [localStoreToken])

  useEffect(() => {
    const fetchData = async () => {
      try {
        getWbi();
      } catch (error) {
        handleSetIsFilter(false);
        handleSetLoading(false);
      }
    };
    handleSetIsFilter(false);
    handleSetLoading(true);
    fetchData();
    if (localStoreAccount) {
      handleSetInfoUser(JSON.parse(localStoreAccount));
      handleUpdateSignIn(true);
    }
  }, []);

  useEffect(() => {
    if (!districtIndicators) {
      getIndicators();
    }
  }, [token.local, districtIndicators]);


  const getWbi = async () => {
    const data = await getWBI();
    handleSetChartData(data);
    handleSetChartDataRoot(data);
    handleSetLoading(false);
    handleSetIsFilter(false);
  }


  const getIndicators = async () => {
    const districts: any = await getDistrictsIndicators();
    handleUpdateDistrictIndicators(districts ?? {} as any);
  }

  const renderChart = () => {
    return (
      <div className='p-home_content_indicators'>
        {loading ?
          <div style={{ height: 'fit-content', width: '300px' }}>
            <CSkeleton count={1} height={27} />
            <CSkeleton count={1} height={27} width={30} />
            <CSkeleton count={1} height={100} />
          </div>
          :
          indicators?.map((item, index) => {
            const aIndicator = allIndicators?.filter((indicator, yndex) => indicator.indicator === item.label).sort((a, b) => a.value - b.value)
            return (
              <div className='p-home_content_indicators_item'>
                <div className='p-home_content_indicators_item_title'>
                  <h2>{item.label}</h2>
                  <p>{aIndicator?.find((i) => i.district_id === districtActive?.id)?.value?.toFixed(2)}</p>
                </div>
                <div className='p-home_content_indicators_item_wrapper'>
                  {aIndicator?.map((i, idx) => <CTooltip key={idx} content={`${i.district}: ${i.value.toFixed(2)}`}>
                    <div
                      className={mapModifiers('p-home_content_indicators_item_wrapper_colum', districtActive?.id === i.district_id ? 'active' : 'normal')}
                      style={{
                        height: i.value * 12,
                        width: '20px',
                      }} />
                  </CTooltip>)}
                </div>
              </div>
            )
          })}
      </div>
    )
  }

  const renderContenDistrictActive = () => {
    return (
      <div className='p-home_content p-home_desc'>
        <div className='p-home_desc_wrapper'>
          <div className='p-home_content_wrapper'>
            <h2>{districtActive?.full_name}</h2>
            <p>
              {districtActive?.content}
            </p>
          </div>
          {renderChart()}
        </div>
      </div>
    )
  }

  const handleRender = () => {
    return (
      sreenWidth > 1025 ?
        (
          <div className='p-home'>
            <Header />
            {isShowDetail ?
              <>
                <div className={mapModifiers('p-home_chart', isShowDetail && 'detail', loading && isShowDetail && 'loading')}>
                  {
                    loading ?
                      <Loading />
                      :
                      <ChartDetailDistrict />
                  }
                </div>
                {renderContenDistrictActive()}
              </>
              :
              <div className={mapModifiers('p-home_chart', isShowDetail && 'detail', loading && isShowDetail && 'loading')}>
                <FlowerChart />
                <div className='p-home_content'>
                  <div className='p-home_content_wrapper'>
                    <h2>Cuộc sống thế nào?</h2>
                    <p>Cuộc sống còn nhiều điều thú vị hơn những con số GDP và thống kê kinh tế lạnh lùng – Chỉ số này cho phép bạn so sánh mức độ hạnh phúc giữa các huyện, dựa trên 12 chủ đề mà chúng tôi đã xác định là thiết yếu, trong các lĩnh vực điều kiện sống vật chất và chất lượng cuộc sống.</p>
                  </div>
                </div>
              </div>
            }
            <Footer />
          </div >
        ) : (
          <MobileSreen />
        )
    )
  }

  return (
    <>
      {handleRender()}
    </>
  )
};

export default HomePage;
