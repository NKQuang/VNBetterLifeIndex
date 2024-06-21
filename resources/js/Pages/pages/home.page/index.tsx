import React, { createContext, useEffect } from 'react';
import './style.css'
import FlowerChart from '../../components/templates/chart';
import Header from '../../components/templates/nav';
import { useChart } from '../../components/templates/provider';

export const ChartContext = createContext({} as any);

const HomePage: React.FC = () => {
  const { handleSetChartData, handleSetLoading, handleSetIsFilter, handleSetChartDataRoot } = useChart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/wbi');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        handleSetChartData(data);
        handleSetChartDataRoot(data);
        handleSetLoading(false);
        handleSetIsFilter(false);
      } catch (error) {
        handleSetIsFilter(false);
        handleSetLoading(false);
      }
    };
    handleSetIsFilter(false);
    handleSetLoading(true);
    fetchData();
  }, []);


  return (
    <div className='p-home'>
      <Header />
      <div className='p-home_chart'>
        <FlowerChart />
      </div>
      <div className='p-home_content'>
        <div className='p-home_content_wrapper'>
          <h2>How’s life?</h2>
          <p>There is more to life than the cold numbers of GDP and economic statistics – This Index allows you to compare well-being across countries, based on 11 topics the OECD has identified as essential, in the areas of material living conditions and quality of life.</p>
          <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
        </div>
      </div>
    </div >
  )
};

export default HomePage;
