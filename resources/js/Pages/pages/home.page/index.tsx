import React, { createContext, useEffect } from 'react';
import './style.css'
import FlowerChart from '../../components/templates/chart';
import Header from '../../components/templates/nav';
import { useChart } from '../../components/templates/provider';

export const ChartContext = createContext({} as any);

const HomePage: React.FC = () => {
  const { handleSetChartData, handleSetLoading, handleSetIsFilter } = useChart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/wbi');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        handleSetChartData(data);
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
    </div>
  )
};

export default HomePage;
