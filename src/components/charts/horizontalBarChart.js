import React from 'react'
import ReactEcharts from 'echarts-for-react';
export default function HorizontalBarChart({min,max,interval,nameLocation,name,data,itemStyle,label,nameTextStyle,xaxisLine,xaxisLabel,yaxisLine,yaxisLable,yaxisLabledata, tooltip, dataZoom}) {

  const option = {
    tooltip: tooltip,
    grid: {
      left: '10%',
      right: '10%',
      bottom: '8%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: "value",
      min: min,
      max: max,
      interval: interval,
      axisTick: { show: false },
      name: name,
      nameLocation: nameLocation,
      nameTextStyle: nameTextStyle,
      axisLine: xaxisLine,
      axisLabel: xaxisLabel,
      splitLine: {
        show: false
      },

    },
    yAxis: {
      type: 'category',
      axisLine: yaxisLine,

      axisTick: {
        show: false
      },

      axisLabel: yaxisLable,

      data: yaxisLabledata,
    },
    series: [
      {
        type: 'bar',
        data: data,
        itemStyle: itemStyle,
        label: label,

      },
    ],
    dataZoom: data?.length > 6 ?  dataZoom : [] || []
  };

  return (
    <>
    <ReactEcharts
      option={option}
      style={{ height: '100%', width: '100%' }}
    />
  </>
  )
}
