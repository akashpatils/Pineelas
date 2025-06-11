import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function MultiColorBarChart({ legend, name1, name2, grid, barWidth, barWidth2, barGap, barGap2, barCategoryGap, barCategoryGap2, xAxixdata, yAxixdata, color1, color2, lable, itemStyle, data, lable2, itemStyle2, data2}) {

  const option = {
    legend: legend,
    grid: grid,
    xAxis: xAxixdata,
    yAxis: yAxixdata,
    series: [
      {
        name: name1,
        type: 'bar',
        label: lable,
        barWidth: barWidth,
        color: color1,
        itemStyle: itemStyle,
        data: data,
        barGap: barGap,
        barCategoryGap: barCategoryGap
      },
      {
        name: name2,
        type: 'bar',
        label: lable2,
        barWidth: barWidth2,
        color: color2,
        itemStyle: itemStyle2,
        data: data2,
        barGap: barGap2,
        barCategoryGap: barCategoryGap2
      },
    ]
  };

  return (
    <ReactEcharts
      option={option}
      opts={{renderer:'svg'}}
      style={{ width: '100%', height: '100%' }}
    />
  )
};