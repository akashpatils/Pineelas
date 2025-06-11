import React from 'react';
import ReactECharts from 'echarts-for-react';

const HorizontalStackedBarChart = ({legend,data,grid,barWidth,xaxisLabel,xaxisTick,xaxisLine,xAxisdata,yAxisdata,min,max,interval,yaxisLabel,ysplitLine,yaxisLine,name1,label1,itemStyle1,data1,name2,label2,itemStyle2,data2,yaxisTick,xsplitLine}) => {
    const option = {
      legend: legend,
      grid: grid,
      xAxis: {
        type: 'value',
        axisLabel: xaxisLabel,
        axisTick: xaxisTick,
        axisLine: xaxisLine,
        min: min,
        max: max,
        interval: interval,
        splitLine: xsplitLine,
       
      },
      yAxis: {
        type: 'category',
        data: yAxisdata,
        axisLabel: yaxisLabel,
        splitLine: ysplitLine,
        axisTick: yaxisTick,
        axisLine: yaxisLine,
        data: ['China', 'India', 'Kingdom of Bahrain'],
      },
      series: [
        {
          name: name1,
          stack: 'a',
          type: 'bar',
          label: label1,
          itemStyle: itemStyle1,
          data: data1,
          barWidth:barWidth
        },
        {
          name: name2,
          stack: 'a',
          type: 'bar',
          label: label2,
          itemStyle: itemStyle2,
          data: data2
        }
      ],
    };

  return (
    <ReactECharts
        option={option}  opts={{ renderer: 'svg' }}
        style={{ width: '100%', height: '100%' }}
    />
)
};

export default HorizontalStackedBarChart;
