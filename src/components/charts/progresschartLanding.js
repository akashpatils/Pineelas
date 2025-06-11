import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function ProgresschartLanding({grid, label1,label2,min,max,data,color1,color2,barBorderRadius1,barBorderRadius2,loading = false}) {

   const  option = {
        grid: grid,
        xAxis: {
          type: 'value',
          min: min,
          max: max,
          splitNumber: 5,
          axisTick: false,
          axisLine: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'category',
          axisTick: false,
          axisLine: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            type: 'bar',
            stack: 'total',
            label: label1,
            color:color1,
            itemStyle: {
              // color: "#0670B8",
              barBorderRadius: barBorderRadius1 || [16, 0, 0, 16]
            },
            data: data[0]
          },
          {
            type: 'bar',
            stack: 'total',
            label: label2,
            color:color2,
            itemStyle: {
              // color: '#E1F0FD',
              barBorderRadius: barBorderRadius2 || [0, 16, 16, 0]
            },
            data: data[1],
            barCategoryGap: '15%',
            boundaryGap: '0%'
          }
        ]
      };

  return (
     <ReactEcharts
      option={option}
      opts={{renderer:'svg'}}
      style={{ width: '100%', height: '100%' }}
      showLoading={loading}
      loadingOption={{
        text: "",
        color: 'grey',
      }}
    />
  )
}