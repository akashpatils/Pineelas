import React from 'react';
import ReactEcharts from 'echarts-for-react';


export default function MultiBarChart({  series,legend, name1, name2, name3,name4, itemStyle3,itemStyle4, grid, barWidth, barWidth2,barWidth3,barWidth4, barGap, barGap2,barGap3,barGap4, barCategoryGap, barCategoryGap2,barCategoryGap3,barCategoryGap4, xAxixdata, yAxixdata, color1, color2,color3,color4, lable, itemStyle, data, lable2,lable3,lable4, itemStyle2, data2, data3,data4, dataZoom = null, tooltip = null, loading = false}) {

  const option = {
    legend: legend,
    grid: grid,
    xAxis: xAxixdata,
    yAxis: yAxixdata,
    dataZoom: dataZoom,
    tooltip: tooltip,
    // series: [
    //   {
    //     name: name1,
    //     type: 'bar',
    //     label: lable,
    //     barWidth: barWidth,
    //     color: color1,
    //     itemStyle: itemStyle,
    //     data: data,
    //     barGap: barGap,
    //     barCategoryGap: barCategoryGap
    //   },
    //   {
    //     name: name2,
    //     type: 'bar',
    //     label: lable2,
    //     barWidth: barWidth2,
    //     color: color2,
    //     itemStyle: itemStyle2,
    //     data: data2,
    //     barGap: barGap2,
    //     barCategoryGap: barCategoryGap2
    //   },
    //   {
    //     name: name3,
    //     type: 'bar',
    //     label: lable3,
    //     barWidth: barWidth3,
    //     color: color3,
    //     itemStyle: itemStyle3,
    //     data: data3,
    //     barGap: barGap3,
    //     barCategoryGap: barCategoryGap3
    //   },
    //   {
    //     name: name4,
    //     type: 'bar',
    //     label: lable4,
    //     barWidth: barWidth4,
    //     color: color4,
    //     itemStyle: itemStyle4,
    //     data: data4,
    //     barGap: barGap4,
    //     barCategoryGap: barCategoryGap4
    //   },
    // ]
    series:series
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