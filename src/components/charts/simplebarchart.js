import React from 'react'
import ReactEcharts from 'echarts-for-react';
export default function Simplebarchart({grid,legend,xAxis,yAxis,name,data,itemStyle,label,barWidth,tooltip}) {
    const option = {
        tooltip: tooltip,
        legend:legend,
        grid:grid,
        xAxis: xAxis,
        yAxis: yAxis,
        series: [
          {
            name: name,
            type: 'bar',
            barWidth:barWidth,
            data: data,
            itemStyle: itemStyle,
            label: label
          }
        ]
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
