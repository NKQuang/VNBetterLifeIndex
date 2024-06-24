import React, { createContext, useEffect } from 'react';
import './style.css'
import FlowerChart from '../../components/templates/chart';
import Header from '../../components/templates/nav';
import { useBetterLife } from '../../components/templates/provider';
import { checkLogin, getDistrictsIndicators, getWBI } from '../../services/apis';
import Loading from '../../components/atoms/loading';
import { mapModifiers } from '../../utils/functions';
import ChartDetailDistrict from '../../components/templates/detail-district';

export const ChartContext = createContext({} as any);

const HomePage: React.FC = () => {
  const {
    handleSetChartData,
    handleSetLoading,
    handleSetIsFilter,
    handleUpdateDistrictIndicators,
    isShowDetail,
    loading,
  } = useBetterLife();

  useEffect(() => {
    const fetchData = async () => {
      try {
        getWbi();
        authorize();
        getIndicators();
      } catch (error) {
        handleSetIsFilter(false);
        handleSetLoading(false);
      }
    };
    handleSetIsFilter(false);
    handleSetLoading(true);
    fetchData();
  }, []);


  const getWbi = async () => {
    const data = await getWBI();
    handleSetChartData(data);
    handleSetLoading(false);
    handleSetIsFilter(false);
  }

  const authorize = async () => {
    const checklogin: any = checkLogin();
    console.log(checklogin)
  }

  const getIndicators = async () => {
    const districts: any = await getDistrictsIndicators();
    handleUpdateDistrictIndicators(districts);
  }

  return (
    <div className='p-home'>
      <Header />
      {isShowDetail ?
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
        :
        <div className={mapModifiers('p-home_chart', isShowDetail && 'detail', loading && isShowDetail && 'loading')}>
          <FlowerChart />
          <div className='p-home_content'>
            <div className='p-home_content_wrapper'>
              <h2>How’s life?</h2>
              <p>There is more to life than the cold numbers of GDP and economic statistics – This Index allows you to compare well-being across countries, based on 11 topics the OECD has identified as essential, in the areas of material living conditions and quality of life.</p>
              <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
            </div>
          </div>
        </div>
      }

    </div >
  )
};

export default HomePage;
