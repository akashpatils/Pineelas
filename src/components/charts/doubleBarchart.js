import React from 'react';
import ReactEcharts from 'echarts-for-react';


export default function DoubleBarChart({ legend, name1, name2, name3, yAxisIndex, symbolSize, itemStyle3, symbol, lineStyle, grid, barWidth, barWidth2, barGap, barGap2, barCategoryGap, barCategoryGap2, xAxixdata, yAxixdata, color1, color2, lable, itemStyle, data, lable2, itemStyle2, data2, data3, dataZoom = null, tooltip = null, loading = false}) {

  const option = {
    legend: legend,
    grid: grid,
    xAxis: xAxixdata,
    yAxis: yAxixdata,
    dataZoom: dataZoom,
    tooltip: tooltip,
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
      {
        name: name3,
        type: 'line',
        yAxisIndex: yAxisIndex,
        symbolSize: symbolSize,
        itemStyle: itemStyle3,
        data: data3,
        symbol: symbol,
        lineStyle: lineStyle,
      },
    ],
    dataZoom: data?.length >  6 ?  dataZoom : [] || []
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
};