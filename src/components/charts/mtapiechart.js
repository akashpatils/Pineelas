import React from 'react'
import ReactEcharts from 'echarts-for-react';


export default function MTApiechart({ legend, grid, label, labelLine, data, color, name, radius, itemStyle, padAngle = 0, padding = null, loading = false }) {

  const option = {
    legend: legend,
    grid: grid,
    series: [
      {
        name: name,
        type: 'pie',
        radius: radius,
        itemStyle: itemStyle,
        padding: padding,
        avoidLabelOverlap: false,
        label: label,
        padAngle: padAngle,
        labelLine: labelLine,
        data: data,
        color: color
      }
    ]
  };

  return (
    <ReactEcharts
      option={option}
      opts={{ renderer: 'svg' }}
      style={{ width: '100%', height: '100%' }}
      showLoading={loading}
      loadingOption={{
        text: "",
        color: 'grey',
      }}
    />
  )
}
