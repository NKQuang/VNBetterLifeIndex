import React, { createContext, useEffect, useState } from 'react';
import './style.css'
import FlowerChart from '../../components/templates/chart';
import Header from '../../components/templates/nav';
import { useBetterLife } from '../../components/templates/provider';
import { checkLogin, getDistrictsIndicators, getWBI } from '../../services/apis';
import Loading from '../../components/atoms/loading';
import { mapModifiers } from '../../utils/functions';
import ChartDetailDistrict from '../../components/templates/detail-district';
import Cookies from 'js-cookie';
import Footer from '../../components/templates/footer';

export const ChartContext = createContext({} as any);

const HomePage: React.FC = () => {
  const {
    handleSetChartData,
    handleSetLoading,
    handleSetIsFilter,
    handleUpdateDistrictIndicators,
    isShowDetail,
    loading,
    handleUpdateSignIn,
    isSignIn,
    districtActive
  } = useBetterLife();

  const cookieToken = Cookies.get('login_token');
  const localStoreToken = localStorage.getItem('login_token');

  const [token, setToken] = useState({
    cookie: cookieToken,
    local: localStoreToken
  });

  useEffect(() => {
    setToken({
      cookie: cookieToken,
      local: localStoreToken
    })
  }, [cookieToken, localStoreToken])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token.cookie && !token.local) {
          authorize();
        }
        getWbi();
      } catch (error) {
        handleSetIsFilter(false);
        handleSetLoading(false);
      }
    };
    handleSetIsFilter(false);
    handleSetLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (token.local) {
      getIndicators();
    }
  }, [token.local, isSignIn]);


  const getWbi = async () => {
    const data = await getWBI();
    handleSetChartData(data);
    handleSetLoading(false);
    handleSetIsFilter(false);
  }

  const authorize = async () => {
    const check: any = await checkLogin();
    if (check.authenticated) {
      Cookies.set('login_token', JSON.stringify(check.api_token));
      localStorage.setItem('login_token', check.api_token);
      localStorage.setItem('account', JSON.stringify(check.user));
      setTimeout(() => {
        handleUpdateSignIn(true);
      }, 2000);
    } else {
      handleUpdateSignIn(false);
    }
  }

  const getIndicators = async () => {
    const districts: any = await getDistrictsIndicators();
    handleUpdateDistrictIndicators(districts ?? {} as any);
  }

  const renderContenDistrictActive = () => {
    return (
      <div className='p-home_content p-home_desc'>
        <div className='p-home_content_wrapper'>
          <h2>{districtActive?.full_name}</h2>
          <p>
            {districtActive?.content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='p-home'>
      <Header />
      {isShowDetail ?
        <>
          <div className={mapModifiers('p-home_chart', isShowDetail && 'detail', loading && isShowDetail && 'loading')}>
            {
              loading ?
                <Loading />
                :
                <>
                  <ChartDetailDistrict />
                </>
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
  )
};

export default HomePage;
