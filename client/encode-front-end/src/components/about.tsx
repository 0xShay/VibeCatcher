import React from 'react'
import Chart from 'chart.js/auto';
import ChartComponent from './chartComponent';


const About: React.FC = () => {

  return (
    <div id='about'>
      <div className=" bg-gray-900 py-4 w-full">
        <div className="leftSide pt-10">
          <h1 className=" leading-[4rem] text-5xl font-[satoshi] font-bold text-white pt-10 pb-6 align-center text-center mx-auto max-w-[1000px] ">
            Automate chat moderation and stream performance enhancement
          </h1>
          <h2 className='text-center text-2xl font-[satoshi] font-medium text-white mx-auto'>
            One app to replace all of your streaming analytics through sentiment analysis
          </h2>
          <div className='DashBoard flex justify-center pt-10'>
          <ChartComponent/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About